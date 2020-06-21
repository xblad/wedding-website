-- =============================================
-- Author:		Daniil Bladyko
-- Create date: 2020-06-21
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetPhotoGallery]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [stream_id], [file_stream], [file_type]
	FROM [dbo].[Gallery]
END
