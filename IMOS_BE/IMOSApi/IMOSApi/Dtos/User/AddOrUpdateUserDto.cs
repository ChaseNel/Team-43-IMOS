using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos
{
    public class AddOrUpdateUserDto
    {

        [Required]
        public string Username { get; set; }
   
        public int UserroleId { get; set; }

        public int EmployeeId { get; set; }

    }
}
