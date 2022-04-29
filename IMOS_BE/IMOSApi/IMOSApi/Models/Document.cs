using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Document
    {
        public Document()
        {
            Employees = new HashSet<Employee>();
        }

        public int DocumentId { get; set; }
        public byte[] Contractfile { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
