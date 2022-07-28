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
            var message = "";
            if (ModelState.IsValid)//checks if model is valid then  creates new MaterialType 
            {
                /*var newProject = new Project
                {
                    ProjectId = ProjectId,
                    Name = model.Name,
                    Description = model.Description,
                    MaterialtypeId = model.MaterialtypeId

                };
                _dbContext.Project.Add(newProject);
                _dbContext.SaveChanges();
                return Ok();*/
            }
            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("UpdateProject/{Id}")]
        public void Update([FromBody] Project Project, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = _dbContext.Projects.Where(clie => clie.ProjectId == Id).ToList().FirstOrDefault();
                //emp.
                _dbContext.SaveChanges();
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