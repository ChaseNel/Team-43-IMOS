using IMOSApi.Dtos.Generic;
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
    public class TasktypeController : ControllerBase
    {
        private readonly IMOSContext _context;

        public TasktypeController(IMOSContext context)
        {
            _context = context;
        }

        [HttpGet("GetTasktypes")]
        public IEnumerable<Tasktype> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Tasktypes.ToList();
            }
        }

        [HttpPut("UpdateTasktype/{Id}")]
        public IActionResult Update(AddOrUpdateGenericDto model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Tasktypes.FirstOrDefault(item => item.Tasktype1 == id);

                if (recordInDb == null)
                {
                    return NotFound();
                }

                recordInDb.Description = model.Description;
                _context.SaveChanges();

                return Ok();
            }

            var message = "Something went wrong on your side.";
            return BadRequest(new { message });

        }
        [HttpDelete("deletetasktype/{Id}")]
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
