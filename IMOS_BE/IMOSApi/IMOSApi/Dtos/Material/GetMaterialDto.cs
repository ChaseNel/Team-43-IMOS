using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.Material
{
    public class GetMaterialDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public string Materialtype { get; set; }
        public int MaterialtypeId { get; set; }
        public string Suppliermaterials { get; set; }

    }
}
