using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Source.Models
{
    public class Car
    {
        [Key]
        public int ID { get; set; }
        public string CarNo { get; set; }
        public string Detail { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        [ForeignKey("ParentCustomer")]
        public int ParentCustomerId { get; set; }
        public Customer ParentCustomer { get; set; }

        public IEnumerable<Comment> Comments { get; set; }
    }
}