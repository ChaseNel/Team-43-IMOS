using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Projectmaterialrequest
    {
        public Projectmaterialrequest()
        {
            Projectmaterialrequestlists = new HashSet<Projectmaterialrequestlist>();
        }

        public int ProjectmaterialrequestId { get; set; }
        public int? ProjectId { get; set; }
        public int UrgencylevelId { get; set; }
        public bool? Fulfillmenttype { get; set; }
        public DateTime RequestDate { get; set; }
        public int MaterialrequestsstatusId { get; set; }

        public virtual Materialrequeststatus Materialrequestsstatus { get; set; }
        public virtual Project Project { get; set; }
        public virtual Urgencylevel Urgencylevel { get; set; }
        public virtual ICollection<Projectmaterialrequestlist> Projectmaterialrequestlists { get; set; }
    }
}
