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
    public class TasktypeController : ControllerBase
    {
        [HttpGet("GetTasktypes")]
        public IEnumerable<Tasktype> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return context.Tasktypes.ToList();
            }
        }


    }
}
