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
    public class ConstructionsiteController : ControllerBase
    {
        [HttpGet("GetConstructionsites")]
        public IEnumerable<Constructionsite> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Constructionsites.ToList();
            }
        }
        [HttpGet("GetConstructionsite/{id}")]
        public IEnumerable<Constructionsite> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Constructionsite> tmp = context.Constructionsites.Where(emp => emp.ConstructionsiteId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateConstructionsite")]
        public IActionResult Create([FromBody] Constructionsite Constructionsite)
        {
            using (var context = new IMOSContext())
            {
                context.Constructionsites.Add(Constructionsite);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateConstructionsite/{Id}")]
        public void Update([FromBody] Constructionsite Constructionsite, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Constructionsites.Where(clie => clie.ConstructionsiteId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteConstructionsite/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Constructionsites.Where(clie => clie.ConstructionsiteId == id).ToList().FirstOrDefault(); ;
                context.Constructionsites.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}