using IMOSApi.Dtos.Vehicle;
using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers.VehicleManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IMOSContext _context;
        public VehicleController(IMOSContext context)
        {
            _context = context;
        }

        [HttpGet("GetVehicleById/{id}")]
        public ActionResult<GetVehicleDto> GetRecord(int id)
        {
            var recordInDb = _context.Vehicles
                .Where(item => item.VehicleId == id)
                .Include(item => item.Vehicletype)
                .Select(item => new GetVehicleDto()
                {
                    Make = item.Make,
                    Model = item.Model,
                    Year = item.Year,
                    Color = item.Color,
                    VehicleStatus=item.VehicleStatus ? "Assigned" : "Not Assigned",
                    DatePurchased = item.DatePurchased,
                    LastServiced = item.LastServiced,
                    Vehicletype = item.Vehicletype.Description,
                    VehicletypeId = item.VehicletypeId
                }).First();
            if (recordInDb == null)
            {
                return NotFound();
            }
            return recordInDb;
        }

        /*[HttpGet("GetAllVehicles")]
        public ActionResult<IEnumerable<GetVehicleDto>> GetAll()
        {
            var recordsInDb = _context.Vehicles
                .Include(item => item.Vehicletype)
                .Select(item => new GetVehicleDto()
                {
                    Id = item.VehicleId,
                    Make = item.Make,
                    Model = item.Model,
                    Year = item.Year,
                    Color = item.Color,
                    VehicleStatus=item.VehicleStatus ? "Assigned" : "Not Assigned",
                    DatePurchased = item.DatePurchased,
                    LastServiced = item.LastServiced,

                    Vehicletype = item.Vehicletype.Description,
                    VehicletypeId = item.VehicletypeId

                }).OrderBy(item => item.Model).ToList();
            return recordsInDb;
        }*/
        [HttpGet("GetAllVehicles")]
        public IEnumerable<Vehicle> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return _context.Vehicles.ToList();
            }
        }

        [HttpPost("AddVehicle")]
        public IActionResult Add(AddOrUpdateVehicleDto model)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Vehicles.FirstOrDefault(item => item.Model.ToLower() == model.Model.ToLower());

                if (recordInDb != null)
                {
                    message = "Record already exist";
                    return BadRequest(new { message });
                }

                var newRecord = new Vehicle
                {
                    Make = model.Make,
                    Model=model.Model,
                    Year=model.Year,
                    Color=model.Color,
                    VehicleStatus=false,// ? "Assigned" : "Not Assigned",
                    DatePurchased =model.DatePurchased,
                    LastServiced=model.LastServiced,
                    VehicletypeId=model.VehicletypeId
                };
                _context.Vehicles.Add(newRecord);
                _context.SaveChanges();
                return Ok();
            }
            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpPut("updateVehicle/{id}")]
        public IActionResult Update(AddOrUpdateVehicleDto model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Vehicles.FirstOrDefault(item => item.VehicleId == id);

                if (recordInDb == null)
                {
                    return NotFound();
                }

                recordInDb.Model = model.Model;
                recordInDb.Make = model.Make;
                recordInDb.Year = model.Year;
                recordInDb.VehicleStatus = false;
                recordInDb.DatePurchased = model.DatePurchased;
                recordInDb.LastServiced = model.LastServiced;
                recordInDb.VehicletypeId = model.VehicletypeId;
                _context.SaveChanges();
                return Ok();
            }

            var message = "Something went wrong on your side.";
            return BadRequest(new { message });

        }

        [HttpPost("AssignForemanToVehicle")]
        public IActionResult AssignForemantoVehicle(AssignForemanToVehicle model )//pass parameter User of type Userrole  Foreman //only Foreman allowed Vehicle access
        {
            var message = "";
            if (ModelState.IsValid)
            {
                //
                var vehicleInDb = _context.Vehicles.FirstOrDefault(item => item.UserId == model.UserId);
                if (vehicleInDb == null)
                {
                    message = "Vehicle not found";
                    return BadRequest(new { message });
                }
                var newRcord = new Vehicle()
                {
                    UserId = vehicleInDb.UserId
                };
                // Add Code to select Foreman 

                _context.Vehicles.Add(newRcord);
                _context.SaveChanges();
                vehicleInDb.VehicleStatus = true;
                _context.SaveChanges();
            }
            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Vehicle>> Delete(int id)
        {
            var recordInDb = await _context.Vehicles.FindAsync(id);
            if (recordInDb == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(recordInDb);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
