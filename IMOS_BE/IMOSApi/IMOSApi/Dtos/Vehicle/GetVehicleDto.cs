using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.Vehicle
{
    public class GetVehicleDto
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public DateTime Year { get; set; }
        public string Color { get; set; }
        public DateTime DatePurchased { get; set; }
        public DateTime LastServiced { get; set; }
        public bool VehicleStatus { get; set; }
        public string Vehicletype { get; set; }
        public int VehicletypeId { get; set; }




    }
}
