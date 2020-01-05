-- =============================================
-- Author:		Daniil Bladyko
-- Create date: 2019-11-24
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetGuests]
AS
BEGIN
	SET NOCOUNT ON;

    SELECT	[GuestId]
			,[FirstName]
			,[LastName]
			,[About]
			,[InvitationGuid]
			,[InvitationSentDateTime]
			,[InvitationSeenDateTime]
			,[IsGoing]
    FROM [dbo].[vw_Guests]
END
