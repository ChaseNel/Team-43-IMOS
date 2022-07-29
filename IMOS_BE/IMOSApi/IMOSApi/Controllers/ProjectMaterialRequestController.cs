using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMOSApi.Dtos.MaterialRequest;
using IMOSApi.Models;

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
        public ActionResult<IEnumerable<GetMaterialRequestDto> > GetAllMaterialRequests()
        {
            var recordInDb = _context.Projectmaterialrequest
                .Select(item => new GetMaterialRequestDto()
                {
                    MaterialRequestId = item.ProjectmaterialrequestId,
                    UrgencyLevelId = item.UrgencylevelId
                })
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
                        MaterialId = item.MaterialId,
                        Material = db.Materials.Find(item.MaterialId),
                        Quantity = item.Quantity,
         
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
    }
}
