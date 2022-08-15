using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.Order
{
    public class AddSupplierOrderCart
    {
      

        [Required]
        public int Quantity { get; set; }

        public List<MaterialItemDto> Materials { get; set; }

        //public int SupplierId { get; set; }
     
    }

    public class MaterialItemDto
    {
        [Required]
        public int MaterialId { get; set; }
    }
}
