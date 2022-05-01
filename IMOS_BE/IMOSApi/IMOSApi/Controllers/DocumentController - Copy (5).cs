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
    public class DocumentController : ControllerBase
    {
        [HttpGet("GetDocuments")]
        public IEnumerable<Document> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Documents.ToList();
            }
        }
        [HttpGet("GetDocument/{id}")]
        public IEnumerable<Document> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Document> tmp = context.Documents.Where(emp => emp.DocumentId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateDocument")]
        public IActionResult Create([FromBody] Document Document)
        {
            using (var context = new IMOSContext())
            {
                context.Documents.Add(Document);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateDocument/{Id}")]
        public void Update([FromBody] Document Document, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Documents.Where(clie => clie.DocumentId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteEmployee/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Documents.Where(clie => clie.DocumentId == id).ToList().FirstOrDefault(); ;
                context.Documents.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}