using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Warehousematerial
    {
        public Warehousematerial()
        {
            Warehousematerialstocktakes = new HashSet<Warehousematerialstocktake>();
            Warehousematerialwriteoffs = new HashSet<Warehousematerialwriteoff>();
        }

        public int MaterialId { get; set; }
        public int WarehouseId { get; set; }
        public int? Quantity { get; set; }

        public virtual Material Material { get; set; }
        public virtual Warehouse Warehouse { get; set; }
        public virtual ICollection<Warehousematerialstocktake> Warehousematerialstocktakes { get; set; }
        public virtual ICollection<Warehousematerialwriteoff> Warehousematerialwriteoffs { get; set; }
    }
}
