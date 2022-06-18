using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.Vehicle
{
    public class AddOrUpdateVehicleDto
    {
        [Required]
        public int VehicletypeId { get; set; }

        [Required]
        public string Make { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public DateTime Year { get; set; }
        [Required]
        public string Color { get; set; }
        [Required]
        public DateTime DatePurchased { get; set; }
        [Required]
        public DateTime LastServiced { get; set; }
    
    }
}
