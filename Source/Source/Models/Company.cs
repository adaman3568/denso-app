using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Source.Models
{
    public class Company
    {
        public int ID { get; set; }
        public string AccountCode { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public IEnumerable<Customer> Customers { get; set; }
        public IEnumerable<User> Users { get; set; }
    }
}