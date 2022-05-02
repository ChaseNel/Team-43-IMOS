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
    public class SafetyfilechecklistController : ControllerBase
    {
        [HttpGet("GetSafetyfilechecklists")]
        public IEnumerable<Safetyfilechecklist> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Safetyfilechecklists.ToList();
            }
        }
        [HttpGet("GetSafetyfilechecklist/{id}")]
        public IEnumerable<Safetyfilechecklist> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Safetyfilechecklist> tmp = context.Safetyfilechecklists.Where(emp => emp.ProjectId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateSafetyfilechecklist")]
        public IActionResult Create([FromBody] Safetyfilechecklist Safetyfilechecklist)
        {
            using (var context = new IMOSContext())
            {
                context.Safetyfilechecklists.Add(Safetyfilechecklist);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateSafetyfilechecklist/{Id}")]
        public void Update([FromBody] Safetyfilechecklist Safetyfilechecklist, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Safetyfilechecklists.Where(clie => clie.ProjectId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteSafetyfilechecklist/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Safetyfilechecklists.Where(clie => clie.ProjectId == id).ToList().FirstOrDefault(); ;
                context.Safetyfilechecklists.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}