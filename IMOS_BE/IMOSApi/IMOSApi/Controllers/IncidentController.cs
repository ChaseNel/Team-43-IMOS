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
    public class IncidentController : ControllerBase
    {
        private IMOSContext _dbContext;
        public IncidentController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetIncidents")]
        public IEnumerable<Incident> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return _dbContext.Incidents.ToList();
            }
        }
        [HttpGet("GetIncident/{id}")]
        public IEnumerable<Incident> Get(int id)
        {
            using (var context = new IMOSContext())
            {
                IEnumerable<Incident> tmp = context.Incidents.Where(emp => emp.IncidentId == id).ToList();
                return tmp;
            }
        }
        [HttpPost("CreateIncident")]
        public IActionResult Create([FromBody] Incident Incident)
        {
            using (var context = new IMOSContext())
            {
                context.Incidents.Add(Incident);
                context.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateIncident/{Id}")]
        public void Update([FromBody] Incident Incident, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Incidents.Where(clie => clie.IncidentId == Id).ToList().FirstOrDefault();
                //emp.
                context.SaveChanges();
            }
        }
        [HttpDelete("DeleteIncident/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Incidents.Where(clie => clie.IncidentId == id).ToList().FirstOrDefault(); ;
                context.Incidents.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}