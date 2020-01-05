-- =============================================
-- Author:		Daniil Bladyko
-- Create date: 2019-12-29
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[sp_IndicateAttendance]
	@InvitationGuid uniqueidentifier, 
	@Response bit
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @updatedRows TABLE (
			InvitationGuid uniqueidentifier, 
			Response bit
	)

    UPDATE [dbo].[Invitations]
	SET Response = @Response
	OUTPUT @InvitationGuid, INSERTED.Response INTO @updatedRows
	WHERE InvitationGuid = @InvitationGuid
		AND @Response IS NOT NULL
		AND Response IS NULL

	SELECT [InvitationGuid]
		, [Response]
	FROM @updatedRows
END
