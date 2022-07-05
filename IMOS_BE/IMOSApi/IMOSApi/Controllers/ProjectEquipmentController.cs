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
    public class ProjectEquipmentController : ControllerBase
    {
        [HttpGet("GetProjectequipments")]
        public IEnumerable<Projectequipment> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Projectequipments.ToList();
            }
        }
        [HttpGet("GetProjectequipment/{id}")]
        public IEnumerable<Projectequipment> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Projectequipment> tmp = context.Projectequipments.Where(emp => emp.ProjectId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateProjectequipment")]
        public IActionResult Create([FromBody] Projectequipment Projectequipment)
        {
            using (var context = new IMOSContext())
            {
                context.Projectequipments.Add(Projectequipment);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateProjectequipment/{Id}")]
        public void Update([FromBody] Projectequipment Projectequipment, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projectequipments.Where(clie => clie.ProjectId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteProjectequipment/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projectequipments.Where(clie => clie.ProjectId == id).ToList().FirstOrDefault(); ;
                context.Projectequipments.Remove(clie);
                context.SaveChanges();
            }
        }

    }
}
