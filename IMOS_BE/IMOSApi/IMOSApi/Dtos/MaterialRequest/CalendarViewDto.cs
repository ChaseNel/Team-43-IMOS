
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace IMOSApi.Dtos.MaterialRequest
{
    public class CalendarViewDto
    {

        public string ClientName { get; set; }
        public string UrgencyLevelName { get; set; }
        public string RequestDate { get; set; }
        public string StatusUpdateDate { get; set; }
        public string StatusName { get; set; }
    }
}
