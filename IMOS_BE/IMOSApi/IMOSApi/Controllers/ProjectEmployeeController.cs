using IMOSApi.Dtos.Project;
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
        private IMOSContext _context;
        public ProjectEmployeeController(IMOSContext dbContext)
        {
            _context = dbContext;
        }
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

        [HttpPost("Assign")]
        public IActionResult Assign(AssignEmployeeToProjectDto model)
        {
            var message = "";
            if (!ModelState.IsValid)
            {
                message = "Something went wrong on your side.";
                return BadRequest(new { message });
            }

            var projectInDb = _context.Projects.FirstOrDefault(item => item.ProjectId == model.ProjectId);
            if (projectInDb == null)
            {
                message = "Project not found";
                return BadRequest(new { message });
            }
            var employeeInDb = _context.Employees.FirstOrDefault(item => item.EmployeeId == model.EmployeeId);

            if (employeeInDb == null)
            {
                message = "Employee not found";
                return BadRequest(new { message });
            }

            var newAllocation = new Projectemployee()
            {
                ProjectId = projectInDb.ProjectId,
                EmployeeId = employeeInDb.EmployeeId,
            };
            _context.Projectemployees.Add(newAllocation);
            _context.SaveChanges();
            return Ok();

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
