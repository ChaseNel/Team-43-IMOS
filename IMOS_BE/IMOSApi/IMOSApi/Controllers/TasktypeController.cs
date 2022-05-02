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
    public class TasktypeController : ControllerBase
    {
        [HttpGet("GetTasktypes")]
        public IEnumerable<Tasktype> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Tasktypes.ToList();
            }
        }
        [HttpGet("GetTasktype/{id}")]
        public IEnumerable<Tasktype> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Tasktype> tmp = context.Tasktypes.Where(emp => emp.Tasktype1 == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateTasktype")]
        public IActionResult Create([FromBody] Tasktype Tasktype)
        {
            using (var context = new IMOSContext())
            {
                context.Tasktypes.Add(Tasktype);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateTasktype/{Id}")]
        public void Update([FromBody] Tasktype Tasktype, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Tasktypes.Where(clie => clie.Tasktype1 == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteEmployee/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Tasktypes.Where(clie => clie.Tasktype1 == id).ToList().FirstOrDefault(); ;
                context.Tasktypes.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}