using IMOSApi.Dtos;
using IMOSApi.Dtos.User;
using IMOSApi.Extensions;
using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers.UserFolder
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMOSContext _context;
        public UserController(IMOSContext dbContext)
        {
            _context = dbContext;
        }

        [HttpGet("GetAll/Users")]
        public ActionResult<IEnumerable<GetUserDto>> GetAll()
        {
            var recordsInDb = _context.Users
                .Include(item => item.Userrole)
                .Include(item=>item.Employee)
                .Select(item => new GetUserDto()
                {
                    Id = item.UserId,
                    Username = item.Username,
                    autoAssignedPassword =item.Userpassword,
                    Userrole = item.Userrole.Description,
                    UserroleId = item.UserroleId,
                    Employee = item.Employee.Name,
                    EmployeeId=item.EmployeeId
                }).OrderBy(item => item.Id).ToList();
            return recordsInDb;
        }

        [HttpPost("Register/UserAccount")]
        public async Task<ActionResult> Add(AddOrUpdateUserDto model)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = await _context.Users
                    .Include(item=>item.Employee)
                    .Where(item => item.UserroleId == model.UserroleId).FirstOrDefaultAsync(item => item.EmployeeId == model.EmployeeId);
                if (recordInDb != null)
                {
                    message = "Record exists in database";
                    return BadRequest(new { message });
                }

                var assignedPassword = UserManagementExtension.GenerateRandomPassword();
                var newUser = new User()
                {
                    Username = model.Username,
                    EmployeeId = model.EmployeeId,
                    UserroleId = model.UserroleId,
                    Userpassword= assignedPassword,// auto  generate 
                   
                };
                // add notification extension
                await _context.AddAsync(newUser);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        [HttpPut("UpdateUser")]
        public IActionResult Update(User model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _context .Users.FirstOrDefault(item => item.UserId == id);

                if (recordInDb != null)
                {
                    return NotFound();
                }
                recordInDb.EmployeeId = model.EmployeeId;
                recordInDb.Userrole = model.Userrole;
                recordInDb.Username = model.Username;
                recordInDb.Userpassword = model.Userpassword;
                _context.SaveChanges();
                return Ok();
            }
            var message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

      /*  [HttpDelete("DeleteUser/{id}")]
        public void Delete(int id)
        {
            var emp = _dbContext.Users.Where(emp => emp.UserId == id).ToList().FirstOrDefault(); ;
            _dbContext.Users.Remove(emp);
            _dbContext.SaveChanges();
        }*/
    }
}

