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
    public class MaterialtypeController : ControllerBase
    {
        private IMOSContext _dbContext;
        public MaterialtypeController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetMaterialtypes")]
        public IEnumerable<Materialtype> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return _dbContext.Materialtypes.ToList();
            }
        }
        [HttpGet("GetMaterialtype/{id}")]
        public IEnumerable<Materialtype> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Materialtype> tmp = context.Materialtypes.Where(emp => emp.MaterialtypeId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateMaterialtype")]
        public IActionResult Create([FromBody] Materialtype Materialtype)
        {
            using (var context = new IMOSContext())
            {
                context.Materialtypes.Add(Materialtype);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateMaterialtype/{Id}")]
        public void Update([FromBody] Materialtype Materialtype, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Materialtypes.Where(clie => clie.MaterialtypeId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteMaterialtype/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Materialtypes.Where(clie => clie.MaterialtypeId == id).ToList().FirstOrDefault(); ;
                context.Materialtypes.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}