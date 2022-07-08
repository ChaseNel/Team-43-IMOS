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
    public class ProjectController : ControllerBase
    {
        private IMOSContext _dbContext;
        public ProjectController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetProjects")]
        public IEnumerable<Project> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return _dbContext.Projects.ToList();
            }
        }
        [HttpGet("GetProject/{id}")]
        public IEnumerable<Project> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Project> tmp = context.Projects.Where(emp => emp.ProjectId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateProject")]
        public IActionResult Create([FromBody] Project Project)
        {
            using (var context = new IMOSContext())
            {
                context.Projects.Add(Project);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateProject/{Id}")]
        public void Update([FromBody] Project Project, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projects.Where(clie => clie.ProjectId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteProject/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = _dbContext.Projects.Where(clie => clie.ProjectId == id).ToList().FirstOrDefault(); ;
                _dbContext.Projects.Remove(clie);
                _dbContext.SaveChanges();
            }
        }
    }
}