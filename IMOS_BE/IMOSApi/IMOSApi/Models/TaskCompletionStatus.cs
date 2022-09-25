using System;
using System.Collections.Generic;


namespace IMOSApi.Models
{
    public class TaskCompletionStatus
    {
        public TaskCompletionStatus()
        {
            Tasks = new HashSet<Task>();
        }

        public int TaskStatusId { get; set; }
        public string name { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
    }

}

