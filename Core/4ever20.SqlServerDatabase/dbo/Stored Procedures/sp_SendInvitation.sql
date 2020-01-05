-- =============================================
-- Author:		Daniil Bladyko
-- Create date: 2019-12-28
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[sp_SendInvitation]
	@guestId smallint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @invitationGuid uniqueidentifier;
    DECLARE @newInvitations TABLE (
		InvitationGuid uniqueidentifier,  
        SentDateTime datetime
	);

	IF EXISTS (SELECT GuestId FROM [dbo].[Guests] WHERE GuestId = @guestId AND InvitationGuid IS NULL)
	BEGIN
		BEGIN TRANSACTION

		INSERT INTO [dbo].[Invitations] ([SentDateTime])
		OUTPUT INSERTED.[InvitationGuid], INSERTED.[SentDateTime] INTO @newInvitations  
		VALUES (GETDATE());

		SELECT @invitationGuid = [InvitationGuid] FROM @newInvitations

		UPDATE [dbo].[Guests]
		SET [InvitationGuid] = @invitationGuid
		WHERE [GuestId] = @guestId

		COMMIT
	END

	SELECT [InvitationGuid]
		, [SentDateTime]
	FROM @newInvitations
END
