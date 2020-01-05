using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _4ever20.Guests;
using _4ever20.Website.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace _4ever20.Website.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GuestController : ControllerBase
    {
        private readonly ILogger<GuestController> _logger;
        private readonly IGuestsService _guestsService;

        public GuestController(ILogger<GuestController> logger, IGuestsService guestsService)
        {
            _logger = logger;
            _guestsService = guestsService;
        }

        [HttpGet("photo/{firstName}_{lastName}")]
        public IActionResult GetGuestPhoto(string firstName, string lastName)
        {
            _logger.LogDebug($"call: GetGuestPhoto({firstName}, {lastName})");
            var photo = _guestsService.GetGuestPhoto(firstName, lastName);
            return File(photo, "image/png");
        }

        [HttpGet]
        public async IAsyncEnumerable<Guest> GetGuestsAsync()
        {
            _logger.LogDebug($"call: GetGuests()");
            await foreach(var g in _guestsService.GetGuestsAsync())
            {
                yield return new Guest
                {
                    Id = g.Id,
                    FirstName = g.FirstName,
                    LastName = g.LastName,
                    About = g.About,
                    Img = $"api/guest/photo/{g.FirstName}_{g.LastName}",
                    InvitationGuid = g.InvitationGuid,
                    InvitationSentDateTime = g.InvitationSentDateTime,
                    InvitationSeenDateTime = g.InvitationSeenDateTime,
                    IsGoing = g.IsGoing
                };
            }
        }
    }
}
