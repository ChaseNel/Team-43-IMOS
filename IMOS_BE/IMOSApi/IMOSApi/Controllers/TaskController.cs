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
    public class TaskController : ControllerBase
    {
        [HttpGet("GetTask")]
        public IEnumerable<Models.Task> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Tasks.ToList();
            }
        }
        [HttpGet("GetTask/{id}")]
        public IEnumerable<Models.Task> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Models.Task> tmp = context.Tasks.Where(emp => emp.TaskId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateTask")]
        public IActionResult Create([FromBody] Models.Task Attendance)
        {
            using (var context = new IMOSContext())
            {
                context.Tasks.Add(Attendance);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateTask/{Id}")]
        public void Update([FromBody] Models.Task Attendance, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Tasks.Where(clie => clie.TaskId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteTask/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Tasks.Where(clie => clie.TaskId == id).ToList().FirstOrDefault(); ;
                context.Tasks.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}