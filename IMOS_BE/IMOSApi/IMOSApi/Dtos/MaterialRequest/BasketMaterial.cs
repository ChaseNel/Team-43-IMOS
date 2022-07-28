using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMOSApi.Models;


namespace IMOSApi.Dtos.MaterialRequest
{
    public class BasketMaterial
    {
        public int MaterialId { get; set; }

        public string MaterialName { get; set; }

        public int MaterialTypeId { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }


      //  public virtual Materialtype MaterialType { get; set; }

    }
}
