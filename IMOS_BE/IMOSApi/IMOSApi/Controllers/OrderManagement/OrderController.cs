using IMOSApi.Dtos.Order;
using IMOSApi.Extensions;
using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers.OrderManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMOSContext _context;

        public OrderController(IMOSContext context)
        {
            _context = context;
        }

        // Add to Supplier Order Cart 
        [HttpPost("AddSupplierMaterialOrdersCart")]
        public IActionResult AddSupplierOderCart([FromBody]AddSupplierOrderCart model)
        {

            var message = "";
            if (!ModelState.IsValid)
            {
                var recordIbDb = _context.Orderlines.FirstOrDefault();
              //  var autoOrderNuberCode = OrderAutoCode.GenerateOrderNumber();
                if (recordIbDb != null)
                {
                    message = "Record exists in database";
                    return BadRequest(new { message });

                }
                //var autoOrderNuberCode = OrderAutoCode.GenerateOrderNumber();
                var newOrderDetails = new Orderline()
                {
                    //OrderNumber = autoOrderNuberCode
                    Date=DateTime.Now,
                };
                _context.Orderlines.Add(newOrderDetails);
                _context.SaveChanges();

                foreach (var item in model.Materials)
                {
                    var supplierMaterialsOrder = new Suppliermaterialorder()
                    {
                        MaterialId = item.MaterialId,  
                        OrderId = newOrderDetails.OrderId,
                        QuantityOrdered = model.Quantity,
                    };
                    _context.Suppliermaterialorders.Add(supplierMaterialsOrder);
                }

                //foreach (var item in model.Suppliers)
                //{
                //    var  supplierOrders = new Suppliersordersupplier()
                //    {
                //        SupplierId = item.SupplierId,
                //        OrderId=newOrderDetails.OrderId,
                      
                //    };
                //    _context.Suppliersordersuppliers.Add(supplierOrders);
                //}

                // send email to supplier //notification extension 
                _context.SaveChanges();
            }
            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }
    }
}
     

    
