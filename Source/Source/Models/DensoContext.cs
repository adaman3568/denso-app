using Microsoft.EntityFrameworkCore;

namespace Source.Models
{
    public class DensoContext : DbContext
    {
        public DensoContext(DbContextOptions<DensoContext> opt) : base(opt)
        {
            
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<User> Users { get; set; }
    }
}