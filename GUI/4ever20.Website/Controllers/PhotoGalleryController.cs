using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using _4ever20.Photos;
using _4ever20.Website.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace _4ever20.Website.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhotoGalleryController : ControllerBase
    {
        private readonly ILogger<GuestController> _logger;
        private readonly IPhotoGalleryService _photoGalleryService;

        public PhotoGalleryController(ILogger<GuestController> logger, IPhotoGalleryService photoGalleryService)
        {
            _logger = logger;
            _photoGalleryService = photoGalleryService;
        }

        [HttpGet("photo/{format}/{id}")]
        public async Task<IActionResult> GetPhotoAsync(Guid id, string format)
        {
            _logger.LogDebug($"call: GetPhotoAsync({id}, {format})");
            var photo = await _photoGalleryService.GetPhotoAsync(id).ConfigureAwait(false);
            return File(photo, $"image/{format}");
        }

        [HttpGet]
        public async IAsyncEnumerable<GalleryPhoto> GetPhotosAsync()
        {
            _logger.LogDebug($"call: GetPhotosAsync()");
            await foreach(var p in _photoGalleryService.GetPhotosAsync())
            {
                yield return new GalleryPhoto
                {
                    Src = $"api/photogallery/photo/{p.Format}/{p.Id}",
                    Width = p.Width,
                    Height = p.Height
                };
            }
        }
    }
}
