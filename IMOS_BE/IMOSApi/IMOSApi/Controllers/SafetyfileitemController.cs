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
    public class SafetyfileitemController : ControllerBase
    {
        [HttpGet("GetSafetyfileitems")]
        public IEnumerable<Safetyfileitem> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Safetyfileitems.ToList();
            }
        }
        [HttpGet("GetSafetyfileitem/{id}")]
        public IEnumerable<Safetyfileitem> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Safetyfileitem> tmp = context.Safetyfileitems.Where(emp => emp.SafetyfileitemId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateSafetyfileitem")]
        public IActionResult Create([FromBody] Safetyfileitem Safetyfileitem)
        {
            using (var context = new IMOSContext())
            {
                context.Safetyfileitems.Add(Safetyfileitem);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateSafetyfileitem/{Id}")]
        public void Update([FromBody] Safetyfileitem Safetyfileitem, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Safetyfileitems.Where(clie => clie.SafetyfileitemId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteSafetyfileitem/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Safetyfileitems.Where(clie => clie.SafetyfileitemId == id).ToList().FirstOrDefault(); ;
                context.Safetyfileitems.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}