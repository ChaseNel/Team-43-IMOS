using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Warehouse
    {
        public Warehouse()
        {
            Materials = new HashSet<Material>();
            Warehouseequipments = new HashSet<Warehouseequipment>();
        }

        public int WarehouseId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }

        public virtual ICollection<Material> Materials { get; set; }
        public virtual ICollection<Warehouseequipment> Warehouseequipments { get; set; }
    }
}
