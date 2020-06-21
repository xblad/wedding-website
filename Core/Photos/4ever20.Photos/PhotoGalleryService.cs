using _4ever20.Data.Databases;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Drawing;
using System.Data;
using System.IO;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace _4ever20.Photos
{
    [Export(typeof(IPhotoGalleryService))]
    public class PhotoGalleryService : IPhotoGalleryService
    {
        private readonly IDatabase database;
        private readonly ConcurrentDictionary<Guid, Size> _sizeCache = new ConcurrentDictionary<Guid, Size>();

        [ImportingConstructor]
        public PhotoGalleryService(IDatabase database)
        {
            this.database = database;
        }

        public async Task<byte[]> GetPhotoAsync(Guid id)
        {
            using var dbConnection = await database.CreateOpenConnectionAsync().ConfigureAwait(false);
            var cmd = database.CreateStoredProcCommand("[dbo].[sp_GetPhotoById]", dbConnection);

            var streamGuidParam = cmd.CreateParameter();
            streamGuidParam.ParameterName = "@StreamId";
            streamGuidParam.Value = id;
            cmd.Parameters.Add(streamGuidParam);

            return (byte[])await cmd.ExecuteScalarAsync().ConfigureAwait(false);
        }

        public async IAsyncEnumerable<PhotoGalleryEntry> GetPhotosAsync()
        {
            using var dbConnection = await database.CreateOpenConnectionAsync().ConfigureAwait(false);
            var cmd = database.CreateStoredProcCommand("[dbo].[sp_GetPhotoGallery]", dbConnection);
            using var reader = await cmd.ExecuteReaderAsync().ConfigureAwait(false);
            while (await reader.ReadAsync().ConfigureAwait(false))
            {
                var fileStreamId = await reader.GetValueOrDefaultAsync<Guid>("stream_id").ConfigureAwait(false);
                var fileStreamByteArray = await reader.GetValueOrDefaultAsync<byte[]>("file_stream").ConfigureAwait(false);
                var fileType = await reader.GetValueOrDefaultAsync<string>("file_type").ConfigureAwait(false);
                var size = _sizeCache.GetOrAdd(fileStreamId, id => GetImageSizeFromByteArray(fileStreamByteArray));

                yield return new PhotoGalleryEntry
                {
                    Id = fileStreamId,
                    Photo = null,
                    Format = fileType,
                    Width = size.Width,
                    Height = size.Height
                };
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
