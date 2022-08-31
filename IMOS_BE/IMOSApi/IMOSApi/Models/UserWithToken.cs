using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Models
{
    public class UserWithToken:User
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

        public UserWithToken(User user)
        {
            this.UserId = user.UserId;
            this.Username = user.Username;
            this.Userrole = user.Userrole;
            this.Userpassword = user.Userpassword;
        }

    }
}
