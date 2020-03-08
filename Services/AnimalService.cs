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
            // local dev
            //var client = new MongoClient(settings.ConnectionString);
            //var database = client.GetDatabase(settings.DatabaseName);

            // prod
            var client = new MongoClient("mongodb+srv://dbMongoGuy:JqTZzfqG2zYaIjtk@anicluster1-efpmh.azure.mongodb.net/test?retryWrites=true&w=majority");
            var database = client.GetDatabase("AnimalDbPROD");


            _animals = database.GetCollection<Animal>(settings.AnimalCollectionName);
        }

        public List<Animal> Get() =>
            _animals.Find(Animal => true).ToList();

        public Animal Get(string id) =>
            _animals.Find<Animal>(animal => animal.Id == id).FirstOrDefault();

        public List<Animal> GetBySpecies(string species)
        {
            // THIS IS CASE SENSITIVE.  cats != Cats 
            //var listOut = _animals.Find<Animal>(animal => animal.Species == species).ToList();

            // THIS IS NOT CASE SENSITIVE
            // but it is a Contains, so when species = 'ca' anything with 'ca' in its Species will be returned.
            // works great now, but...
            // TODO:  Rework this so it is a find to lower, and not a Contains
            var listOut = _animals.AsQueryable().Where(animal => animal.Species.ToLower().Contains(species)).ToList(); 

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

        public List<Animal> Search(string id)
        {
            var nameOut = _animals.AsQueryable().Where(animal => animal.Name.ToLower().Contains(id)).ToList();
            var locationOut = _animals.AsQueryable().Where(animal => animal.Location.ToLower().Contains(id)).ToList();

            var listOut = nameOut.Concat(locationOut).ToList();

            return listOut;
        }

    }
}

