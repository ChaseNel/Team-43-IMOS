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

        [HttpGet("GetEquipmentById/{id}")]
        public ActionResult<GetGenericDto> GetRecord(int id)
        {
            var recordInDb = _context.Equipment
                .Where(item => item.EquipmentId == id)
                 .Select(item => new GetGenericDto() 
                 {
                     Id = item.EquipmentId,
                     Name = item.Name,
                     Description = item.Description,

                 }).First();

            if (recordInDb == null)
            {
                return NotFound();
            }
            return recordInDb;
        }

        [HttpGet("GetEquipments")]
        public ActionResult<IEnumerable<GetGenericDto>> GetAll()
        {
            var recordsInDb = _context.Equipment
                .Select(item => new GetGenericDto() 
                {
                    Id = item.EquipmentId,
                    Name = item.Name,
                    Description = item.Description
                }).OrderBy(item => item.Name).ToList();
            return recordsInDb;

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

        [HttpPut("UpdateEquipment/{id}")]
        public IActionResult Update(GetGenericDto model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Equipment.FirstOrDefault(item => item.EquipmentId == id);

                if (recordInDb == null)
                {
                    return NotFound();
                }
                recordInDb.Name = model.Name;
                recordInDb.Description = model.Description;

                _context.SaveChanges();
                return Ok();
            }

            var message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpDelete("DeleteEquipment/{id}")]
        public async Task<ActionResult<Equipment>> Delete(int id)
        {
            var recordInDb = await _context.Equipment.FindAsync(id);
            if (recordInDb == null)
            {
                return NotFound();
            }

            _context.Equipment.Remove(recordInDb);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
