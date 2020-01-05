using System.ComponentModel.Composition;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;

namespace _4ever20.Data.Databases
{
    [Export(typeof(IDatabase))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class SqlServerDatabase : IDatabase
    {
        private string ConnectionString { get; set; }

        public SqlServerDatabase([Import("ConnectionString")] string connectionString)
        {
            ConnectionString = connectionString;
        }

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

        public async Task<IDbConnection> CreateOpenConnectionAsync()
        {
            IDbConnection sqlConnection = CreateConnection();
            await sqlConnection.OpenAsync().ConfigureAwait(false);

            return sqlConnection;
        }

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
