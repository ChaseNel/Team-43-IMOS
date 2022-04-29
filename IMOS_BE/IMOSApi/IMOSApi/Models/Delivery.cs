using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Delivery
    {
        public int DeliveryId { get; set; }
        public int ProjectId { get; set; }
        public int SupplierId { get; set; }
        public int MaterialId { get; set; }
        public DateTime? Date { get; set; }
        public byte[] Deliverynote { get; set; }

        public virtual Project Project { get; set; }
        public virtual Supplierorderline Supplierorderline { get; set; }
    }
}
