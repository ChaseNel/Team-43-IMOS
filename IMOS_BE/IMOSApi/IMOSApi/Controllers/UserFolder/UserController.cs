using IMOSApi.Dtos;
using IMOSApi.Dtos.User;
using IMOSApi.Extensions;
using IMOSApi.Helpers;
using IMOSApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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

        private readonly IConfiguration _configuration;

        public UserController(IMOSContext context)
        {
            _context = context;
        }


       // [Authorize]
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
                    Description = item.Userrole.Description,
                    UserroleId = item.UserroleId,
                    Name = item.Employee.Name,
                    Email=item.Employee.Email,
                    EmployeeId=item.EmployeeId
                }).OrderBy(item => item.Username).ToList();
            return recordsInDb;
        }


       [HttpPost("Register")]
        public IActionResult  Add(AddOrUpdateUserDto model)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb =  _context.Users.FirstOrDefault(item => item.Username.ToLower() == model.Username.ToLower());

                if (recordInDb != null)
                {
                    message = "Record exists in database";
                    return BadRequest(new { message });
                }

                var assignedPassword = UserManagementExtension.GenerateRandomPassword();
                var newUser = new User()
                {
                    UserroleId = model.UserroleId,
                    EmployeeId = model.EmployeeId,
                    Username = model.Username,
                    Userpassword =EncDscPassword.EncryptPassword(assignedPassword)
                };

                 _context.Users.Add(newUser);
                 _context.SaveChanges();
            

              // var notificationExtension = new NotificationsExtension(_configuration);
               //notificationExtension.NewUserNotification(newUser.UserId);
            }
            return Ok();
        }

        [HttpDelete("DeleteUser/{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            var message = "";
            var recordInDb = await _context.Users.FindAsync(id);
            if (recordInDb == null)
            {
                message = "Record Not Found";
                return BadRequest(new { message });
            }


            var usersStockTake= _context.Stocktakes.Where(item => item.UserId == id);
            _context.Stocktakes.RemoveRange(usersStockTake);
            await _context.SaveChangesAsync();

            var usersEquipmentChecks = _context.Equipmentchecks.Where(item => item.UserId == id);
            _context.Equipmentchecks.RemoveRange(usersEquipmentChecks);
            await _context.SaveChangesAsync();


            _context.Users.Remove(recordInDb);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("UpdateUser")]
        public IActionResult Update(User model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Users.FirstOrDefault(item => item.UserId == id);

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
    }
}

