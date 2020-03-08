using Animals1.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Animals1.Services
{
    public class AnimalService
    {
        private readonly IMongoCollection<Animal> _animals;

        public AnimalService(IAnimalDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _animals = database.GetCollection<Animal>(settings.AnimalCollectionName);
        }

        public List<Animal> Get() =>
            _animals.Find(Animal => true).ToList();

        public Animal Get(string id) =>
            _animals.Find<Animal>(animal => animal.Id == id).FirstOrDefault();

        public List<Animal> GetBySpecies(string species)
        {
            var listOut = _animals.Find<Animal>(animal => animal.Species == species).ToList();
            return listOut;
        }

        public Animal Create(Animal animal)
        {
            _animals.InsertOne(animal);
            return animal;
        }

        public void InsertBatch(List<Animal> animalList)
        {
            _animals.InsertManyAsync(animalList);
        }

        public void Update(string id, Animal animalIn) =>
            _animals.ReplaceOne(animal => animal.Id == id, animalIn);

        public void Remove(Animal animalIn) =>
            _animals.DeleteOne(animal => animal.Id == animalIn.Id);

        public void Remove(string id) =>
            _animals.DeleteOne(animal => animal.Id == id);
    }
}

