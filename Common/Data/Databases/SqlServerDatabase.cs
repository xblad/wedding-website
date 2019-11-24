using System;
using System.ComponentModel.Composition;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.CodeAnalysis;

namespace _4ever20.Data.Databases
{
    [Export(typeof(IDatabase))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class SqlServerDatabase : IDatabase
    {
#if DEBUG
        private const string ENV = "DEV";
#else
        private const string ENV = "PROD";
#endif
        private string ConnectionString => $"Server=.\\SQLEXPRESS;Database=4EVER20_{ENV};Integrated Security=SSPI;";

        public IDbCommand CreateCommand() => new SqlCommand();

        [SuppressMessage("Security", "CA2100:Review SQL queries for security vulnerabilities")]
        public IDbCommand CreateCommand(string commandText, IDbConnection connection)
        {
            return new SqlCommand(commandText, (SqlConnection)connection)
            {
                CommandType = CommandType.Text
            };
        }

        public IDbConnection CreateConnection() => new SqlConnection(ConnectionString);

        public IDbConnection CreateOpenConnection()
        {
            IDbConnection sqlConnection = CreateConnection();
            sqlConnection.Open();

            return sqlConnection;
        }

        public IDataParameter CreateParameter(string parameterName, object parameterValue)
        {
            return new SqlParameter(parameterName, parameterValue);
        }

        [SuppressMessage("Security", "CA2100:Review SQL queries for security vulnerabilities")]
        public IDbCommand CreateStoredProcCommand(string procName, IDbConnection connection)
        {
            return new SqlCommand(procName, (SqlConnection)connection)
            {
                CommandType = CommandType.StoredProcedure
            };
        }
    }
}
