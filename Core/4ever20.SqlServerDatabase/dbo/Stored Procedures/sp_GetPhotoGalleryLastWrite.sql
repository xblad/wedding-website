-- =============================================
-- Author:		Daniil Bladyko
-- Create date: 2020-09-25
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetPhotoGalleryLastWrite]
	@SinceDateTime datetime = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @LastWriteTime datetime
	SELECT @LastWriteTime = MAX([last_user_update])
	FROM [sys].[dm_db_index_usage_stats]
	WHERE [object_id] = OBJECT_ID('[dbo].[Gallery]')

	IF @LastWriteTime IS NULL
	SELECT GETDATE() AS [LastWriteTime]

	IF @SinceDateTime IS NULL OR @LastWriteTime > @SinceDateTime
	SELECT @LastWriteTime AS [LastWriteTime]
END
