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
    public class ProjectmaterialController : ControllerBase

    {
        private readonly IMOSContext db = new IMOSContext();

        private readonly IMOSContext _context;

        public ProjectmaterialController(IMOSContext context)
        {
            _context = context;
        }


        [HttpGet("GetProjectMaterial/{Id}")]
        public ActionResult<IEnumerable<GetProjectMaterialDto>> GetProjectMaterial(int Id)
        {
            var recordInDb = _context.Projectmaterial
                .Include(item => item.Material)
                .Where(item => item.ProjectId == Id)
                .Select(item => new GetProjectMaterialDto()
                {
                    ProjectMaterialId = item.ProjectMateriadId,
                    ProjectId = item.ProjectId,
                    MaterialName = item.Material.Name,
                    MaterialId = item.MaterialId,
                    MaterialTypeName = item.Material.Materialtype.Name,
                    Quantity = item.Quantity
                }).OrderBy(item => item.MaterialName).ToList();

            return recordInDb;


        }



      [HttpPost]
        [Route("CreateProjectmaterial/{projectId}")]
        public object AddMaterialToProject( [FromBody] BasketMaterial[] basketMaterial, int projectId)
        {

            /*  var materialInDb = _context.Projectmaterial
                  .Where(item => item.MaterialId == basketMaterial.id)*/


            var message = "";
                
            try
            {

                foreach (var item in basketMaterial)
                {
                  var  recordInDb = db.Projectmaterial
                        .Where(xx => xx.MaterialId == item.id)

                        .FirstOrDefault();


                    var wareHouseMat = db.Warehousematerials
                        .Where(xx => xx.MaterialId == item.id)
                        .FirstOrDefault();


                    if (recordInDb == null)
                    {

                        Projectmaterial projectmaterial = new Projectmaterial
                        {
                            ProjectId = projectId,
                            MaterialId = item.id,
                            Quantity = item.quantity,
                            Material = db.Materials.Find(item.id),


                        };

                        db.Projectmaterial.Add(projectmaterial);
                    

                    }
                    else
                    {

                        if (item.id == recordInDb.MaterialId)
                        {
                            if (item.quantity > wareHouseMat.QuantityOnHand)
                            {
                                recordInDb.Quantity = recordInDb.Quantity + wareHouseMat.QuantityOnHand;
                                wareHouseMat.QuantityOnHand = 0;
                            }
                             else if (item.quantity <= wareHouseMat.QuantityOnHand)
                            {
                                recordInDb.Quantity = recordInDb.Quantity + item.quantity;
                                wareHouseMat.QuantityOnHand = wareHouseMat.QuantityOnHand - item.quantity;
                            }
                           

                        }
                        db.SaveChanges();

                    }


                   
                }

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

