using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Source.Extentions;
using Source.Models;
using Source.Attribute;

namespace Source.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly DensoContext _context;

        public UsersController(DensoContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var loginUser = User.GetUser(_context);
            return await _context.Users.Where(u => u.ParentCompanyId == loginUser.ParentCompanyId).ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var loginUser = User.GetUser(_context);
            var user = await _context.Users.FirstOrDefaultAsync(user => user.ID == id && user.ParentCompanyId == loginUser.ParentCompanyId);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/Users/5/comments
        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetUserComments(int id)
        {
            var loginUser = User.GetUser(_context);

            var user = await _context.Users
                .Include(user => user.Comments)
                .ThenInclude(com => com.ParentCar)
                .ThenInclude(car => car.ParentCustomer)
                .FirstOrDefaultAsync(user =>
                user.ID == id && user.ParentCompanyId == loginUser.ParentCompanyId);

            if (user == null)
            {
                return NotFound();
            }

            var comment = user.Comments;

            return comment.OrderByDescending(com => com.Created).ToList();
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.ID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(this.GetUser),new []{id},user);
        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Permission(RoleType.Admin)]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpGet("isAdmin")]
        public async Task<ActionResult<bool>> CheckAdmin()
        {
            var loginUser = User.GetUser(_context);
            var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.ID == loginUser.ID);
            if (user != null)
            {
                return user.Role.IsAdmin;
            }

            return false;
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.ID == id);
        }
    }
}
