-- =============================================
-- Author:		Daniil Bladyko
-- Create date: 2019-12-29
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[sp_ReadInvitation]
	@InvitationGuid uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @updatedRows TABLE (
			InvitationGuid uniqueidentifier, 
			ReadDateTime datetime
	)

    UPDATE [dbo].[Invitations]
	SET ReadDateTime = GETDATE()
	OUTPUT @InvitationGuid, INSERTED.ReadDateTime INTO @updatedRows
	WHERE InvitationGuid = @InvitationGuid
		AND ReadDateTime IS NULL

	SELECT [InvitationGuid]
		, [ReadDateTime]
	FROM @updatedRows
END
