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

        [HttpPost("CreateUser")]
        public IActionResult Create([FromBody] User user
            )
        {
            return Ok();
        }

        [HttpPut("UpdateUser")]
        public IActionResult Update()
        {
            return Ok();
        }


        [HttpDelete("DeleteUser")]
        public IActionResult Delete()
        {
            return Ok();
        }
    }
}
