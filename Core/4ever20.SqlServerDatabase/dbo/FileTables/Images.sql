﻿CREATE TABLE [dbo].[Images] AS FILETABLE FILESTREAM_ON [database_assets]
WITH (FILETABLE_COLLATE_FILENAME = Latin1_General_CI_AS, FILETABLE_DIRECTORY = N'Images');
