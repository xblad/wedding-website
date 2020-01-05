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
    public class InvitationController : ControllerBase
    {
        private readonly ILogger<GuestController> _logger;
        private readonly IGuestsService _guestsService;

        public InvitationController(ILogger<GuestController> logger, IGuestsService guestsService)
        {
            _logger = logger;
            _guestsService = guestsService;
        }

        [HttpPost("{invitationGuid}")]
        public async Task<IActionResult> IndicateAttendanceAsync(Guid invitationGuid, [FromBody]bool response)
        {
            _logger.LogDebug($"call: IndicateAttendanceAsync({invitationGuid}, {response})");
            if (await _guestsService.IndicateAttendanceAsync(invitationGuid, response).ConfigureAwait(false))
                return Ok();
            else
                return BadRequest();
        }
    }
}
