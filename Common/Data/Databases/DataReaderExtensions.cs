using System.Data;
using System.Threading.Tasks;

namespace _4ever20.Data.Databases
{
    public static class DataReaderExtensions
    {
        public static T GetValueOrDefault<T>(this IDataReader dataReader, string columnName)
        {
            return !dataReader.IsDBNull(dataReader.GetOrdinal(columnName)) ? (T)dataReader[columnName] : default;
        }

        public static async Task<T> GetValueOrDefaultAsync<T>(this IDataReader dataReader, string columnName)
        {
            var ordinal = dataReader.GetOrdinal(columnName);
            return !await dataReader.IsDBNullAsync(ordinal).ConfigureAwait(false)
                ? await dataReader.GetFieldValueAsync<T>(ordinal).ConfigureAwait(false) : default;
        }
    }
}
