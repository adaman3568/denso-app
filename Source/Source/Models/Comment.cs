using System;

namespace Source.Models
{
    public class Comment
    {
        public int ID { get; set; }
        public string Detail { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public Car ParentCar { get; set; }
        public User User { get; set; }
        public Comment ParentComment { get; set; }
    }
}