using System;
using Newtonsoft.Json.Bson;
using Source.Models;

namespace Source.Attribute
{
    [AttributeUsage(AttributeTargets.Method,Inherited = false,AllowMultiple = true)]
    public class PermissionAttribute : System.Attribute
    {
        public PermissionAttribute(RoleType roleType)
        {
            RoleType = roleType;
        }

        public RoleType RoleType { get; }
    }
}