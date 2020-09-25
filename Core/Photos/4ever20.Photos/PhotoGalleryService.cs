using _4ever20.Data.Databases;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Drawing;
using System.Data;
using System.IO;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using System.Threading;
using System.Linq;

namespace _4ever20.Photos
{
    [Export(typeof(IPhotoGalleryService))]
    public class PhotoGalleryService : IPhotoGalleryService
    {
        private readonly IDatabase database;
        private readonly ConcurrentDictionary<Guid, Size> _sizeCache = new ConcurrentDictionary<Guid, Size>();
        private readonly ConcurrentDictionary<Guid, byte[]> _photoCache = new ConcurrentDictionary<Guid, byte[]>();
        private readonly ReaderWriterLockSlim _galleryLock = new ReaderWriterLockSlim();
        private readonly ManualResetEventSlim _getGalleryResetEvent = new ManualResetEventSlim(true);

        private IEnumerable<PhotoGalleryEntry> _galleryCache;
        private long _photoGalleryLastWriteLong = new DateTime(2020, 8, 4).ToBinary();

        public DateTime LastWriteDateTime
        {
            get => DateTime.FromBinary(Interlocked.CompareExchange(ref _photoGalleryLastWriteLong, 0, 0));
            set => Interlocked.Exchange(ref _photoGalleryLastWriteLong, value.ToBinary());
        }

        private IEnumerable<PhotoGalleryEntry> GalleryCache
        {
            get
            {
                _galleryLock.EnterReadLock();
                try
                {
                    return _galleryCache;
                }
                finally
                {
                    _galleryLock.ExitReadLock();
                }
            }
            set
            {
                _galleryLock.EnterWriteLock();
                try
                {
                    _galleryCache = value;
                }
                finally
                {
                    _galleryLock.ExitWriteLock();
                }
            }
        }

        [ImportingConstructor]
        public PhotoGalleryService(IDatabase database)
        {
            this.database = database;
        }

        public async Task<byte[]> GetPhotoAsync(Guid id)
        {
            async Task<byte[]> GetPhotoAsyncCore(Guid id)
            {
                using var dbConnection = await database.CreateOpenConnectionAsync();
                var cmd = database.CreateStoredProcCommand("[dbo].[sp_GetPhotoById]", dbConnection);

                var streamGuidParam = cmd.CreateParameter();
                streamGuidParam.ParameterName = "@StreamId";
                streamGuidParam.Value = id;
                cmd.Parameters.Add(streamGuidParam);

                return (byte[])await cmd.ExecuteScalarAsync();
            }
            return _photoCache.GetOrAdd(id, id => GetPhotoAsyncCore(id).GetAwaiter().GetResult());
        }

        public async IAsyncEnumerable<PhotoGalleryEntry> GetPhotosAsync()
        {
            _getGalleryResetEvent.Wait();
            _getGalleryResetEvent.Reset();

            try
            {
                using var dbConnection = await database.CreateOpenConnectionAsync();
                var flagCmd = database.CreateStoredProcCommand("[dbo].[sp_GetPhotoGalleryLastWrite]", dbConnection);

                var sinceDateTimeParam = flagCmd.CreateParameter();
                sinceDateTimeParam.ParameterName = "@SinceDateTime";
                sinceDateTimeParam.Value = LastWriteDateTime;
                flagCmd.Parameters.Add(sinceDateTimeParam);

                bool updated = false;
                using (var flagReader = await flagCmd.ExecuteReaderAsync())
                {
                    while (await flagReader.ReadAsync())
                    {
                        updated = true;
                        LastWriteDateTime = await flagReader.GetValueOrDefaultAsync<DateTime>("LastWriteTime");
                    }
                }

                if (!updated)
                {
                    foreach (var photo in GalleryCache)
                    {
                        yield return photo;
                    }

                    yield break;
                }

                var cmd = database.CreateStoredProcCommand("[dbo].[sp_GetPhotoGallery]", dbConnection);
                var photos = new List<PhotoGalleryEntry>();
                using var mainReader = await cmd.ExecuteReaderAsync();
                while (await mainReader.ReadAsync())
                {
                    var fileStreamId = await mainReader.GetValueOrDefaultAsync<Guid>("stream_id");
                    var fileStreamByteArray = await mainReader.GetValueOrDefaultAsync<byte[]>("file_stream");
                    var fileType = await mainReader.GetValueOrDefaultAsync<string>("file_type");
                    var size = _sizeCache.GetOrAdd(fileStreamId, id => GetImageSizeFromByteArray(fileStreamByteArray));

                    var photo = new PhotoGalleryEntry
                    {
                        Id = fileStreamId,
                        Photo = null,
                        Format = fileType,
                        Width = size.Width,
                        Height = size.Height
                    };

                    photos.Add(photo);
                    yield return photo;
                }

                if (photos.Any())
                {
                    GalleryCache = photos;
                }
            }
            finally
            {
                _getGalleryResetEvent.Set();
            }
        }

        private Size GetImageSizeFromByteArray(byte[] imageByteArray)
        {
            Image image = null;
            using (var stream = new MemoryStream(imageByteArray))
            {
                image = Image.FromStream(stream);
            }
            return image.Size;
        }

        ~PhotoGalleryService()
        {
            _galleryLock?.Dispose();
        }
    }

    public interface IPhotoGalleryService
    {
        IAsyncEnumerable<PhotoGalleryEntry> GetPhotosAsync();
        Task<byte[]> GetPhotoAsync(Guid id);
    }

    public class PhotoGalleryEntry
    {
        public Guid Id { get; set; }
        public byte[] Photo { get; set; }
        public string Format { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
