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
    public class WarehousematerialwriteoffController : ControllerBase
    {
        [HttpGet("GetWarehousematerialwriteoffs")]
        public IEnumerable<Warehousematerialwriteoff> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Warehousematerialwriteoffs.ToList();
            }
        }
        [HttpGet("GetWarehousematerialwriteoff/{id}")]
        public IEnumerable<Warehousematerialwriteoff> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Warehousematerialwriteoff> tmp = context.Warehousematerialwriteoffs.Where(emp => emp.WriteoffId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateWarehousematerialwriteoff")]
        public IActionResult Create([FromBody] Warehousematerialwriteoff Warehousematerialwriteoff)
        {
            using (var context = new IMOSContext())
            {
                context.Warehousematerialwriteoffs.Add(Warehousematerialwriteoff);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateWarehousematerialwriteoff/{Id}")]
        public void Update([FromBody] Warehousematerialwriteoff Warehousematerialwriteoff, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Warehousematerialwriteoffs.Where(clie => clie.WarehouseId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteEmployee/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Warehousematerialwriteoffs.Where(clie => clie.WarehouseId == id).ToList().FirstOrDefault(); ;
                context.Warehousematerialwriteoffs.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}