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

        [HttpGet("GetAll/{id}")]
        public ActionResult<GetMaterialDto> GetRecord(int id)
        {
            var recordInDb = _context.Materials
                .Include(item => item.Materialtype)
                .Include(item=>item.Warehouse)
                .Select(item => new GetMaterialDto()
                {
                    Id = item.MaterialId,
                    Name = item.Name,
                    Description = item.Description,
                    Supplier = item.Name,
                    Materialtype = item.Materialtype.Name,
                    MaterialtypeId = item.MaterialtypeId,
                    Warehouse = item.Warehouse.Name,
                   // WarehouseId = item.WarehouseId
                }).First();
            if (recordInDb == null)
            {
                return NotFound();
            }
            return recordInDb;
        }

       /* [HttpGet("GetMaterials")]//gets materials with supplier name ,material type name.
        public ActionResult<IEnumerable<GetMaterialDto>> GetAll()
        {
            var recordsInDb = _context.Materials
                .Include(item => item.Materialtype)
                .Include(item=>item.Warehouse)
                .Include(item=>item.Suppliermaterials)
                .Select(item => new GetMaterialDto()
                {
                    Id = item.MaterialId,
                    Name = item.Name,
                    Description = item.Description,
                    Materialtype = item.Materialtype.Name,
                    MaterialtypeId = item.MaterialtypeId,
                    Warehouse = item.Warehouse.Name,
                  //  WarehouseId = item.WarehouseId,
          
                }).OrderBy(item => item.Name).ToList();
            return recordsInDb;

        }*/

        [HttpGet("GetMaterials")]
        public IEnumerable<Material> Retrieve()
        {
            using (var context = new IMOSContext())
            {
                return _context.Materials.ToList();
            }
        }

        // add materials by Supplier Id
        //will create/add   in material Table &&  materials  with selected supplier Id in table (SupplierMaterial) with material typeFK & warehouse FK
        [HttpPost("AddMaterial")]
        public IActionResult AddSupplierMaterial(AddOrUpdateSupplierMaterialDto model)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var recordInDb = _context.Materials.FirstOrDefault(item => item.Name.ToLower() == model.Name.ToLower());
                if (recordInDb != null)
                {
                    message = "Record already exist";
                    return BadRequest(new { message });
                }
                var newMaterial = new Material()
                {
                    Name = model.Name,
                    Description = model.Description,
                    MaterialtypeId = model.MaterialtypeId,
                    WarehouseId=model.WarehouseId 
                };
                _context.Materials.Add(newMaterial);
                _context.SaveChanges();
                List<Supplier> supplierList = _context.Suppliers.ToList();
                foreach (var item in supplierList)
                {
                    Suppliermaterial suppliermaterial = new Suppliermaterial()
                    {
                        SupplierId=item.SupplierId,
                       MaterialId=newMaterial.MaterialId,
                        Quantity = model.Quantity,
                        Supplier = _context.Suppliers.Where(x => x.SupplierId == item.SupplierId).FirstOrDefault(),  
                    };
                    _context.Suppliermaterials.Add(suppliermaterial);
                }
                _context.SaveChanges();
                return Ok();
            }
            message = "Something went wrong on your side.";
            return BadRequest(new { message }); 
        }

        [HttpPut("UpdateMaterialSupplier/{id}")] //parameter routing 
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
        [HttpDelete("DeleteMaterialSupplier/{id}")]
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


    
