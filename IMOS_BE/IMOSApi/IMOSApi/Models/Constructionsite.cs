﻿using System;
using System.Collections.Generic;

#nullable disable

namespace IMOSApi.Models
{
    public partial class Constructionsite
    {
        public Constructionsite()
        {
            Projects = new HashSet<Project>();
        }

        public int ConstructionsiteId { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Project> Projects { get; set; }
    }
}
