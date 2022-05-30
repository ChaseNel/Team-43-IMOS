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
    public class MaterialController : ControllerBase
    {
        private readonly IMOSContext _context;

        public MaterialController(IMOSContext context)
        {
            _context = context;
        }
        [HttpGet("{id}")]
        public ActionResult<GetMaterialDto> GetRecord(int id)
        {
            var recordInDb = _context.Materials
                .Include(item => item.Materialtype)
                .Include(item=>item.Supplier)
                .Select(item => new GetMaterialDto()
                {
                    Id = item.MaterialId,
                    Name = item.Name,
                    Description = item.Description,
                    Supplier = item.Supplier.Name,
                    SupplierId = item.SupplierId,
                    Materialtype = item.Materialtype.Name,
                    MaterialtypeId = item.MaterialtypeId


                    //navigation to suppliertype
                }).First();
            if (recordInDb == null)
            {
                return NotFound();
            }
            return recordInDb;
        }

        [HttpGet("GetMaterials")]//gets materials with supplier name ,material type name.
        public ActionResult<IEnumerable<GetMaterialDto>> GetAll()
        {
            var recordsInDb = _context.Materials
                .Include(item => item.Supplier)
                .Include(item => item.Materialtype)
                .Select(item => new GetMaterialDto()
                {
                    Id = item.MaterialId,
                    Name = item.Name,
                    Description = item.Description,

                    Supplier = item.Supplier.Name,
                    SupplierId = item.SupplierId,

                    Materialtype = item.Materialtype.Name,
                    MaterialtypeId = item.MaterialtypeId,

                }).OrderBy(item => item.Name).ToList();
            return recordsInDb;
        }

        [HttpPost("AddMaterial")]
        public IActionResult AddSupplierMaterial(AddOrUpdateSupplierMaterialDto model,int SupplierId)//will create/add  material  specific to supplier Id in table
        {
            var message = "";
            if (ModelState.IsValid)//checks if model is valid then  creates new MaterialType 
            {
                var newMaterial = new Material
                {   SupplierId=SupplierId,
                    Name = model.Name,
                    Description = model.Description,
                    MaterialtypeId = model.MaterialtypeId

                };
                _context.Materials.Add(newMaterial);
                _context.SaveChanges();
                return Ok();
            }
            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }
        [HttpPut("{id}")]
        public IActionResult Update(AddOrUpdateSupplierMaterialDto model, int id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Materials.FirstOrDefault(item => item.MaterialId == id);

                if (recordInDb == null)
                {
                    return NotFound();
                }
                recordInDb.Name = model.Name;
                recordInDb.Description = model.Description;
                recordInDb.MaterialtypeId = model.MaterialtypeId;
                _context.SaveChanges();
                return Ok();
            }

            var message = "Something went wrong on your side.";
            return BadRequest(new { message });

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Material>> Delete(int id)
        {
            var recordInDb = await _context.Materials.FindAsync(id);
            if (recordInDb == null)
            {
                return NotFound();
            }

            _context.Materials.Remove(recordInDb);
            await _context.SaveChangesAsync();
            return Ok();
        }


    }
}
