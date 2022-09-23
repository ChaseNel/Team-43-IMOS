using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class User
    {
        public User()
        {
            Equipmentchecks = new HashSet<Equipmentcheck>();
            Stocktakes = new HashSet<Stocktake>();
         
            UserVehicle = new HashSet<UserVehicle>();

        }

        public int UserId { get; set; }
        public int UserroleId { get; set; }
        public int EmployeeId { get; set; }
        public string Username { get; set; }
        public string Userpassword { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Userrole Userrole { get; set; }
        public virtual ICollection<Equipmentcheck> Equipmentchecks { get; set; }
        public virtual ICollection<Stocktake> Stocktakes { get; set; }
        public virtual ICollection<UserVehicle> UserVehicle { get; set; }
    }
}
