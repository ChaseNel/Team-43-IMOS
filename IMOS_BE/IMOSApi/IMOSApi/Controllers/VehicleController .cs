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
        private IMOSContext _dbContext;
        public VehicleController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetVehicles")]
        public IEnumerable<Vehicle> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return _dbContext.Vehicles.ToList();
            }
        }
        [HttpGet("GetVehicle/{id}")]
        public IEnumerable<Vehicle> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Vehicle> tmp = _dbContext.Vehicles.Where(emp => emp.VehicleId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateVehicle")]
        public IActionResult Create([FromBody] Vehicle Vehicle)
        {
            using (var context = new IMOSContext())
            {
                _dbContext.Vehicles.Add(Vehicle);
                _dbContext.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateVehicle/{Id}")]
        public void Update([FromBody] Vehicle Vehicle, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = _dbContext.Vehicles.Where(clie => clie.VehicleId == Id).ToList().FirstOrDefault();
                //emp.
                _dbContext.SaveChanges();
            }
        }
        [HttpDelete("DeleteVehicle/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = _dbContext.Vehicles.Where(clie => clie.VehicleId == id).ToList().FirstOrDefault(); ;
                _dbContext.Vehicles.Remove(clie);
                _dbContext.SaveChanges();
            }
        }
    }
}