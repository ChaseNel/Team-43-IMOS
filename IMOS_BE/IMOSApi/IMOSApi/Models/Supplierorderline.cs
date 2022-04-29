using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Supplierorderline
    {
        public Supplierorderline()
        {
            Deliveries = new HashSet<Delivery>();
        }

        public int SupplierId { get; set; }
        public int MaterialId { get; set; }
        public int? Quantity { get; set; }
        public string Address { get; set; }

        public virtual Material Material { get; set; }
        public virtual Supplier Supplier { get; set; }
        public virtual ICollection<Delivery> Deliveries { get; set; }
    }
}
