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
    public class EquipmentcheckController : ControllerBase
    {
        [HttpGet("GetEquipmentchecks")]
        public IEnumerable<Equipmentcheck> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Equipmentchecks.ToList();
            }
        }
        [HttpGet("GetEquipmentcheck/{id}")]
        public IEnumerable<Equipmentcheck> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Equipmentcheck> tmp = context.Equipmentchecks.Where(emp => emp.EquipmentcheckId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateEquipmentcheck")]
        public IActionResult Create([FromBody] Equipmentcheck Equipmentcheck)
        {
            using (var context = new IMOSContext())
            {
                context.Equipmentchecks.Add(Equipmentcheck);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateEquipmentcheck/{Id}")]
        public void Update([FromBody] Equipmentcheck Equipmentcheck, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Equipmentchecks.Where(clie => clie.EquipmentcheckId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteEquipmentcheck/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Equipmentchecks.Where(clie => clie.EquipmentcheckId == id).ToList().FirstOrDefault(); ;
                context.Equipmentchecks.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}