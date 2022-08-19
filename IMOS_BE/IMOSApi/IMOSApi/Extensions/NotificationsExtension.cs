
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Extensions
{
    public class NotificationsExtension
    {
        private readonly IConfiguration _configuration;

        public NotificationsExtension(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void NewSupplierOrderNotification(int supplierId)
        {
           
        }
    }
}
