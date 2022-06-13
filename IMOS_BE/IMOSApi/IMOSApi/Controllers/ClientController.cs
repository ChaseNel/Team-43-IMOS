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
    public class ClientController : ControllerBase
    {
        private IMOSContext _dbContext;
        public ClientController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetClients")]
        public IEnumerable<Client> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return _dbContext.Clients.ToList();
            }
        }
        [HttpGet("GetClient/{id}")]
        public IEnumerable<Client> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Client> tmp = context.Clients.Where(emp => emp.ClientId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateClient")]
        public IActionResult Create([FromBody] Client client)
        {
            using (var context = new IMOSContext())
            {
                context.Clients.Add(client);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateClient/{Id}")]
        public void Update([FromBody] Client client, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Clients.Where(clie => clie.ClientId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteClient/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = _dbContext.Clients.Where(clie => clie.ClientId == id).ToList().FirstOrDefault(); ;
                _dbContext.Clients.Remove(clie);
                _dbContext.SaveChanges();
            }
        }
    }
}