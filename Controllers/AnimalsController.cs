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

        [HttpPost]
        public ActionResult<Animal> Create(Animal animal)
        {
            _animalService.Create(animal);

            return CreatedAtRoute("GetAnimal", new { id = animal.Id.ToString() }, animal);
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

        public IActionResult Index()
        {
            return View();
        }
    }
}