using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;

namespace Source.Models
{
    public class Comment
    {
        [Key] public int ID { get; set; }
        public string Detail { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }

        [ForeignKey("ParentCar")] public int ParentCarId { get; set; }

        [JsonIgnore] public Car ParentCar { get; set; }

        [ForeignKey("User")] public int? UserId { get; set; }

        [JsonIgnore] public virtual User User { get; set; }

        [ForeignKey("ParentComment")] public int? ParentCommentId { get; set; }

        [JsonIgnore] public virtual Comment ParentComment { get; set; }

        [JsonIgnore]
        public virtual ICollection<Comment> RepComment { get; set; }

        [NotMapped]
        public int RepCommentCnt => RepComment?.Count ?? 0;

        [NotMapped]
        public DateTime? LastRepCommentDate => RepComment?.Max(com => com?.Created);

        [NotMapped] public string ParentUserName => User.Name;

    }
}