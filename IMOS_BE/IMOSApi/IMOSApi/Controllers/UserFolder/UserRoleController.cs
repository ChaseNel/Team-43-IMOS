using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers.UserFolder
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private IMOSContext _dbContext;
        public UserRoleController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("Roles/GetAll")]
        public IEnumerable<Userrole> GetAllRoles()
        {
            using (var context = new IMOSContext())

                return _dbContext.Userroles.ToList();
        }
        [HttpGet("GetUserRole/{id}")]
        public IEnumerable<Userrole> GetRecord(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Userrole> userroles = context.Userroles.Where(usr => usr.Userrole1 == id).ToList();
                return userroles;

            }
        }
        [HttpPost("AddRole")]
        public IActionResult Add([FromBody] Userrole userrole)
        {
            using (var context = new IMOSContext())
            {
                context.Userroles.Add(userrole);
                context.SaveChanges();
                return Ok();
            }
        }
        [HttpPut("EditUserRole/{id}")]
        public IActionResult Update([FromBody] Userrole userrole,[FromRoute] int Id)
        {
            if (ModelState.IsValid)
            {
                using(var context= new IMOSContext())
                {
                    var recordInDb = context.Userroles.FirstOrDefault();
                    if (recordInDb == null)
                    {
                        return NotFound();
                    }
                    recordInDb.Description = userrole.Description;
                    context.SaveChanges();
                    return Ok();
                }
            }
            var message = "Something went wrong on your side";
            return BadRequest(new { message });

        }
        [HttpDelete("RemoveUserRole/{id}")]
        public async Task<ActionResult<Userrole>>Delete(int Id)
        {
            using(var context=new IMOSContext())
            {
                var recordInDb = await _dbContext.Userroles.FindAsync(Id);
                    if (recordInDb == null)
                    {
                        return NotFound();
                    }
                _dbContext.Userroles.Remove(recordInDb);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            
        }

    }
}
