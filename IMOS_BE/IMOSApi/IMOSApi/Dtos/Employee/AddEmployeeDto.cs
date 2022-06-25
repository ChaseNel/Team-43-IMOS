using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.Employee
{
    public class AddEmployeeDto
    {
        public int Employee_Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string FilePath { get; set; }

    }
}
