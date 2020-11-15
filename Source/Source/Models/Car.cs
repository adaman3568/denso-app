using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;

namespace Source.Models
{
    public class Car
    {
        [Key]
        public int ID { get; set; }
        public string CarNo { get; set; }
        public string Detail { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime Created { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? Updated { get; set; }

        [ForeignKey("ParentCustomer")]
        public virtual int ParentCustomerId { get; set; }

        [JsonIgnore]
        public virtual Customer ParentCustomer { get; set; }

        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; }

        [NotMapped] public int? CommentCnt => Comments?.Count;

        [NotMapped] public DateTime? LastCommentDate => Comments?.Max(com => com?.Created);
    }


}