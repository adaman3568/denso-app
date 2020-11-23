using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Source.Extentions;
using Source.Models;
using SQLitePCL;

namespace Source.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommentsController : ControllerBase
    {
        private readonly DensoContext _context;

        public CommentsController(DensoContext context)
        {
            _context = context;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            var loginUser = User.GetUser(_context);
            // 上記親会社に紐づくコメントを取得
            var com = await _context.Companies
                                    .Include(com => com.Customers)
                                        .ThenInclude(cus => cus.Cars)
                                            .ThenInclude(car => car.Comments)
                                    .Include(com => com.Users)
                                    .FirstOrDefaultAsync(com => com.ID == loginUser.ParentCompanyId);

            var res = com.Customers.SelectMany(cus => cus.Cars).SelectMany(car => car.Comments).OrderBy(com => com.ID);

            return res.ToList();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var loginUser = User.GetUser(_context);
            // ログインユーザーの所属している会社のコメントのIDなら取得する。
            var com = await _context.Comments.Include(com => com.User).ThenInclude(u => u.ParentCompany).FirstOrDefaultAsync(com => com.ID == id);
            if (com == null)
            {
                return NotFound();
            }

            if (com.User.ParentCompanyId == loginUser.ParentCompanyId)
            {
                return com;
            }

            return NotFound();
        }

        // GET: api/Comments/5/repcomments
        [HttpGet("{id}/repcomments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetRepComment(int id)
        {
            var com = await _context
                .Comments
                .Include(com => com.User)
                .ThenInclude(u => u.ParentCompany)
                .Include(com => com.RepComment)
                .FirstOrDefaultAsync(com => com.ID == id);

            if (com == null)
            {
                return NotFound();
            }

            var loginUser = User.GetUser(_context);
            if (com.User.ParentCompanyId == loginUser.ParentCompanyId)
            {
                return com.RepComment.ToList();
            }

            return NotFound();

        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            var loginUser = User.GetUser(_context);
            // ログインユーザーのコメントでなければ更新させない
            if (id != comment.ID && loginUser.Comments.All(com => com.ID != id))
            {
                return BadRequest();
            }

            comment.Updated = DateTime.Now;
            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Comments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("{carId:int}")]
        public async Task<ActionResult<Comment>> PostComment(int carId, Comment comment)
        {
            var loginUser = User.GetUser(_context);
            // 受け取ったCarIdの車両がログインユーザーの所属している会社で登録している車両なら処理をする。
            var car = await _context.Cars
                .Include(car => car.ParentCustomer)
                .ThenInclude(cus => cus.ParentCompany)
                .FirstOrDefaultAsync(car => car.ID == carId && car.ParentCustomer.ParentCompanyId == loginUser.ParentCompanyId);

            if (car == null)
            {
                return BadRequest();
            }
            comment.Created = DateTime.Now;
            comment.ParentCar = car;
            comment.UserId = loginUser.ID;

            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.ID }, comment);
        }

        // POST: api/Comments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("rep/{parentComId:int}")]
        public async Task<ActionResult<Comment>> PostRepComment(int parentComId, Comment comment)
        {
            var parentComment = await _context.Comments.Include(com => com.ParentCar).FirstOrDefaultAsync(com => com.ID == parentComId);
            if (parentComment == null)
            {
                return BadRequest();
            }

            comment.ParentComment = parentComment;
            comment.ParentCar = parentComment.ParentCar;
            comment.Created = DateTime.Now;

            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.ID }, comment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Comment>> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.ID == id);
        }
    }
}
