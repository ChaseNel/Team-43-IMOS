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
    public class AttendenceController : ControllerBase
    {
        [HttpGet("GetAttendence")]
        public IEnumerable<Attendence> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Attendences.ToList();
            }
        }
        [HttpGet("GetAttendence/{id}")]
        public IEnumerable<Attendence> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Attendence> tmp = context.Attendences.Where(emp => emp.AttendenceId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateAttendence")]
        public IActionResult Create([FromBody] Attendence Attendance)
        {
            using (var context = new IMOSContext())
            {
                context.Attendences.Add(Attendance);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateAttendence/{Id}")]
        public void Update([FromBody] Attendence Attendance, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Attendences.Where(clie => clie.AttendenceId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteAttendence/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Attendences.Where(clie => clie.AttendenceId == id).ToList().FirstOrDefault(); ;
                context.Attendences.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}