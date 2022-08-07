using IMOSApi.Dtos.Generic;
using IMOSApi.Dtos.SafetyChecklist;
using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers.SafetyChecklistManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class SafetyItemController : ControllerBase
    {
        private readonly IMOSContext _context;
        public SafetyItemController(IMOSContext context)
        {
            _context = context;
        }

        [HttpGet("GetSafetyItemById/{id}")]
        public ActionResult<GetSafetyItemDto> GetRecord(int id)
        {
            var recordInDb = _context.Safetyfileitems
                .Where(item => item.SafetyfileitemId == id)
                .Include(item => item.Safetyitemcategory)
                .Select(item => new GetSafetyItemDto()
                {
                    Id = item.SafetyfileitemId,
                    Name = item.Name,
                    Safetyitemcategory = item.Safetyitemcategory.CategoryName,
                    SafetyitemcategoryId = item.SafetyitemcategoryId //navigation to category
                }).First();
            if (recordInDb == null)
            {
                return NotFound();
            }
            return recordInDb;
        }

        [HttpGet("GetAllSafetyItems")]
        public ActionResult<IEnumerable<GetSafetyItemDto>> GetAll()
        {
            var recordsInDb = _context.Safetyfileitems
                .Include(item => item.Safetyitemcategory)
                 .Include(item => item.Safetyfilechecklists)
                .Select(item => new GetSafetyItemDto()
                {
                    
                    Id = item.SafetyfileitemId,
                    Name = item.Name,
                    Safetyitemcategory = item.Safetyitemcategory.CategoryName,
                    SafetyitemcategoryId = item.SafetyitemcategoryId,

                }).OrderBy(item => item.Name).ToList();
            return recordsInDb;
        }

        [HttpPost("AddSafetyItem")]
        public IActionResult Add(AddOrUpdateSafetyItemDto model)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Safetyfileitems.FirstOrDefault(item => item.Name.ToLower() == model.Name.ToLower());

                if (recordInDb != null)
                {
                    message = "Record already exist";
                    return BadRequest(new { message });
                }

                var newRecord = new Safetyfileitem
                {
                    Name = model.Name,
                    SafetyitemcategoryId = model.SafetyitemcategoryId
                };
                _context.Safetyfileitems.Add(newRecord);
                _context.SaveChanges();
                return Ok();
            }
            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("updateSafetyItem/{id}")]
        public IActionResult Update(AddOrUpdateSafetyItemDto model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Safetyfileitems.FirstOrDefault(item => item.SafetyfileitemId == id);

                if (recordInDb == null)
                {
                    return NotFound();
                }
                recordInDb.Name = model.Name;
                recordInDb.SafetyitemcategoryId = model.SafetyitemcategoryId;
                _context.SaveChanges();
                return Ok();
            }
            var message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Safetyfileitem>> Delete(int id)
        {
            var recordInDb = await _context.Safetyfileitems.FindAsync(id);
            if (recordInDb == null)
            {
                return NotFound();
            }
            _context.Safetyfileitems.Remove(recordInDb);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
