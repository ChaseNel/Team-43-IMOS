using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectEmployeeController : ControllerBase
    {
        [HttpGet("GetProjectemployees")]
        public IEnumerable<Projectemployee> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Projectemployees.ToList();
            }
        }
        [HttpGet("GetProjectemployee/{id}")]
        public IEnumerable<Projectemployee> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Projectemployee> tmp = context.Projectemployees.Where(emp => emp.ProjectId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateProjectemployee")]
        public IActionResult Create([FromBody] Projectemployee Projectemployee)
        {
            using (var context = new IMOSContext())
            {
                context.Projectemployees.Add(Projectemployee);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateProjectemployee/{Id}")]
        public void Update([FromBody] Projectemployee Projectemployee, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projectemployees.Where(clie => clie.ProjectId == Id).ToList().FirstOrDefault();

                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteProjectemployee/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projectemployees.Where(clie => clie.ProjectId == id).ToList().FirstOrDefault(); ;
                context.Projectemployees.Remove(clie);
                context.SaveChanges();
            }
        }
    }

}
