using IMOSApi.Dtos.Generic;
using IMOSApi.Dtos.Material;
using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers.MaterialManagent
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialTypeController : ControllerBase
    {
        private readonly IMOSContext _context;

        public MaterialTypeController(IMOSContext context)
        {
            _context = context;
        }

        [HttpPost("{SupplierId}")]
        public IActionResult AddSupplierMaterialType(AddOrUpdateGenericDto model ,int SupplierId)//will create/add  material type specific to supplier Id in table
        {
            var message = "";
            if (ModelState.IsValid)//checks if model is valid then  creates new MaterialType 
            {
                var newMaterialType = new Materialtype
                {
                    Name=model.Name,
                    Description= model.Description,
                   // SupplierId=SupplierId
                };
                _context.Materialtypes.Add(newMaterialType);
                _context.SaveChanges();
                return Ok();
            }
            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }

        [HttpGet("{id}")]//gets specific material type Id from Supplier; to display supplier Name and associated material type
        public ActionResult<GetMaterialTypeDto> GetMaterialType(int id)
        {
            var recordIndb = _context.Materialtypes
                .Where(item => item.MaterialtypeId == id)
               // .Include(item => item.Supplier)
                .Select(item => new GetMaterialTypeDto
                {
                    MaterialtypeId = item.MaterialtypeId,
                    Name = item.Name,
                    Description = item.Description,
                   // SupplierId = item.Supplier.SupplierId,
                   // SupplierName=item.Supplier.Name
                }).OrderBy(item => item.Name).First();

            if (recordIndb == null)
            {
                return NotFound();
            }
            return recordIndb;
        }


        [HttpGet("Supplier/GetAll/{supplierId}")]///
        public ActionResult<IEnumerable<GetMaterialTypeDto>> GetAllSupplierMaterialTypes(int supplierId)
        {
            var recordsInDb = _context.Materialtypes
                //.Where(item => item.SupplierId == supplierId)
               // .Include(item => item.Supplier)
                .Select(item => new GetMaterialTypeDto
                {
                    MaterialtypeId = item.MaterialtypeId,
                    Name = item.Name,
                    Description=item.Description,
                    //SupplierId = item.Supplier.SupplierId,
                   // SupplierName = item.Supplier.Name
                }).OrderBy(item => item.Name).ToList();

            return recordsInDb;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetMaterialTypeDto>> GetAllMaterialTypes()
        {
            var recordsInDb = _context.Materialtypes
                //.Include(item => item.Supplier)
                .Select(item => new GetMaterialTypeDto
                {
                    MaterialtypeId = item.MaterialtypeId,
                    Name = item.Name,
                    Description = item.Description,
                 //   SupplierId = item.Supplier.SupplierId,
                 //   SupplierName = item.Supplier.Name
                }).OrderBy(item => item.Name).ToList();

            return recordsInDb;
        }

        [HttpPut("{id}")]
        public IActionResult Update(AddOrUpdateGenericDto model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Materialtypes.FirstOrDefault(item => item.MaterialtypeId == id);

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

        [HttpDelete("{id}")]
        public async Task<ActionResult<Supplier>> Delete(int id)
        {
            var recordInDb = await _context.Materialtypes.FindAsync(id);
            if (recordInDb == null)
            {
                return NotFound();
            }
            var materials = _context.Materials.Where(item => item.MaterialtypeId == recordInDb.MaterialtypeId).ToList();

            _context.Materials.RemoveRange(materials);
            await _context.SaveChangesAsync();

            _context.Materialtypes.Remove(recordInDb);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
