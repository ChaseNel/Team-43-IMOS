using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Data
{
    public class tblUser
    {
        [Key]
        public int UserId { get; set; }
        public int Userrole { get; set; }
        public int EmployeeId { get; set; }
        public string Username { get; set; }
        public string Userpassword { get; set; }
    }
}
