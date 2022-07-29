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

        public string MaterialName { get; }

        public int MaterialTypeId { get; }
        public int Quantity { get; set; }
        public string Description { get; }


      //  public virtual Materialtype MaterialType { get; set; }

    }
}
