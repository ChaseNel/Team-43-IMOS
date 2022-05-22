﻿using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Supplier
    {
        public Supplier()
        {
            Materialtypes = new HashSet<Materialtype>();
            Supplierorderlines = new HashSet<Supplierorderline>();
        }

        public int SupplierId { get; set; }
        public int SuppliertypeId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Contactnumber { get; set; }

        public virtual Suppliertype Suppliertype { get; set; }
        public virtual ICollection<Materialtype> Materialtypes { get; set; }
        public virtual ICollection<Supplierorderline> Supplierorderlines { get; set; }
    }
}
