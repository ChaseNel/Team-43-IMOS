using IMOSApi.Dtos.Generic;
using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers.EquipmentManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private readonly IMOSContext _context;
        public EquipmentController(IMOSContext context)
        {
            _context = context;
        }

        [HttpPost("AddEquipment")]
        public IActionResult Add(AddOrUpdateGenericDto model)
        {
            var message = "";
            if(ModelState.IsValid)
            {
                var recordInDb = _context.Equipment.FirstOrDefault(item => item.Name.ToLower() == model.Name.ToLower());
                if (recordInDb != null)
                {
                    message = "Record already exist";
                    return BadRequest(new { message });
                }
                var newRecord = new Equipment
                {
                    Name=model.Name,
                    Description=model.Description
                };
                _context.Equipment.Add(newRecord);
                _context.SaveChanges();
                return Ok();
            }
            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }
    }
}
