using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
        public DateTime? Updated { get; set; }

        [ForeignKey("ParentCompany")]
        public int ParentCompanyId { get; set; }

        [JsonIgnore]
        public virtual Company ParentCompany { get; set; }

        [JsonIgnore]
        public virtual ICollection<Car> Cars { get; set; }

        [NotMapped] public int? CommentCnt => Cars?.Sum(c => c.CommentCnt);

        [NotMapped] public DateTime? LastCommentDate => Cars?.Max(c => c?.LastCommentDate);

    }
}