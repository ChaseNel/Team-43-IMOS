using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Employee
    {
        public Employee()
        {
            Documents = new HashSet<Document>();
            Projectemployees = new HashSet<Projectemployee>();
            Users = new HashSet<User>();
        }

        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Contactnumber { get; set; }

        public virtual ICollection<Document> Documents { get; set; }
        public virtual ICollection<Projectemployee> Projectemployees { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
