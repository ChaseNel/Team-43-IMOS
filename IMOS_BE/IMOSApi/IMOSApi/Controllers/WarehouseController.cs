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
    public class WarehouseController : ControllerBase
    {
        [HttpGet("GetWarehouses")]
        public IEnumerable<Warehouse> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Warehouses.ToList();
            }
        }
        [HttpGet("GetWarehouse/{id}")]
        public IEnumerable<Warehouse> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Warehouse> tmp = context.Warehouses.Where(emp => emp.WarehouseId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateWarehouse")]
        public IActionResult Create([FromBody] Warehouse Warehouse)
        {
            using (var context = new IMOSContext())
            {
                context.Warehouses.Add(Warehouse);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateWarehouse/{Id}")]
        public void Update([FromBody] Warehouse Warehouse, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Warehouses.Where(clie => clie.WarehouseId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteWarehouse/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Warehouses.Where(clie => clie.WarehouseId == id).ToList().FirstOrDefault(); ;
                context.Warehouses.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}