-- =============================================
-- Author:		Daniil Bladyko
-- Create date: 2019-12-08
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetGuestPhoto] 
	-- Add the parameters for the stored procedure here
	@FirstName nvarchar(50), 
	@LastName nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [file_stream]
	FROM [dbo].[Images]
	WHERE [name] = CONCAT(@FirstName, '_', @LastName, '.png')
END
