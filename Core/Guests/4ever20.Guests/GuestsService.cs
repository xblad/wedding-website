using _4ever20.Data.Databases;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Data;

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

        public bool IndicateAttendance(Guid invitationGuid, bool response)
        {
            using (var dbConnection = database.CreateOpenConnection())
            {
                var cmd = database.CreateStoredProcCommand("[dbo].[sp_IndicateAttendance]", dbConnection);

                var invitationGuidParam = cmd.CreateParameter();
                invitationGuidParam.ParameterName = "@InvitationGuid";
                invitationGuidParam.Value = invitationGuid;
                cmd.Parameters.Add(invitationGuidParam);

                var responseParam = cmd.CreateParameter();
                responseParam.ParameterName = "@Response";
                responseParam.Value = response;
                cmd.Parameters.Add(responseParam);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        return invitationGuid == reader.GetValueOrDefault<Guid?>("InvitationGuid")
                            && response == reader.GetValueOrDefault<bool?>("Response");
                    }
                }

                return false;
            }
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

        public async IAsyncEnumerable<GuestEntry> GetGuestsAsync()
        {
            using var dbConnection = await database.CreateOpenConnectionAsync().ConfigureAwait(false);
            var cmd = database.CreateStoredProcCommand("[dbo].[sp_GetGuests]", dbConnection);
            using var reader = await cmd.ExecuteReaderAsync().ConfigureAwait(false);
            while (await reader.ReadAsync().ConfigureAwait(false))
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

    public interface IGuestsService
    {
        IAsyncEnumerable<GuestEntry> GetGuestsAsync();
        bool IndicateAttendance(Guid invitationGuid, bool response);
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
