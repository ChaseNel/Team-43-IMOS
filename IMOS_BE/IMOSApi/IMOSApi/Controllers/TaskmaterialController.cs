using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskmaterialController : ControllerBase
    {
        [HttpGet("GetTaskmaterials")]
        public IEnumerable<Taskmaterial> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Taskmaterials.ToList();
            }
        }
        [HttpGet("GetTaskmaterial/{id}")]
        public IEnumerable<Taskmaterial> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Taskmaterial> tmp = context.Taskmaterials.Where(emp => emp.TaskId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateTaskmaterial")]
        public IActionResult Create([FromBody] Taskmaterial Taskmaterial)
        {
            using (var context = new IMOSContext())
            {
                context.Taskmaterials.Add(Taskmaterial);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateTaskmaterial/{Id}")]
        public void Update([FromBody] Taskmaterial Taskmaterial, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Taskmaterials.Where(clie => clie.TaskId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteEmployee/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Taskmaterials.Where(clie => clie.TaskId == id).ToList().FirstOrDefault();
                context.Taskmaterials.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}
