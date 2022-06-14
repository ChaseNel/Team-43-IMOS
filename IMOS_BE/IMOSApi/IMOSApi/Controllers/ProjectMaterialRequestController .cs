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
    public class ProjectmaterialrequestController : ControllerBase
    {
        private IMOSContext _dbContext;
        public ProjectmaterialrequestController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetProjectmaterialrequests")]
        public IEnumerable<Projectmaterialrequest> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return _dbContext.Projectmaterialrequests.ToList();
            }
        }
        [HttpGet("GetProjectmaterialrequest/{id}")]
        public IEnumerable<Projectmaterialrequest> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Projectmaterialrequest> tmp = context.Projectmaterialrequests.Where(emp => emp.ProjectmaterialrequestId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateProjectmaterialrequest")]
        public IActionResult Create([FromBody] Projectmaterialrequest Projectmaterialrequest)
        {
            using (var context = new IMOSContext())
            {
                context.Projectmaterialrequests.Add(Projectmaterialrequest);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateProjectmaterialrequest/{Id}")]
        public void Update([FromBody] Projectmaterialrequest Projectmaterialrequest, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projectmaterialrequests.Where(clie => clie.ProjectmaterialrequestId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteProjectmaterialrequest/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projectmaterialrequests.Where(clie => clie.ProjectmaterialrequestId == id).ToList().FirstOrDefault(); ;
                context.Projectmaterialrequests.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}