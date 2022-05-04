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
    public class SupplierController : ControllerBase
    {
        [HttpGet("GetSuppliers")]
        public IEnumerable<Supplier> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Suppliers.ToList();
            }
        }
        [HttpGet("GetSupplier/{id}")]
        public IEnumerable<Supplier> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Supplier> tmp = context.Suppliers.Where(emp => emp.SupplierId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateSupplier")]
        public IActionResult Create([FromBody] Supplier Supplier)
        {
            using (var context = new IMOSContext())
            {
                context.Suppliers.Add(Supplier);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateSupplier/{Id}")]
        public void Update([FromBody] Supplier Supplier, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Suppliers.Where(clie => clie.SupplierId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteSupplier/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Suppliers.Where(clie => clie.SupplierId == id).ToList().FirstOrDefault(); ;
                context.Suppliers.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}