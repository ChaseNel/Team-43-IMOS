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
    public class EquipmentController : ControllerBase
    {
        [HttpGet("GetEquipments")]
        public IEnumerable<Equipment> Retrieve()
        {
            using ( var context = new IMOSContext())
            {
                return context.Equipment.ToList();
            }
        }
        [HttpGet("GetEquipment/{id}")]
        public IEnumerable<Equipment> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Equipment> tmp = context.Equipment.Where(emp => emp.EquipmentId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateEquipment")]
        public IActionResult Create([FromBody] Equipment Equipment)
        {
            using (var context = new IMOSContext())
            {
                context.Equipment.Add(Equipment);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateEquipment/{Id}")]
        public void Update([FromBody] Equipment Equipment,[FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var emp = context.Equipment.Where(emp => emp.EquipmentId == Id).ToList().FirstOrDefault(); ;

                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteEquipment/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var emp = context.Equipment.Where(emp => emp.EquipmentId == id).ToList().FirstOrDefault(); ;
                context.Equipment.Remove(emp);
                context.SaveChanges();
            }
        }
    }
}
