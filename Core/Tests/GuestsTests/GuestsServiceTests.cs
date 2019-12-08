using NUnit.Framework;
using _4ever20.Data.Databases;
using _4ever20.Guests;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using Moq;
using System;
using FluentAssertions;

namespace _4ever20.GuestsTests
{
    [TestFixture]
    public class GuestsServiceTests
    {
        private readonly Mock<IDatabase> databaseMock = new Mock<IDatabase>();
        private readonly Mock<IDataReader> dataReaderMock = new Mock<IDataReader>();

        [SetUp]
        public void Setup()
        {
            var connectionMock = new Mock<IDbConnection>();
            var cmdMock = new Mock<IDbCommand>();
            databaseMock.Setup(m => m.CreateConnection()).Returns(connectionMock.Object);
            databaseMock.Setup(m => m.CreateOpenConnection()).Returns(connectionMock.Object);
            databaseMock.Setup(m => m.CreateStoredProcCommand(It.IsAny<string>(), connectionMock.Object)).Returns(cmdMock.Object);

            cmdMock.Setup(m => m.ExecuteReader()).Returns(dataReaderMock.Object);
        }

        private static void SetupDataReader(Mock<IDataReader> dataReaderMock, IList<string> columnNames, IList<IList<object>> collection)
        {
            var queue = new Queue<IList<object>>(collection);

            for (int i = 0; i < columnNames.Count; i++)
            {
                dataReaderMock
                    .Setup(m => m.GetOrdinal(columnNames[i]))
                    .Returns(i);
            }

            dataReaderMock
                .Setup(x => x.Read())
                .Returns(() => queue.Count > 0)
                .Callback(() =>
                {
                    if (queue.Count <= 0) return;
                    var row = queue.Dequeue();
                    for (int i = 0; i < columnNames.Count; i++)
                    {
                        var columnName = columnNames[i];
                        var columnValue = row[i];
                        dataReaderMock
                            .Setup(m => m[i])
                            .Returns(columnValue);
                        dataReaderMock
                            .Setup(m => m[columnName])
                            .Returns(columnValue);
                        dataReaderMock
                            .Setup(m => m.IsDBNull(i))
                            .Returns(columnValue == null);
                    }
                });
        }

        [Test]
        public void GetGuestsShouldReturnData()
        {
            SetupDataReader(dataReaderMock,
                new[] { "GuestId", "FirstName", "LastName", "About", "InvitationSentDateTime", "InvitationSeenDateTime", "IsGoing" },
                new[]
                {
                    new object[] { (short)1, "Ivan", "Ivanov", "All about Ivan", null, null, null },
                    new object[] { (short)2, "Petr", "Petrov", null, new DateTime(2020, 1, 1), null, null },
                    new object[] { (short)3, "Olga", "Barmanova", "I'm Olga!", new DateTime(2020, 1, 20), new DateTime(2020, 2, 5), true },
                });

            var guestsService = new GuestsService(databaseMock.Object);

            var guests = guestsService.GetGuests().ToArray();

            guests.Should().BeEquivalentTo(new[]
            {
                new GuestEntry { Id = 1, FirstName = "Ivan", LastName = "Ivanov", About = "All about Ivan" },
                new GuestEntry { Id = 2, FirstName = "Petr", LastName = "Petrov",
                    InvitationSentDateTime = new DateTime(2020, 1, 1) },
                new GuestEntry { Id = 3, FirstName = "Olga", LastName = "Barmanova", About = "I'm Olga!",
                    InvitationSentDateTime = new DateTime(2020, 1, 20), InvitationSeenDateTime = new DateTime(2020, 2, 5), IsGoing = true },
            });
        }
    }
}