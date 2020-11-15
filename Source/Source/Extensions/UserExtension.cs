using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Source.Models;

namespace Source.Extentions
{
    public static class UserExtension
    {
        public static string GetUIdFromClaim(this ClaimsPrincipal cp)
        {
            
            var userClams = cp.Claims.FirstOrDefault(item => item.Type == "user_id");
            return userClams?.Value;
        }

        public static User GetUser(this ClaimsPrincipal cp,DensoContext context)
        {
            var user = context.Users.Include(u => u.ParentCompany).Include(u => u.Comments).FirstOrDefault(us => us.uid == cp.GetUIdFromClaim());
            return user;
        }

        public static Company GetLoginUsersCompany(this ClaimsPrincipal cp, DensoContext context)
        {
            var user = context.Users.Include(u => u.ParentCompany).FirstOrDefault(us => us.uid == cp.GetUIdFromClaim());
            return user?.ParentCompany;
        }
    }
}