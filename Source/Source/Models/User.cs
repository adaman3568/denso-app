using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Source.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }

        [ForeignKey("ParentCompany")]
        public int ParentCompanyId { get; set; }
        public Company ParentCompany { get; set; }

        public IEnumerable<Comment> Comments { get; set; }
    }
}