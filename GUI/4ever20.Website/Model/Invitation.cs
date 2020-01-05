using System;

namespace _4ever20.Website.Model
{
    public class Invitation
    {
        public Guid? InvitationGuid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool InvitationSeen { get; set; }
        public bool? IsGoing { get; set; }
    }
}
