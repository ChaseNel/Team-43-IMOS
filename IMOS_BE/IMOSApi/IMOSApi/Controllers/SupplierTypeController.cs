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
    public class SuppliertypeController : ControllerBase
    {
        private IMOSContext _dbContext;
        public SuppliertypeController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetSuppliertype")]
        public IEnumerable<Suppliertype> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return _dbContext.Suppliertypes.ToList();
            }
        }
        [HttpGet("GetSuppliertype/{id}")]
        public IEnumerable<Suppliertype> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Suppliertype> tmp = context.Suppliertypes.Where(emp => emp.SuppliertypeId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateSuppliertype")]
        public IActionResult Create([FromBody] Suppliertype Suppliertype)
        {
            using (var context = new IMOSContext())
            {
                context.Suppliertypes.Add(Suppliertype);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateSuppliertype/{Id}")]
        public void Update([FromBody] Suppliertype Suppliertype, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Suppliertypes.Where(clie => clie.SuppliertypeId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteSuppliertype/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = _dbContext.Suppliertypes.Where(clie => clie.SuppliertypeId == id).ToList().FirstOrDefault(); ;
                _dbContext.Suppliertypes.Remove(clie);
                _dbContext.SaveChanges();
            }
        }
    }
}