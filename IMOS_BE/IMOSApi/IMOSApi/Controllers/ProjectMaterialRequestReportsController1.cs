using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using IMOSApi.Models;
using System.Dynamic;
using IMOSApi.Dtos.ProjectMaterialRequestReport;
using System.Text;

using System.Security.Cryptography;


namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectMaterialRequestReportsController1 : ControllerBase
    {

        private readonly IMOSContext db = new IMOSContext();

        private readonly IMOSContext _context;

        public ProjectMaterialRequestReportsController1(IMOSContext context)
        {
            _context = context;
        }

        [HttpGet("GetMaterialRequesytByStatus/{StatusId}")]

        public ActionResult<ICollection<materialrequestReportDto>> GetRequestBYProject(int StatusId)
        {

            var recordInDb = _context.Projectmaterialrequest
                .Where(item => item.ProjectmaterialrequeststatusId == StatusId)
                .Include(item => item.Project.Initialrequest.Client)
                .Include(item => item.Projectmaterialrequestlist)
                .Select(item => new materialrequestReportDto()
                {
                    ClientName = item.Project.Initialrequest.Client.Clientname,
                    StatusName = item.Projectmaterialrequeststatus.Name,
                    RequestDate = item.RequestDate,
                    UrgencyLevelName = item.Urgencylevel.Level,
                    materialCount = item.Projectmaterialrequestlist.Count()

                });

            return recordInDb.ToList();

        }



        [HttpGet]
        [Route("GetProjectMaterialRequestCount")]

        public dynamic ProjectRequestDTOcs()
        {
            var recordInDb = _context.Projectmaterialrequest
                .Include(item => item.Project)
                .Include(item => item.Project.Initialrequest.Client)
                .Select(item => new ProjectRequestDTOcs()
                {
                    Project = item.Project.ProjectId,
                    ProjectmaterialrequestId= item.ProjectmaterialrequestId,
                    ClientName=item.Project.Initialrequest.Client.Clientname,
                    
                }).OrderBy(x => x.ClientName).ToList();

            var results = recordInDb.GroupBy(x => x.ClientName)
                .Select(y => new
                {

                    ClientName = y.Key,
                    Count = y.Count()
                });

            return results;
        }


    }
}
