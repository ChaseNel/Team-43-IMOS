using IMOSApi.Dtos.Vehicle;
using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers.VehicleManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleTypeController : ControllerBase
    {
        private readonly IMOSContext _context;
        public VehicleTypeController(IMOSContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult<GetGenericIdAndDescription> GetRecord(int id)//method to get  Vehicle Type by Id 
        {
            var recordInDb = _context.Vehicletypes.Where(item => item.VehicletypeId == id).Select(item => new GetGenericIdAndDescription()
            {
                Description = item.Description,
                Id = item.VehicletypeId
            }).First();

            if (recordInDb == null)
            {
                return NotFound();
            }

            return recordInDb;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetGenericIdAndDescription>> GetAll()
        {
            var recordsInDb = _context.Vehicletypes.Select(item => new GetGenericIdAndDescription
            {
                Description = item.Description,
                Id = item.VehicletypeId
            }).OrderBy(item => item.Description).ToList();

            return recordsInDb;
        }

        [HttpPut("{id}")]
        public IActionResult Update(AddOrUpdateGenericDescriptionOnlyDto model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Vehicletypes.FirstOrDefault(item => item.VehicletypeId == id);

                if (recordInDb == null)
                {
                    return NotFound();
                }

                recordInDb.Description = model.Description;
                _context.SaveChanges();

                return Ok();
            }

            var message = "Something went wrong on your side.";
            return BadRequest(new { message });

        }

        [HttpPost]
        public IActionResult AddVehicleType(AddOrUpdateGenericDescriptionOnlyDto model)
        {

            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Vehicletypes.FirstOrDefault(item => item.Description.ToLower() == model.Description.ToLower());

                if (recordInDb != null)
                {
                    message = "Record already exist";
                    return BadRequest(new { message });
                }

                var newRecord = new Vehicletype()
                {
                    Description = model.Description
                };
                _context.Vehicletypes.Add(newRecord);
                _context.SaveChanges();
                return Ok();
            }

            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Vehicletype>> DeleteRecord(int id)
        {
            var recordInDb = await _context.Vehicletypes.FindAsync(id);
            if (recordInDb == null)
            {
                return NotFound();
            }

            _context.Vehicletypes.Remove(recordInDb);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
