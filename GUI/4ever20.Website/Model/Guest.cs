using System;

namespace _4ever20.Website.Model
{
    public class Guest
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string About { get; set; }
        public string Img { get; set; }

        public string FullName => $"{FirstName} {LastName}";
        
        public Guid? InvitationGuid { get; set; }
        public DateTime? InvitationSentDateTime { get; set; }
        public DateTime? InvitationSeenDateTime { get; set; }
        public bool? IsGoing { get; set; }
    }
}
