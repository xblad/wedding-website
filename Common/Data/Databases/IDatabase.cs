using System.Data;
using System.Threading.Tasks;

namespace _4ever20.Data.Databases
{
    public interface IDatabase
    {
        IDbConnection CreateConnection();
        IDbCommand CreateCommand();
        Task<IDbConnection> CreateOpenConnectionAsync();
        IDbConnection CreateOpenConnection();
        IDbCommand CreateCommand(string commandText, IDbConnection connection);
        IDbCommand CreateStoredProcCommand(string procName, IDbConnection connection);
        IDataParameter CreateParameter(string parameterName, object parameterValue);
    }
}
