using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Razor.Language.Intermediate;
using Microsoft.EntityFrameworkCore;
using Source.Extentions;
using Source.Models;

namespace Source.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly DensoContext _context;

        public ProfileController(DensoContext context)
        {
            _context = context;
        }

        [HttpGet("myprofile")]
        public async Task<ActionResult<User>> GetProfile()
        {
            var uid = User.GetUIdFromClaim();
            if (uid == null)
            {
                return NotFound();
            }

            var user = await _context.Users.Include(u => u.Comments).FirstOrDefaultAsync(u => u.uid == uid);
            if (user == null)
            {
                return NotFound();
            }

            return user;

        }

        [HttpGet("mycomments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            var uid = User.GetUIdFromClaim();
            if (uid == null)
            {
                return NotFound();
            }


            var coms = _context.Comments
                .Include(com => com.ParentCar)
                .ThenInclude(car => car.ParentCustomer)
                .Include(com => com.User)
                .Where(com => com.User.uid == uid);

            return coms.ToList();
        }
    }
}
