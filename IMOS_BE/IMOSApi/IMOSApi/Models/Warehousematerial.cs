using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Warehousematerial
    {
     
        public int QuantityOnHand { get; set; }

       
        public virtual Material Material { get; set; }
        public int MaterialId { get; set; }
        public virtual Warehouse Warehouse { get; set; }
        public int WarehouseId { get; set; }
    }
}
