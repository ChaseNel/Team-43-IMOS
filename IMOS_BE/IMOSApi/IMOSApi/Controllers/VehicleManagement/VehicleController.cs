using IMOSApi.Dtos.Vehicle;
using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Web;
using System.Net.Http;

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
                   // VehicleStatus=item.VehicleStatus ? "Assigned" : "Not Assigned",
                    DatePurchased = item.DatePurchased,
                  ///  LastServiced = item.//LastServiced,
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
                  //  VehicleStatus=item.VehicleStatus ? "Assigned" : "Not Assigned",
                    DatePurchased = item.DatePurchased,
                 //   LastServiced = item.LastServiced,

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
                    AssignedStatus = 1,
                    DatePurchased =model.DatePurchased,
                    
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
            //    recordInDb.VehicleStatus = false;
                recordInDb.DatePurchased = model.DatePurchased;
            //    recordInDb.LastServiced = model.LastServiced;
                recordInDb.VehicletypeId = model.VehicletypeId;
                _context.SaveChanges();
                return Ok();
            }

            var message = "Something went wrong on your side.";
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






        [HttpPost("AssignForemanToVehicle")]
        public IActionResult AssignForemantoVehicle(AssignForemanToVehicle model)
        {
            var message = "";

            var ForemanInDb = _context.Users
                 .Include(item => item.Userrole)
                 .FirstOrDefault(item => item.UserId == model.UserId);
            if (ForemanInDb.UserroleId != 1)
            {
                message = "Only foreman can be assigned a vehicle";
                return BadRequest(new { message });
            }
            else if (ForemanInDb == null)
            {
                message = "Foreman not found";
                return BadRequest(new { message });
            }

            var vehilceInDb = _context.Vehicles
                .FirstOrDefault(item => item.VehicleId == model.VehicleId);
            if (vehilceInDb == null)
            {
                message = "Vehicle not found";
                return BadRequest(new { message });
            }

            var newAssignment = new UserVehicle()
            {
                Vehicle_Id = vehilceInDb.VehicleId,
                User_Id = ForemanInDb.UserId,
            };

            _context.UserVehicle.Add(newAssignment);
            vehilceInDb.AssignedStatus = 2;

            _context.SaveChanges();


            return Ok();

        }

      

        [HttpPost]
        [Route("UploadVehiclePhoto/{VehicleId}")]

        public object UploadVehiclePhoto( [FromBody] UploadImageDto model, int VehicleId)
        {
            var vehicle = _context.Vehicles
                .Where(item => item.VehicleId == VehicleId)
                .FirstOrDefault();

            if (vehicle == null)
            {
                return NotFound();
            }

            vehicle.ImageUrl = model.imageUrl as string;

                _context.SaveChanges();

            return Ok();

        }


        [HttpGet("GetUnAssignedVehicles")]
        public ActionResult<IEnumerable<GetVehicleDto>> GetUnAssignedVehicles()
        {
            var message = "";

            var recordInDb = _context.Vehicles
                .Include(item => item.Vehicletype)
                .Where(item => item.AssignedStatus == 1)
                .Select(item => new GetVehicleDto()
                {
                    Id = item.VehicleId,
                    Make = item.Make,
                    Model = item.Model,
                    Year = item.Year,
                    Color = item.Color,
                    //  VehicleStatus=item.VehicleStatus ? "Assigned" : "Not Assigned",
                    DatePurchased = item.DatePurchased,
                    //   LastServiced = item.LastServiced,
                    AssignedStatus = item.AssignedStatus,
                    Vehicletype = item.Vehicletype.Description,
                    VehicletypeId = item.VehicletypeId
                }).OrderBy(item => item.DatePurchased).ToList();

            if(recordInDb == null)
            {
                message = "All Vehicles have been Assigned";
                return BadRequest(new { message });
            }




            return recordInDb;
        }






    }
}
