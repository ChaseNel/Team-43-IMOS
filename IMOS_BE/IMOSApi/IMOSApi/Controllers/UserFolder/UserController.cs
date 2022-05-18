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
    public class UserController : ControllerBase
    {
        private IMOSContext _dbContext;
        public UserController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            using (var context = new IMOSContext())
            {
                return _dbContext.Users.ToList();
            }
        }

        /*[HttpGet("GetUsers")]
         * 
         * 
         * 
        public IActionResult Get()
        {
            try
            {
                var users = _dbContext.Users.ToList();
                if(users.Count == 0)
                {
                    return StatusCode(404, "No User was found.");
                }
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "Error");
            }
        }*/

      /*  [HttpPost("CreateUser")]
        public IActionResult Create([FromBody] User user)
        {
            return Ok();
        }*/

        [HttpPost("CreateUser")]
        public ActionResult Add([FromBody] User model)
        {
            var message = "";
            if (ModelState.IsValid)


            { 
                
                var recordInDb = _dbContext.Users.FirstOrDefault(x => x.UserId == model.UserId);
                var User = _dbContext.Users
                    .FirstOrDefault(item =>
                    string.Equals(item.Username, model.Username));

                if (recordInDb != null)
                {
                    message = "Record already exist";
                    return BadRequest(new { message });
                }

                var newUser = new User()
                {
                    Username = model.Username,
                    Userpassword = model.Userpassword,
                    EmployeeId = model.EmployeeId,  
                    Userrole=model.Userrole,
                };

                _dbContext.Users.Add(newUser);
                _dbContext.SaveChanges();
                return Ok();    
            }

            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("UpdateUser")]
        public IActionResult Update(User model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _dbContext.Users.FirstOrDefault(item => item.UserId == id);

                if (recordInDb != null)
                {
                    return NotFound();
                }
                recordInDb.EmployeeId = model.EmployeeId;
                recordInDb.Userrole = model.Userrole;
                recordInDb.Username = model.Username;
                recordInDb.Userpassword = model.Userpassword;
                _dbContext.SaveChanges();
                return Ok();
            }
            var message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            var recordInDb = await _dbContext.Users.FindAsync(id);
            if (recordInDb == null)
            {
                return NotFound();
            }

            _dbContext.Users.Remove(recordInDb);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }


    }



    /*
        [HttpPut("UpdateUser")]
        public IActionResult Update()
        {
            return Ok();
        }*/


    /*  [HttpDelete("DeleteUser")]
      public IActionResult Delete()
      {
          return Ok();
      }*/



}

