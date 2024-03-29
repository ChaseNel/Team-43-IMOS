﻿using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Vehicle
    {
        public Vehicle()
        {
            VehicleCheckIns = new HashSet<VehicleCheckIn>();
            VehicleCheckOuts = new HashSet<VehicleCheckOut>();
        }

        public int VehicleId { get; set; }
        public int VehicletypeId { get; set; }
        public int? UserId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public DateTime Year { get; set; }
        public string Color { get; set; }
        public DateTime DatePurchased { get; set; }
        public DateTime LastServiced { get; set; }
        public Boolean VehicleStatus { get; set; }

        public virtual User User { get; set; }
        public virtual Vehicletype Vehicletype { get; set; }
        public virtual ICollection<VehicleCheckIn> VehicleCheckIns { get; set; }
        public virtual ICollection<VehicleCheckOut> VehicleCheckOuts { get; set; }
    }
}
