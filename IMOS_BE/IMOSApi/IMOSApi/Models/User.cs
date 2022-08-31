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
            RefreshTokens = new HashSet<RefreshToken>();
            Stocktakes = new HashSet<Stocktake>();
            Tasks = new HashSet<Task>();
            Userincidents = new HashSet<Userincident>();
            Vehicles = new HashSet<Vehicle>();
        }

        public int UserId { get; set; }
        public int UserroleId { get; set; }
        public int EmployeeId { get; set; }
        public string Username { get; set; }
        public string Userpassword { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Userrole Userrole { get; set; }
        public virtual ICollection<Equipmentcheck> Equipmentchecks { get; set; }
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
        public virtual ICollection<Stocktake> Stocktakes { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<Userincident> Userincidents { get; set; }
        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}
