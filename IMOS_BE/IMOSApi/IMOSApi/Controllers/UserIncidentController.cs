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
    public class UserincidentController : ControllerBase
    {
        [HttpGet("GetUserincidents")]
        public IEnumerable<Userincident> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Userincidents.ToList();
            }
        }
        [HttpGet("GetUserincident/{id}")]
        public IEnumerable<Userincident> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Userincident> tmp = context.Userincidents.Where(emp => emp.IncidentId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateUserincident")]
        public IActionResult Create([FromBody] Userincident Userincident)
        {
            using (var context = new IMOSContext())
            {
                context.Userincidents.Add(Userincident);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateUserincident/{Id}")]
        public void Update([FromBody] Userincident Userincident, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Userincidents.Where(clie => clie.IncidentId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteUserincident/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Userincidents.Where(clie => clie.IncidentId == id).ToList().FirstOrDefault();
                context.Userincidents.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}