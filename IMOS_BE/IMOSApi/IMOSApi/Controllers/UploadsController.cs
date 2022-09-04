using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using IMOSApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly IMOSContext _context;
        public UploadsController(IMOSContext context)
        {
            _context = context;
        }

        [HttpPost("Vehicles/Upload"), DisableRequestSizeLimit]

        public IActionResult UploadVehiclePhoto()
        {
            try
            {


                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Uploads", "Vehicles");
                var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadsFolderPath, fileName);

                if (file.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { filePath });
                }
                else
                {
                    return BadRequest();
                }


            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        [HttpGet("Vehicles/Photos/Download/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DownloadVehiclePhoto(int id)
        {
            var isPhotoInDb = _context.Vehicles
                .FirstOrDefault(item => item.VehicleId == id);

            if (isPhotoInDb == null)
            {
                var message = "Error: Vehicle photo not found.";
                return BadRequest(new { message });
            }

            var fileToDownload = isPhotoInDb.ImageUrl;
            var memory = new MemoryStream();
            await using (var stream = new FileStream(fileToDownload, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            var ext = Path.GetExtension(fileToDownload)?.ToLowerInvariant();
            return File(memory, GetMimeTypes()[ext], Path.GetFileName(fileToDownload));

        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                
            };
        }





        [HttpPost("EmployeeDocuments/Upload"), DisableRequestSizeLimit] //Done
        public IActionResult PastPaperUploadPublished()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Uploads", "Documents");
                var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), folderName);


                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadsFolderPath, fileName);


                if (file.Length > 0)
                {

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { filePath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
