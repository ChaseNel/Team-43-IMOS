using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.SafetyChecklist
{
    public class GetSafetyItemDto
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public string Safetyitemcategory { get; set; }
        public int SafetyitemcategoryId { get; set; }
    
    }
}
