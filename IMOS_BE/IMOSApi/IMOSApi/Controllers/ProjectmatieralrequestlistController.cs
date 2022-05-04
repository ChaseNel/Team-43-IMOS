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
    public class ProjectmaterialrequestlistController : ControllerBase
    {
        [HttpGet("GetProjectmaterialrequestlists")]
        public IEnumerable<Projectmaterialrequestlist> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Projectmaterialrequestlists.ToList();
            }
        }
        [HttpGet("GetProjectmaterialrequestlist/{id}")]
        public IEnumerable<Projectmaterialrequestlist> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Projectmaterialrequestlist> tmp = context.Projectmaterialrequestlists.Where(emp => emp.ProjectmaterialrequestId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateProjectmaterialrequestlist")]
        public IActionResult Create([FromBody] Projectmaterialrequestlist Projectmaterialrequestlist)
        {
            using (var context = new IMOSContext())
            {
                context.Projectmaterialrequestlists.Add(Projectmaterialrequestlist);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateProjectmaterialrequestlist/{Id}")]
        public void Update([FromBody] Projectmaterialrequestlist Projectmaterialrequestlist, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projectmaterialrequestlists.Where(clie => clie.ProjectmaterialrequestId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteProjectmaterialrequestlist/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projectmaterialrequestlists.Where(clie => clie.ProjectmaterialrequestId == id).ToList().FirstOrDefault(); ;
                context.Projectmaterialrequestlists.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}