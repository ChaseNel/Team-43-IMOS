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
        [HttpGet("GetVehicletypes")]
        public IEnumerable<Vehicletype> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Vehicletypes.ToList();
            }
        }
        [HttpGet("GetVehicletype/{id}")]
        public IEnumerable<Vehicletype> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Vehicletype> tmp = context.Vehicletypes.Where(emp => emp.VehicletypeId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateVehicletype")]
        public IActionResult Create([FromBody] Vehicletype Vehicletype)
        {
            using (var context = new IMOSContext())
            {
                context.Vehicletypes.Add(Vehicletype);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateVehicletype/{Id}")]
        public void Update([FromBody] Vehicletype Vehicletype, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Vehicletypes.Where(clie => clie.VehicletypeId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteEmployee/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Vehicletypes.Where(clie => clie.VehicletypeId == id).ToList().FirstOrDefault(); ;
                context.Vehicletypes.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}