using System;

namespace Source.Models
{
    public class Car
    {
        public int ID { get; set; }
        public string CarNo { get; set; }
        public string Detail { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public Customer ParentCustomer { get; set; }
    }
}