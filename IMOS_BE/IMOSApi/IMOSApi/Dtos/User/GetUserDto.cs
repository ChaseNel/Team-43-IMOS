using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.User
{
    public class GetUserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int UserroleId { get; set; }
        public int EmployeeId { get; set; }
        public string Employee { get; set; }
        public string Userrole { get; set; }
        public string autoAssignedPassword { get; set; }
    }
}
