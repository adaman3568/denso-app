using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Source.Models
{
    public class Company
    {
        [Key]
        public int ID { get; set; }
        public string AccountCode { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public virtual ICollection<Customer> Customers { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}