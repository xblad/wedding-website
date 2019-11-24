using System.Data;

namespace _4ever20.Data.Databases
{
    public static class DataReaderExtensions
    {
        public static T GetValueOrDefault<T>(this IDataReader dataReader, string columnName)
        {
            return !dataReader.IsDBNull(dataReader.GetOrdinal(columnName)) ? (T)dataReader[columnName] : default;
        }
    }
}
