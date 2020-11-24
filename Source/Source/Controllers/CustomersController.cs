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

namespace Source.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomersController : ControllerBase
    {
        private readonly DensoContext _context;

        public CustomersController(DensoContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var user = User.GetUser(_context);
            var customer = await _context.Customers.Include(cus => cus.Cars).ThenInclude(car => car.Comments)
                .Where(cus => cus.ParentCompanyId == user.ParentCompanyId).ToListAsync();
            return customer;
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var user = User.GetUser(_context);
            var customer = await _context.Customers.Include(cus => cus.Cars).ThenInclude(car => car.Comments)
                .FirstOrDefaultAsync(cus => cus.ParentCompanyId == user.ParentCompanyId && cus.ID == id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // GET: api/Customers/5/comments
        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCustomerComments(int id)
        {
            var user = User.GetUser(_context);
            var customer = await _context
                .Customers
                .Include(cus => cus.Cars)
                .ThenInclude(car => car.Comments)
                .ThenInclude(comment => comment.ParentCar)
                .ThenInclude(com => com.ParentCustomer)
                .FirstOrDefaultAsync(cus => cus.ID == id && cus.ParentCompanyId == user.ParentCompanyId);

            if (customer == null)
            {
                return NotFound();
            }

            var comments = customer.Cars
                .SelectMany(car => car.Comments)
                .OrderByDescending(com => com.Created)
                .ToList();

            return comments;
        }

        // GET: api/Customers/5/comments
        [HttpGet("{id}/cars")]
        public async Task<ActionResult<IEnumerable<Car>>> GetCustomerCars(int id)
        {
            var user = User.GetUser(_context);
            var customer = await _context.Customers.Include(cus => cus.Cars).ThenInclude(car => car.Comments).FirstOrDefaultAsync(cus => cus.ID == id && cus.ParentCompanyId == user.ParentCompanyId);

            if (customer == null)
            {
                return NotFound();
            }

            return customer.Cars.ToList();
        }



        // PUT: api/Customers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.ID)
            {
                return BadRequest();
            }

            customer.Updated = DateTime.Now;
            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // POST: api/Customers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            var user = User.GetUser(_context);
            customer.ParentCompany = user.ParentCompany;
            customer.Created = DateTime.Now;
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.ID }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.ID == id);
        }
    }
}
