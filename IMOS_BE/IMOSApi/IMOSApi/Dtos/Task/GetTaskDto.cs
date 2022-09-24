
using System;
using System.Collections.Generic;


namespace IMOSApi.Dtos.Task
{
    public class GetTaskDto
    {

        public string TasktypeDescription { get; set; }
        public string Startdate { get; set; }
        public string Enddate { get; set; }
        public int Qnapassed { get; set; }
        public string Description { get; set; }

    }
}
