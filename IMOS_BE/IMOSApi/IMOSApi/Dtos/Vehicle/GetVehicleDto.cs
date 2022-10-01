using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.Vehicle
{
    public class GetVehicleDto
    {
        public int vehicleId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Year { get; set; }
        public string Color { get; set; }
        public string DatePurchased { get; set; }
        public string LastServiced { get; set; }
        public int VehicleStatus { get; set; }
        public string Vehicletype { get; set; }
        public int VehicletypeId { get; set; }
        public int AssignedStatus { get; set; }




    }
}
