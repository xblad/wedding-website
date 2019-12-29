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
    [Route("[controller]")]
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
        public IActionResult Get(string firstName, string lastName)
        {
            var photo = _guestsService.GetGuestPhoto(firstName, lastName);
            return File(photo, "image/png");
        }

        [HttpGet]
        public IEnumerable<Guest> Get()
        {
            return _guestsService.GetGuests()
                .Select(g => new Guest 
                {
                    Id = g.Id,
                    FirstName = g.FirstName,
                    LastName = g.LastName,
                    About = g.About,
                    Img = $"guest/photo/{g.FirstName}_{g.LastName}",
                    InvitationGuid = g.InvitationGuid,
                    InvitationSentDateTime = g.InvitationSentDateTime,
                    InvitationSeenDateTime = g.InvitationSeenDateTime,
                    IsGoing = g.IsGoing
                });
        }
    }
}
