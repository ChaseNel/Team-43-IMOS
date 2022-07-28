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


        [HttpGet]
        [Route("getMaterialRequest")]
        public object getMaterialRequest(int id)
        {
            var MaterialRequestList = db.Projectmaterialrequests.ToList();

            return MaterialRequestList;
        }

        [HttpPost]
        [Route("CreateMaterialRequest")]
        public object CreateMaterialRequest(MaterialRequestDto materialRequestDto)
        {

            var project = _context.Projects
                .FirstOrDefault();

            var urgency = _context.Urgencylevels
                .FirstOrDefault();

            Projectmaterialrequest reqeustCreate = new Projectmaterialrequest()
            {
                RequestDate = DateTime.Now,
                ProjectId = project.ProjectId,
                UrgencylevelId= urgency.UrgencylevelId,
                

            };

            try
            {
                foreach (var item in materialRequestDto.BasketMaterials)
                {
                    Projectmaterialrequestlist projectmaterialrequestlist = new Projectmaterialrequestlist
                    {
                        Projectmaterialrequest = reqeustCreate,
                        MaterialId = item.MaterialId,
                        Material = db.Materials.Find(item.MaterialId),
                        Quantity = item.Quantity,
                        
                        

                    };

                    db.Projectmaterialrequestlists.Add(projectmaterialrequestlist);
                }
                db.Projectmaterialrequests.Add(reqeustCreate);
                db.SaveChanges();

                return Ok();

            }

            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }
    }
}
