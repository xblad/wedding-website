CREATE TABLE [dbo].[Guests] (
    [GuestId]        SMALLINT         IDENTITY (1, 1) NOT NULL,
    [FirstName]      NVARCHAR (50)    NOT NULL,
    [LastName]       NVARCHAR (50)    NOT NULL,
    [About]          NVARCHAR (MAX)   NULL,
    [InvitationGuid] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [PK_Guests] PRIMARY KEY CLUSTERED ([GuestId] ASC),
    CONSTRAINT [FK_Guests_Invitations] FOREIGN KEY ([InvitationGuid]) REFERENCES [dbo].[Invitations] ([InvitationGuid])
);

