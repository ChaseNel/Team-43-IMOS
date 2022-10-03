using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMOSApi.Dtos.ProjectMaterials;
using Microsoft.EntityFrameworkCore;

namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectmaterialController : ControllerBase
    {
       
        private readonly IMOSContext _context;

        public ProjectmaterialController(IMOSContext context)
        {
            _context = context;
        }




     /*   [HttpPost]
        [Route("CreateProjectmaterial/{projectId}")]
        public object AddMaterialToProject(BasketMaterial[] basketMaterial, int projectId)
        {
            try
            {



                foreach (var item in basketMaterial)
                {
                    Projectmaterial projectmaterial = new Projectmaterial
                    {
                        ProjectId = projectId,
                        MaterialId = item.id,
                        Quantity = item.quantity,

                    };

                    db.Projectmaterial.Add(projectmaterial);
                }



                return Ok();

            }

            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);

                return BadRequest(e.Message);

            }
        }*/

    }
}

