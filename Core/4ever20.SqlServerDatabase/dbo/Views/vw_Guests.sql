CREATE VIEW dbo.vw_Guests
AS
SELECT        g.GuestId, g.FirstName, g.LastName, g.About, i.InvitationGuid, i.SentDateTime AS InvitationSentDateTime, i.ReadDateTime AS InvitationSeenDateTime, i.Response AS IsGoing
FROM            dbo.Guests AS g LEFT OUTER JOIN
                         dbo.Invitations AS i ON g.InvitationGuid = i.InvitationGuid

GO