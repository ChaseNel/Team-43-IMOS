using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IMOSApi.Dtos.TaskMaterial;
using IMOSApi.Dtos.MaterialRequest;

namespace IMOSApi.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class TaskmaterialController : ControllerBase
    {

        private readonly IMOSContext db = new IMOSContext();

        private readonly IMOSContext _context;

        public TaskmaterialController(IMOSContext context)
        {
            _context = context;
        }

        [HttpGet("GetProjectTaskMaterial/{Id}")]
        public ActionResult<IEnumerable<GetTaskMaterialDto>> GetProjectTaskMaterial(int Id)
        {
            var recordInDb = _context.Taskmaterials
                .Include(item => item.Projectmaterial)
                .Include(item => item.Task)
                .Where(item => item.TaskId == Id)
                .Select(item => new GetTaskMaterialDto()
                {
                    TaskMaterialId = item.TaskMaterialId,
                    MaterialName = item.Projectmaterial.Material.Name,
                    MaterialTypeName = item.Projectmaterial.Material.Materialtype.Name,
                    Quantity = item.Quantity
                }).OrderBy(item => item.MaterialName).ToList();

            return recordInDb;

        }

        [HttpPost]
        [Route("CreateTaskmaterial/{projectmaterialId}/{taskId}")] 

        public object CreateTaskmaterial( [FromBody] BasketMaterial[] basketMaterial, int projectmaterialId, int taskId)
        {


            var message = "";

            try
            {

                foreach (var item in basketMaterial)
                {

                    var recordInDb = _context.Taskmaterials
                      .Where(xx => xx.MaterialId == item.id)
                      .FirstOrDefault();
                    var recordOutDb = _context.Projectmaterial.Where(xx => xx.MaterialId == item.id)
                        .FirstOrDefault();

                    

                    if (recordInDb != null)
                    {

                        if (item.quantity > recordOutDb.Quantity)
                        {
                            recordInDb.Quantity = recordInDb.Quantity + recordOutDb.Quantity;

                            recordOutDb.Quantity = 0;

                    }
                        else if (item.quantity <= recordOutDb.Quantity && item.id == recordInDb.MaterialId)
                        {
                            recordInDb.Quantity = recordInDb.Quantity + item.quantity;
                            recordOutDb.Quantity = recordOutDb.Quantity - item.quantity; 
                        }

                    }

                    
        
                    else
                    {
                        Taskmaterial taskmaterial = new Taskmaterial()
                        {
                            TaskId = taskId,
                            MaterialId = item.id,
                            ProjectMaterialId = projectmaterialId,
                            Quantity = item.quantity,
                        };

                        db.Taskmaterials.Add(taskmaterial);

                        recordOutDb.Quantity = recordOutDb.Quantity - item.quantity;
                    }

                  
                    
                       
                        _context.SaveChanges();
                    

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



            [HttpDelete("DeleteEmployee/{Id}")]
        public void Delete(int id)
        {
            using (var context = new IMOSContext())
            {
                var clie = context.Taskmaterials.Where(clie => clie.TaskId == id).ToList().FirstOrDefault();
                context.Taskmaterials.Remove(clie);
                context.SaveChanges();
            }
        }
    }
}
