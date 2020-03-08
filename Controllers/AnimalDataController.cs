using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Animals.Data;
using Animals1.Models;
using Microsoft.AspNetCore.Mvc;

namespace Animals1.Controllers
{
    public class AnimalDataController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllAnimalsFromClass([Bind("id")] string id)
        {
            IList<Animal> allAnimalsOut = new List<Animal>();

            var x = 0;

            switch (id)
            {
                case "Cats":
                    allAnimalsOut = CatData.Cats;
                    foreach(Animal item in allAnimalsOut)
                    {
                        item.Id = x.ToString();
                        x++;
                        item.Species = "Cats";
                        item.Type = "Domestic";
                    }
                    break;
                case "Bears":
                    allAnimalsOut = BearData.Bears;
                    foreach (Animal item in allAnimalsOut)
                    {
                        item.Id = x.ToString();
                        x++;
                        item.Species = "Bears";
                        item.Type = "Wild";
                    }
                    break;
                case "Dogs":
                    allAnimalsOut = DogData.Dogs;
                    foreach (Animal item in allAnimalsOut)
                    {
                        item.Id = x.ToString();
                        x++;
                        item.Species = "Dogs";
                        item.Type = "Domestic";
                    }
                    break;
                case "Elephants":
                    allAnimalsOut = ElephantData.Elephants;
                    foreach (Animal item in allAnimalsOut)
                    {
                        item.Id = x.ToString();
                        x++;
                        item.Species = "Elephants";
                        item.Type = "Wild";
                    }
                    break;
                case "Monkeys":
                    allAnimalsOut = MonkeyData.Monkeys;
                    foreach (Animal item in allAnimalsOut)
                    {
                        item.Id = x.ToString();
                        x++;
                        item.Species = "Monkeys";
                        item.Type = "Wild";
                    }
                    break;
            }

            return Json(allAnimalsOut);
        }

        public IActionResult GetAllDistinctLocationData()
        {

            var Bears = BearData.Bears;
            var Cats = CatData.Cats;
            var Dogs = DogData.Dogs;
            var Elephants = ElephantData.Elephants;
            var Monkeys = MonkeyData.Monkeys;

            var result = Bears.Concat(Cats)
                              .Concat(Dogs)
                              .Concat(Elephants)
                              .Concat(Monkeys)
                              .Select(l => l.Location)
                              .ToList()
                              .Distinct();

            return Json(result);
        }



    }
}