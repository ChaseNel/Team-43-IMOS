﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.Material
{
    public class AddOrUpdateSupplierMaterialDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        

        public int MaterialtypeId { get; set; }

    }
}
