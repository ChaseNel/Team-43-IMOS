using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Vehicle
    {
        public int VehicleId { get; set; }
        public int VehicletypeId { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
        public virtual Vehicletype Vehicletype { get; set; }
    }
}
