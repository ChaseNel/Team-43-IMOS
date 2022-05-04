using IMOSApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {
        [HttpGet("GetVehicles")]
        public IEnumerable<Vehicle> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Vehicles.ToList();
            }
        }
        [HttpGet("GetVehicle/{id}")]
        public IEnumerable<Vehicle> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Vehicle> tmp = context.Vehicles.Where(emp => emp.VehicleId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateVehicle")]
        public IActionResult Create([FromBody] Vehicle Vehicle)
        {
            using (var context = new IMOSContext())
            {
                context.Vehicles.Add(Vehicle);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateVehicle/{Id}")]
        public void Update([FromBody] Vehicle Vehicle, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Vehicles.Where(clie => clie.VehicleId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteVehicle/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Vehicles.Where(clie => clie.VehicleId == id).ToList().FirstOrDefault(); ;
                context.Vehicles.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}