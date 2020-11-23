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
using SQLitePCL;

namespace Source.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CarsController : ControllerBase
    {
        private readonly DensoContext _context;

        public CarsController(DensoContext context)
        {
            _context = context;
        }

        // GET: api/Cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            var loginUser = User.GetUser(_context);
            var car = await _context.Cars.Include(c => c.Comments)
                .Where(car => car.ParentCustomer.ParentCompanyId == loginUser.ParentCompanyId).ToListAsync();

            return car;
        }

        // GET: api/Cars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var loginUser = User.GetUser(_context);
            var car = await _context.Cars.Include(c => c.Comments).FirstOrDefaultAsync(c => c.ID == id && c.ParentCustomer.ParentCompanyId == loginUser.ParentCompanyId);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        // GET: api/Cars/5/comments
        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCarComments(int id)
        {
            var loginUser = User.GetUser(_context);
            var car = await _context.Cars
                .Include(car => car.Comments)
                .Include(car => car.ParentCustomer)
                .FirstOrDefaultAsync(car => car.ID == id 
                                            && car.ParentCustomer.ParentCompanyId == loginUser.ParentCompanyId);

            if (car == null)
            {
                return NotFound();
            }

            return car.Comments.ToList();

        }

        // PUT: api/Cars/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(int id, Car car)
        {
            if (id != car.ID)
            {
                return BadRequest();
            }
            // 更新時間を入れる
            car.Updated = DateTime.Now;
            _context.Entry(car).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
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

        // POST: api/Cars
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("{parentCustomerId}")]
        public async Task<ActionResult<Car>> PostCar(int parentCustomerId, Car car)
        {
            var parentCustomer = await _context.Customers.FindAsync(parentCustomerId);
            if (parentCustomer == null)
            {
                return BadRequest();
            }

            car.ParentCustomer = parentCustomer;
            car.Created = DateTime.Now;

            await _context.Cars.AddAsync(car);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCar", new { id = car.ID }, car);
        }

        // DELETE: api/Cars/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Car>> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return car;
        }

        private bool CarExists(int id)
        {
            return _context.Cars.Any(e => e.ID == id);
        }
    }
}
