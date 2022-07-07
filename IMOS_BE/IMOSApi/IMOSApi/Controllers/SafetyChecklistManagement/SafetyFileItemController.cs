using IMOSApi.Dtos.Generic;
using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers.ProjectManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class SafetyFileItemController : ControllerBase
    {
        private readonly IMOSContext _context;
        public SafetyFileItemController(IMOSContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult<GetGenericIdAndNameDto> GetRecord(int id)//method to get  SafetFileItem  by Id 
        {
            var recordInDb = _context.Safetyfileitems.Where(item => item.SafetyfileitemId == id).Select(item => new GetGenericIdAndNameDto()
            {
                Name = item.Name,
                Id = item.SafetyfileitemId
            }).First();

            if (recordInDb == null)
            {
                return NotFound();
            }
            return recordInDb;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetGenericIdAndNameDto>> GetAll()
        {
            var recordsInDb = _context.Safetyfileitems.Select(item => new GetGenericIdAndNameDto
            {
                Name = item.Name,
                Id = item.SafetyfileitemId
            }).OrderBy(item => item.Name).ToList();

            return recordsInDb;
        }
        [HttpPut("{id}")]
        public IActionResult Update(AddOrUpdateGenericNameOnlyDto model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Safetyfileitems.FirstOrDefault(item => item.SafetyfileitemId == id);

                if (recordInDb == null)
                {
                    return NotFound();
                }
                recordInDb.Name = model.Name;
                _context.SaveChanges();
                return Ok();
            }
            var message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPost("Add")]
        public IActionResult AddSupplierType(AddOrUpdateGenericNameOnlyDto model)
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

                var newRecord = new Safetyfileitem()
                {
                    Name = model.Name
                };
                _context.Safetyfileitems.Add(newRecord);
                _context.SaveChanges();
                return Ok();
            }

            message = "Something went wrong on your side.";
            return BadRequest(new { message });

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Safetyfileitem>> DeleteRecord(int id)
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
