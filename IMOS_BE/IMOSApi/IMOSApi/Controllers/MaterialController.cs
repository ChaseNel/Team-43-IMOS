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
    public class MaterialController : ControllerBase
    {
        [HttpGet("GetMaterials")]
        public IEnumerable<Material> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Materials.ToList();
            }
        }
        [HttpGet("GetMaterial/{id}")]
        public IEnumerable<Material> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Material> tmp = context.Materials.Where(emp => emp.MaterialId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateMaterial")]
        public IActionResult Create([FromBody] Material Material)
        {
            using (var context = new IMOSContext())
            {
                context.Materials.Add(Material);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateMaterial/{Id}")]
        public IActionResult Update([FromBody] Material material, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var mat = context.Materials.Where(mat => mat.MaterialId == Id).ToList().FirstOrDefault();
                context.SaveChanges();
                return Ok();
            }
        }
        [HttpDelete("DeleteMaterial/{Id}")]
        public IActionResult Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var mat = context.Materials.Where(mat => mat.MaterialId == id).ToList().FirstOrDefault(); ;
                context.Materials.Remove(mat);
                context.SaveChanges();
                return Ok();
            }
        }
    }
}