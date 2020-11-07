using System;
using Microsoft.AspNetCore.Mvc;

namespace Source.Models
{
    public class Customer
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Detail { get; set; }
        public DateTime Created { get; set; }
        public Company ParentCompany { get; set; }
    }
}