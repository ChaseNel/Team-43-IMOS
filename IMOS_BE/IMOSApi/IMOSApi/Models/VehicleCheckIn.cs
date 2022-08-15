using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class VehicleCheckIn
    {
        public int CheckInId { get; set; }
        public DateTime Date { get; set; }
        public int Odomoter { get; set; }
        public int VehicleId { get; set; }
    }
}
