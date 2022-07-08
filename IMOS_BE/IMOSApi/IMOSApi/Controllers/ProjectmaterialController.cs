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
    public class ProjectmaterialController : ControllerBase
    {
        [HttpGet("GetProjectmaterials")]
        public IEnumerable<Projectmaterial> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Projectmaterials.ToList();
            }
        }
        [HttpGet("GetProjectmaterial/{id}")]
        public IEnumerable<Projectmaterial> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Projectmaterial> tmp = context.Projectmaterials.Where(emp => emp.ProjectId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateProjectmaterial")]
        public IActionResult Create([FromBody] Projectmaterial Projectmaterial)
        {
            using (var context = new IMOSContext())
            {
                context.Projectmaterials.Add(Projectmaterial);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateProjectmaterial/{Id}")]
        public void Update([FromBody] Projectmaterial Projectmaterial, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projectmaterials.Where(clie => clie.ProjectId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteProjectmaterial/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Projectmaterials.Where(clie => clie.ProjectId == id).ToList().FirstOrDefault(); ;
                context.Projectmaterials.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}

