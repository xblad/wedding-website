using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public GuestController(ILogger<GuestController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Guest> Get()
        {
            yield return new Guest {
                Id = 0,
                FirstName = "Иван",
                LastName = "Иванов",
                Summary = "Знаю ребят очень давно.",
                Img = "https://randomuser.me/api/portraits/men/60.jpg"
            };
            yield return new Guest
            {
                Id = 1,
                FirstName = "Виктория",
                LastName = "Иванова",
                Summary = "Тоже их знаю.",
                Img = "https://randomuser.me/api/portraits/women/68.jpg"
            };
            yield return new Guest
            {
                Id = 2,
                FirstName = "Петр",
                LastName = "Петров",
                Summary = "Я похавать пришёл.",
                Img = "https://randomuser.me/api/portraits/men/46.jpg"
            };
        }
    }
}
