CREATE TABLE [dbo].[Invitations] (
    [InvitationGuid] UNIQUEIDENTIFIER CONSTRAINT [DF_Invitations_InvitationGuid] DEFAULT (newid()) ROWGUIDCOL NOT NULL,
    [SentDateTime]   DATETIME         NULL,
    [ReadDateTime]   DATETIME         NULL,
    [Response]       BIT              NULL,
    CONSTRAINT [PK_Invitations] PRIMARY KEY CLUSTERED ([InvitationGuid] ASC)
);

