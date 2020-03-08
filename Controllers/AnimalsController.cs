using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Animals1.Models;
using Animals1.Services;
using Microsoft.AspNetCore.Mvc;

namespace Animals1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsController : Controller
    {
        private readonly AnimalService _animalService;

        public AnimalsController(AnimalService animalService)
        {
            _animalService = animalService;
        }

        [HttpGet]
        public ActionResult<List<Animal>> Get() =>
                   _animalService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAnimal")]
        public ActionResult<Animal> Get(string id)
        {
            var animal = _animalService.Get(id);

            if (animal == null)
            {
                return NotFound();
            }

            return animal;
        }


        [HttpGet("/api/animals/getbyspecies/{id}")]
        public ActionResult<List<Animal>> GetBySpecies(string id)
        {
            // THIS IS no longer case sensitive 
            var animalsOut = _animalService.GetBySpecies(id);
            return animalsOut;
        }

        [HttpGet("/api/animals/search/{id}")]
        public ActionResult<List<Animal>> Search(string id)
        {
            // THIS IS no longer case sensitive 
            var animalsOut = _animalService.Search(id);
            return animalsOut;
        }


        [HttpPost]
        public ActionResult<Animal> Create(Animal animal)
        {
            _animalService.Create(animal);

            return CreatedAtRoute("GetAnimal", new { id = animal.Id.ToString() }, animal);
        }

        [HttpPost("/api/animals/createbatch")]
        public IActionResult CreateBatch(List<Animal> animalList)
        { 
            _animalService.InsertBatch(animalList);

            return NoContent();
        }



        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Animal animalIn)
        {
            var animal = _animalService.Get(id);

            if (animal == null)
            {
                return NotFound();
            }

            _animalService.Update(id, animalIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var animal = _animalService.Get(id);

            if (animal == null)
            {
                return NotFound();
            }

            _animalService.Remove(animal.Id);

            return NoContent();
        }
    }
}