using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4ever20.Website.Model
{
    public class Guest
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Summary { get; set; }
        public string Img { get; set; }
        //public Guest Related { get; set; }

        public string FullName => $"{FirstName} {LastName}";
    }
}
