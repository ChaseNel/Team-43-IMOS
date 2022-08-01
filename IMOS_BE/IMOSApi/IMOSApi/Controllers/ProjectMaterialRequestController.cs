using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMOSApi.Dtos.MaterialRequest;
using IMOSApi.Models;
using Microsoft.EntityFrameworkCore;

namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectMaterialRequestController : ControllerBase
    {
        private readonly IMOSContext db = new IMOSContext();

        private readonly IMOSContext _context;

        public ProjectMaterialRequestController(IMOSContext context)
        {
            _context = context;
        }

     
        [HttpGet("GetAllMaterialRequests")]
        public ActionResult<IEnumerable<GetMaterialRequestDto>> GetAllMaterialRequests()
        {
            var recordInDb = _context.Projectmaterialrequest
                .Select(item => new GetMaterialRequestDto()
                {
                    MaterialRequestId = item.ProjectmaterialrequestId,
                   UrgencyLevelName =item.Urgencylevel.Level,
                    ProjectId = item.ProjectId,
                    RequestDate = item.RequestDate,
                    FulfillmentType = item.Fulfillmenttype

                }).OrderBy(item => item.RequestDate).ToList();
            return recordInDb;
        }


        [HttpGet("GetRequestBYProject/{Id}")]
        public ActionResult<IEnumerable<GetMaterialRequestDto>> GetMaterialRequestBYProject(int Id)
        {
            var recordInDb =_context.Projectmaterialrequest
                .Where(item => item.ProjectId==Id)
                .Select(item => new GetMaterialRequestDto() 
                {
                    MaterialRequestId=item.ProjectmaterialrequestId,
                    ProjectId = item.ProjectId,
                    FulfillmentType = item.Fulfillmenttype,
                    RequestDate = item.RequestDate,
                    UrgencyLevelName = item.Urgencylevel.Level,

                }).OrderBy(item => item.RequestDate).ToList();

            return recordInDb;
        }

        [HttpGet("ViewRequestDetails/{Id}")]
        public ActionResult<IEnumerable<MaterialRequestDetailsDTo>> ViewRequestDetails(int Id)
        {
            var recordInDb = _context.Projectmaterialrequestlist
                .Where(item => item.ProjectmaterialrequestId == Id)
                .OrderBy(item => item.Material.Name)
                .Select(line => new MaterialRequestDetailsDTo()
                {
                    MaterialName = line.Material.Name,
                    Description = line.Material.Description,
                    MaterialTypeName = line.Material.Materialtype.Name,
                    Quantity = line.Quantity,
                }
                ).ToList();

            return recordInDb;
        }




        [HttpGet("GetRequestBYProjectWithDetails/{Id}")]
        public ActionResult<ICollection<GetMaterialRequestByProjectDTO>> GetRequestBYProject(int Id)
        {
            var ProjectMaterialReq = _context.Projectmaterialrequest
                .Include(item => item.Projectmaterialrequestlist)
                .Where(item => item.Project.ProjectId == Id)
                .OrderBy(item => item.RequestDate)
                .Select(item => new GetMaterialRequestByProjectDTO()
                {
                    FulfillmentType = item.Fulfillmenttype,
                    RequestDate = item.RequestDate.ToString("f"),
                    UrgencyLevelName = item.Urgencylevel.Level,
                    Materials = (ICollection<MaterialRequestDetailsDTo>)item.Projectmaterialrequestlist

                    .Select(line => new MaterialRequestDetailsDTo
                    {


                        MaterialName =line.Material.Name,
                        Description=line.Material.Description,
                        MaterialTypeName=line.Material.Materialtype.Name,
                        Quantity=line.Quantity,

                    }).ToList()
                    

                    

                }).ToList();

            return ProjectMaterialReq;
        }


        [HttpGet]
        [Route("getMaterialRequest")]
        public object getMaterialRequest(int id)
        {
            var MaterialRequestList = db.Projectmaterialrequest.ToList();

            return MaterialRequestList;
        }


        [HttpPost]
        [Route("CreateMaterialRequest/{projectid}/{urgencyLevelId}/{fulfillment}")]
        public object CreateMaterialRequest(MaterialRequestDto materialRequestDto, int projectid, int urgencyLevelId, int fulfillment)
        {

            
         

            Projectmaterialrequest requestCreate = new Projectmaterialrequest()
            {
                RequestDate = DateTime.Now,
                ProjectId = projectid,
                UrgencylevelId= urgencyLevelId,
                Fulfillmenttype = fulfillment,


            };

            try
            {
                foreach (var item in materialRequestDto.BasketMaterials)
                {
                    Projectmaterialrequestlist projectmaterialrequestlist = new Projectmaterialrequestlist
                    {
                        Projectmaterialrequest = requestCreate,
                        ProjectmaterialrequestId = requestCreate.ProjectmaterialrequestId,
                        MaterialId = item.id,
                        Material = db.Materials.Find(item.id),
                        Quantity = item.quantity,
         
                    };

                    db.Projectmaterialrequestlist.Add(projectmaterialrequestlist);

                }
                db.Projectmaterialrequest.Add(requestCreate);
                db.SaveChanges();

                return Ok();

            }

            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);
                return BadRequest(e.Message);


            }


        }


        [HttpDelete("DeleteMaterialRequest/{Id}")]
        public async Task<ActionResult<Projectmaterialrequest>> DeleteMaterialRequest(int Id)
        {
            var recordInd = await _context.Projectmaterialrequest.FindAsync(Id);

            if (recordInd == null)
            {
                return NotFound();
            }

            var ProjectMaterialRequest = _context.Projectmaterialrequestlist
                    .Where(item => item.ProjectmaterialrequestId == Id);
            _context.Projectmaterialrequestlist.RemoveRange(ProjectMaterialRequest);
            _context.Projectmaterialrequest.Remove(recordInd);
            await _context.SaveChangesAsync();

            return Ok();


        }

    }
}
