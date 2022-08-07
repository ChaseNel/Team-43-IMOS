using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Orderline
    {
        public Orderline()
        {
            Deliveries = new HashSet<Delivery>();
            Suppliermaterialorders = new HashSet<Suppliermaterialorder>();
            Suppliersordersuppliers = new HashSet<Suppliersordersupplier>();
        }

        public int OrderId { get; set; }
        public DateTime Date { get; set; }
        public string OrderNumber { get; set; }

        public virtual ICollection<Delivery> Deliveries { get; set; }
        public virtual ICollection<Suppliermaterialorder> Suppliermaterialorders { get; set; }
        public virtual ICollection<Suppliersordersupplier> Suppliersordersuppliers { get; set; }
    }
}
