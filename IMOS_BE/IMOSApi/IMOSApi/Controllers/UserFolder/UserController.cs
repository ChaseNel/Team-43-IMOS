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


        [HttpDelete("DeleteUser/{id}")]
        public void Delete(int id)
        {
            var emp = _dbContext.Users.Where(emp => emp.UserId == id).ToList().FirstOrDefault(); ;
            _dbContext.Users.Remove(emp);
            _dbContext.SaveChanges();
        }
    }
}
