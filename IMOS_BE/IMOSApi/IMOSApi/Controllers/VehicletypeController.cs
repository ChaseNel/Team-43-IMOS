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
    public class VehicletypeController : ControllerBase
    {
        private IMOSContext _dbContext;
        public VehicletypeController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetVehicletypes")]
        public IEnumerable<Vehicletype> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return _dbContext.Vehicletypes.ToList();
            }
        }
        [HttpGet("GetVehicletype/{id}")]
        public IEnumerable<Vehicletype> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Vehicletype> tmp = _dbContext.Vehicletypes.Where(emp => emp.VehicletypeId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateVehicletype")]
        public IActionResult Create([FromBody] Vehicletype Vehicletype)
        {
            using (var context = new IMOSContext())
            {
                _dbContext.Vehicletypes.Add(Vehicletype);
                _dbContext.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateVehicletype/{Id}")]
        public void Update([FromBody] Vehicletype Vehicletype, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = _dbContext.Vehicletypes.Where(clie => clie.VehicletypeId == Id).ToList().FirstOrDefault();
                //emp.
                _dbContext.SaveChanges();
            }
        }
        [HttpDelete("DeleteVehicleType/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = _dbContext.Vehicletypes.Where(clie => clie.VehicletypeId == id).ToList().FirstOrDefault(); ;
                _dbContext.Vehicletypes.Remove(clie);
                _dbContext.SaveChanges();
            }
        }
    }
}