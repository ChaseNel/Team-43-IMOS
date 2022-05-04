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
    public class WarehousematerialController : ControllerBase
    {
        [HttpGet("GetWarehousematerials")]
        public IEnumerable<Warehousematerial> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Warehousematerials.ToList();
            }
        }
        [HttpGet("GetWarehousematerial/{id}")]
        public IEnumerable<Warehousematerial> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Warehousematerial> tmp = context.Warehousematerials.Where(emp => emp.WarehouseId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateWarehousematerial")]
        public IActionResult Create([FromBody] Warehousematerial Warehousematerial)
        {
            using (var context = new IMOSContext())
            {
                context.Warehousematerials.Add(Warehousematerial);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateWarehousematerial/{Id}")]
        public void Update([FromBody] Warehousematerial Warehousematerial, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Warehousematerials.Where(clie => clie.WarehouseId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteEmployee/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Warehousematerials.Where(clie => clie.WarehouseId == id).ToList().FirstOrDefault(); ;
                context.Warehousematerials.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}