using System.Collections.Generic;
using System.ComponentModel;

namespace Source.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public Company ParentCompany { get; set; }
        public IEnumerable<Comment> Comments { get; set; }
    }
}