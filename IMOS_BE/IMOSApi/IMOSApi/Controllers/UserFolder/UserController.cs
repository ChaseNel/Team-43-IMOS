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
        [HttpGet("GetUsers")]
        public IActionResult Get()
        {
            return Ok();
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


        [HttpDelete("DeleteUser")]
        public IActionResult Delete()
        {
            return Ok();
        }
    }
}
