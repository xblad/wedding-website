-- =============================================
-- Author:		Daniil Bladyko
-- Create date: 2020-06-21
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetPhotoById] 
	-- Add the parameters for the stored procedure here
	@StreamId uniqueidentifier
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [file_stream]
	FROM [dbo].[Gallery]
	WHERE [stream_id] = @StreamId
END
