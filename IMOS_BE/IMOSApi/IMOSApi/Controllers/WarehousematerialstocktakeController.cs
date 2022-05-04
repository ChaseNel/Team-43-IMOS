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
    public class WarehousematerialstocktakeController : ControllerBase
    {
        [HttpGet("GetWarehousematerialstocktakes")]
        public IEnumerable<Warehousematerialstocktake> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Warehousematerialstocktakes.ToList();
            }
        }
        [HttpGet("GetWarehousematerialstocktake/{id}")]
        public IEnumerable<Warehousematerialstocktake> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Warehousematerialstocktake> tmp = context.Warehousematerialstocktakes.Where(emp => emp.StocktakeId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateWarehousematerialstocktake")]
        public IActionResult Create([FromBody] Warehousematerialstocktake Warehousematerialstocktake)
        {
            using (var context = new IMOSContext())
            {
                context.Warehousematerialstocktakes.Add(Warehousematerialstocktake);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateWarehousematerialstocktake/{Id}")]
        public void Update([FromBody] Warehousematerialstocktake Warehousematerialstocktake, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Warehousematerialstocktakes.Where(clie => clie.StocktakeId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteEmployee/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Warehousematerialstocktakes.Where(clie => clie.StocktakeId == id).ToList().FirstOrDefault();
                context.Warehousematerialstocktakes.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}