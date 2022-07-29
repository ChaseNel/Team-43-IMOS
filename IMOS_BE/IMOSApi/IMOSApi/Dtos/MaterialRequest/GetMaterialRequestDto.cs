using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.MaterialRequest
{
    public class GetMaterialRequestDto
    {
        public int MaterialRequestId { get; set; }
        public int ProjectId { get; set; }
        public int UrgencyLevelId { get; set; }
        public int FullfillmentType { get; set; }
        public DateTime RequestDate { get; set; }

        public int Quantity { get; set; }
    }
}
