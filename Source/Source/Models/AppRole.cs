using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Source.Models
{
    public class AppRole
    {
        [NotMapped]
        public bool IsAdmin => RoleType == RoleType.Admin;

        [NotMapped]
        public bool IsEmployee => RoleType != RoleType.Emp;

        public int ID { get; set; }

        public RoleType RoleType { get; set; } = RoleType.Emp;
    }

    public enum RoleType
    {
        Admin = 1,
        Emp
    }
}