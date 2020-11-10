using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;

namespace Source.Models
{
    public class Customer
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Detail { get; set; }
        public string Address { get; set; }

        public DateTime Created { get; set; }

        [ForeignKey("ParentCompany")]
        public int ParentCompanyId { get; set; }
        public Company ParentCompany { get; set; }

        public IEnumerable<Car> Cars { get; set; }

    }
}