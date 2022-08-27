using IMOSApi.Dtos.SafetyChecklist;
using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers.SafetyChecklistManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class SafetyChecklistController : ControllerBase
    {
        private readonly IMOSContext _context;
        public SafetyChecklistController(IMOSContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetProjectSafetyChecklistsDto>> GetAll()
        {
            var recordsInDb = _context.Safetyfilechecklists
                .Include(item => item.Project)
                .Include(item => item.Safetyfileitem)
                .ThenInclude(item => item.Safetyitemcategory)
                .Select(item => new GetProjectSafetyChecklistsDto()
                {
                    Id = item.ProjectId,
                    projectName = item.Project.Name,
                    name=item.Safetyfileitem.Name,
                    SafetyfileitemId=item.SafetyfileitemId,


                }).OrderBy(item => item.projectName).ToList();
            return Ok();
        }



        [HttpPost("AddChecklist")]
        public IActionResult AddProjectChecklist(AddProjectChecklistDto model)
        {
            var message = "";
            if (!ModelState.IsValid)
            {
                message = "Something went wrong on your side.";
                return BadRequest(new { message });
            }

            var projectItemsInDb = _context.Safetyfilechecklists.FirstOrDefault(item => item.ProjectId == model.ProjectId);
            if (projectItemsInDb != null)
            {
                message = "Project not found";
                return BadRequest(new { message });
            }

            foreach (var item in model.SafetyItems)
            {
                var record = new Safetyfilechecklist()
                {
                    ProjectId = model.ProjectId,
                    SafetyfileitemId = item.SafetyfileitemId
                };
                _context.Safetyfilechecklists.Add(record);
            }
            _context.SaveChanges();
            return Ok();
        }


        // UPDATE 


        //DELETE  NB TO be Inserted into audit log ADD OR DELETE OPERATIONS 

    }
}
