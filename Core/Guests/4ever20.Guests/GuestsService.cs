using _4ever20.Data.Databases;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;

namespace _4ever20.Guests
{
    [Export(typeof(IGuestsService))]
    public sealed class GuestsService : IGuestsService
    {
        private readonly IDatabase database;

        [ImportingConstructor]
        public GuestsService(IDatabase database)
        {
            this.database = database;
        }

        public byte[] GetGuestPhoto(string firstName, string lastName)
        {
            using (var dbConnection = database.CreateOpenConnection())
            {
                var cmd = database.CreateStoredProcCommand("[dbo].[sp_GetGuestPhoto]", dbConnection);
                
                var firstNameParam = cmd.CreateParameter();
                firstNameParam.ParameterName = "@FirstName";
                firstNameParam.Value = firstName;
                cmd.Parameters.Add(firstNameParam);
                
                var lastNameParam = cmd.CreateParameter();
                lastNameParam.ParameterName = "@LastName";
                lastNameParam.Value = lastName;
                cmd.Parameters.Add(lastNameParam);

                return (byte[])cmd.ExecuteScalar();
            }
        }

        public IEnumerable<GuestEntry> GetGuests()
        {
            using (var dbConnection = database.CreateOpenConnection())
            {
                var cmd = database.CreateStoredProcCommand("[dbo].[sp_GetGuests]", dbConnection);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        yield return new GuestEntry
                        {
                            Id = reader.GetValueOrDefault<short>("GuestId"),
                            FirstName = reader.GetValueOrDefault<string>("FirstName"),
                            LastName = reader.GetValueOrDefault<string>("LastName"),
                            About = reader.GetValueOrDefault<string>("About"),
                            InvitationGuid = reader.GetValueOrDefault<Guid?>("InvitationGuid"),
                            InvitationSentDateTime = reader.GetValueOrDefault<DateTime?>("InvitationSentDateTime"),
                            InvitationSeenDateTime = reader.GetValueOrDefault<DateTime?>("InvitationSeenDateTime"),
                            IsGoing = reader.GetValueOrDefault<bool?>("IsGoing")
                        };
                    }
                }
            }
        }
    }

    public interface IGuestsService
    {
        IEnumerable<GuestEntry> GetGuests();
        byte[] GetGuestPhoto(string firstName, string lastName);
    }

    public class GuestEntry
    {
        public short Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string About { get; set; }
        public Guid? InvitationGuid { get; set; }
        public DateTime? InvitationSentDateTime { get; set; }
        public DateTime? InvitationSeenDateTime { get; set; }
        public bool InvitationSent => InvitationSentDateTime.HasValue;
        public bool InvitationSeen => InvitationSeenDateTime.HasValue;
        public bool? IsGoing { get; set; }
    }
}
