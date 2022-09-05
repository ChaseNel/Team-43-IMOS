using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Dtos.Project
{
    public class GetProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Request { get; set; }
        public int RequestId { get; set; }
        public string Constructionsite { get; set; }
        public int ConstructionsiteId { get; set; }
    }
}
