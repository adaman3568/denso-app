using System;
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
    }
}