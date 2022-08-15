using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Suppliersordersupplier
    {
        public int SupplierId { get; set; }
        public int OrderId { get; set; }

        public virtual Orderline Order { get; set; }
        public virtual Supplier Supplier { get; set; }
    }
}
