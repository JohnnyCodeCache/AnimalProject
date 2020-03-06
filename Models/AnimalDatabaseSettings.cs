using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Animals1.Models
{
    public class AnimalDatabaseSettings : IAnimalDatabaseSettings
    {
        public string AnimalCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IAnimalDatabaseSettings
    {
        string AnimalCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
