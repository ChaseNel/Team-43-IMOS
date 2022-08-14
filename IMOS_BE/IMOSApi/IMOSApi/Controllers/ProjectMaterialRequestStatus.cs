

using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMOSApi.Dtos.ProjectMaterials;
using Microsoft.EntityFrameworkCore;
using IMOSApi.Dtos.MaterialRequest;

namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectMaterialRequestStatus : ControllerBase
    {
        private readonly IMOSContext db = new IMOSContext();

        private readonly IMOSContext _context;

        public ProjectMaterialRequestStatus(IMOSContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllRequestsStatus")]
        public ActionResult<IEnumerable<GetRequestStatus>> GetAllMaterialRequests()
        {
            var recordInDb = _context.Projectmaterialrequeststatus
                .Select(item => new GetRequestStatus()
                {
                    Id = item.ProjectmaterialrequeststatusId,
                    Name = item.Name,
                }).ToList();

            return recordInDb;
        }

    }
}
