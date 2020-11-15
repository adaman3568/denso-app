using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;

namespace Source.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public string uid { get; set; }
        public string Name { get; set; }

        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }

        [ForeignKey("ParentCompany")]
        public int ParentCompanyId { get; set; }

        [JsonIgnore]
        public virtual Company ParentCompany { get; set; }

        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; }

        [NotMapped] public int? CommentCnt => Comments?.Count;

        [NotMapped] public DateTime? LastCommentDate => Comments?.Max(com => com?.Created);
    }
}