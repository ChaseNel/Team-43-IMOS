using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group43.Services.Dtos.Administration
{
    public class GetUserRoleDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
