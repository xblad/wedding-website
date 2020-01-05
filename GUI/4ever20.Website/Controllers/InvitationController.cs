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

        [HttpPost("attendance/{invitationGuid}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> IndicateAttendanceAsync(Guid invitationGuid, [FromBody]bool response)
        {
            _logger.LogDebug($"call: IndicateAttendanceAsync({invitationGuid}, {response})");
            if (await _guestsService.IndicateAttendanceAsync(invitationGuid, response).ConfigureAwait(false))
                return Ok();
            else
                return BadRequest();
        }

        [HttpGet("{invitationGuid}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetInvitationAsync(Guid invitationGuid)
        {
            _logger.LogDebug($"call: GetInvitationAsync({invitationGuid})");
            await _guestsService.ReadInvitationAsync(invitationGuid);
            var invitation = await _guestsService.GetGuestsAsync()
                .Where(g => g.InvitationGuid == invitationGuid)
                .Select(g => new Invitation
                {
                    InvitationGuid = g.InvitationGuid,
                    FirstName = g.FirstName,
                    LastName = g.LastName,
                    InvitationSeen = g.InvitationSeen,
                    IsGoing = g.IsGoing
                }).FirstOrDefaultAsync().ConfigureAwait(false);

            return invitation != null ? Ok(invitation) : (IActionResult)NotFound(invitation);
        }
    }
}
