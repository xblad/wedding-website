using _4ever20.Data.Databases;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Data;
using System.Threading.Tasks;

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

        public async Task<bool> IndicateAttendanceAsync(Guid invitationGuid, bool response)
        {
            using var dbConnection = await database.CreateOpenConnectionAsync().ConfigureAwait(false);
            var cmd = database.CreateStoredProcCommand("[dbo].[sp_IndicateAttendance]", dbConnection);

            var invitationGuidParam = cmd.CreateParameter();
            invitationGuidParam.ParameterName = "@InvitationGuid";
            invitationGuidParam.Value = invitationGuid;
            cmd.Parameters.Add(invitationGuidParam);

            var responseParam = cmd.CreateParameter();
            responseParam.ParameterName = "@Response";
            responseParam.Value = response;
            cmd.Parameters.Add(responseParam);

            using (var reader = await cmd.ExecuteReaderAsync().ConfigureAwait(false))
            {
                while (await reader.ReadAsync().ConfigureAwait(false))
                {
                    return invitationGuid == await reader.GetValueOrDefaultAsync<Guid?>("InvitationGuid").ConfigureAwait(false)
                        && response == await reader.GetValueOrDefaultAsync<bool?>("Response").ConfigureAwait(false);
                }
            }

            return false;
        }

        public async Task<byte[]> GetGuestPhotoAsync(string firstName, string lastName)
        {
            using var dbConnection = await database.CreateOpenConnectionAsync().ConfigureAwait(false);
            var cmd = database.CreateStoredProcCommand("[dbo].[sp_GetGuestPhoto]", dbConnection);

            var firstNameParam = cmd.CreateParameter();
            firstNameParam.ParameterName = "@FirstName";
            firstNameParam.Value = firstName;
            cmd.Parameters.Add(firstNameParam);

            var lastNameParam = cmd.CreateParameter();
            lastNameParam.ParameterName = "@LastName";
            lastNameParam.Value = lastName;
            cmd.Parameters.Add(lastNameParam);

            return (byte[])await cmd.ExecuteScalarAsync().ConfigureAwait(false);
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
                    Id = await reader.GetValueOrDefaultAsync<short>("GuestId").ConfigureAwait(false),
                    FirstName = await reader.GetValueOrDefaultAsync<string>("FirstName").ConfigureAwait(false),
                    LastName = await reader.GetValueOrDefaultAsync<string>("LastName").ConfigureAwait(false),
                    About = await reader.GetValueOrDefaultAsync<string>("About").ConfigureAwait(false),
                    InvitationGuid = await reader.GetValueOrDefaultAsync<Guid?>("InvitationGuid").ConfigureAwait(false),
                    InvitationSentDateTime = await reader.GetValueOrDefaultAsync<DateTime?>("InvitationSentDateTime").ConfigureAwait(false),
                    InvitationSeenDateTime = await reader.GetValueOrDefaultAsync<DateTime?>("InvitationSeenDateTime").ConfigureAwait(false),
                    IsGoing = await reader.GetValueOrDefaultAsync<bool?>("IsGoing").ConfigureAwait(false)
                };
            }
        }
    }

    public interface IGuestsService
    {
        IAsyncEnumerable<GuestEntry> GetGuestsAsync();
        Task<bool> IndicateAttendanceAsync(Guid invitationGuid, bool response);
        Task<byte[]> GetGuestPhotoAsync(string firstName, string lastName);
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
