using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMOSApi.Dtos.MaterialRequest;
using IMOSApi.Models;
using Microsoft.EntityFrameworkCore;

using IMOSApi.Dtos.WarehouseMaterials;

namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseMaterialController : ControllerBase
    {
        private readonly IMOSContext db = new IMOSContext();

        [HttpGet("GetWareHouseMaterial/{id}")]
        public ActionResult<IEnumerable<GetWarehouseMat>> GetWareHouseMaterial(int id)
        {

            var recordInDb = db.Warehousematerials
               .Include(item => item.Warehouse)
               .Include(item => item.Material)
               .Include(item => item.Material.Materialtype)
               .Where(item => item.WarehouseId == id)
               .Select(item => new GetWarehouseMat()
               {
                   WareHouseId = item.WarehouseId,
                   WareHouseName = item.Warehouse.Name,
                   MaterialName = item.Material.Name,
                   MaterialType = item.Material.Materialtype.Name,
                   QuantityONHand = item.QuantityOnHand

               }).OrderBy(item => item.WareHouseName).ToList();

            return recordInDb;

        }

        [HttpGet("GetWareHouse/{id}")]
        public ActionResult<IEnumerable<GetWareHouse>> GetWareHouse(int id)
        {
            var recordInDb = db.Warehouses
                .Select(item => new GetWareHouse()
                {
                    Id = item.WarehouseId,
                    Name = item.Name,
                    Location = item.Location,
                }).OrderBy(item => item.Name).ToList();

            return recordInDb;
        }


    }
}
