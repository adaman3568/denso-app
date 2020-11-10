using System.Collections.Generic;
using System.Net.NetworkInformation;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            #region Company
            var company = new Company()
            {
                ID = 1,
                Name = "Rst.com"
            };
            #endregion

            #region User

            var user = new User()
            {
                ID = 1,
                Name = "Hiroshi",
                ParentCompanyId = 1
            };

            var user2 = new User()
            {
                ID = 2,
                Name = "杉山　隆",
                ParentCompanyId = 1
            };

            #endregion

            #region Customer
            var customer1 = new Customer()
            {
                ID = 1,
                Name = "株式会社タイガー",
                Address = "東京都千代田区",
                Detail = "良い会社",
                ParentCompanyId = 1
            };

            var customer2 = new Customer()
            {
                ID = 2,
                Name = "株式会社Rejoist.",
                Address = "福岡県福岡市",
                Detail = "良い会社",
                ParentCompanyId = 1
            };
            #endregion

            #region Car
            var car = new Car()
            {
                ID = 1, CarNo = "11-11",ParentCustomerId = 1
            };

            var car2 = new Car()
            {
                ID = 2,
                CarNo = "22-22",
                ParentCustomerId =1
            };

            var car3 = new Car()
            {
                ID = 3,
                CarNo = "33-33",
                ParentCustomerId =2
            };

            var car4 = new Car()
            {
                ID = 4,
                CarNo = "44-44",
                ParentCustomerId =2
            };


            #endregion

            #region Comments

            var comment = new Comment()
            {
                ID = 1,
                Detail = "test1",
                UserId = 1,
                ParentCarId = 1
            };

            var comment2 = new Comment()
            {
                ID = 2,
                Detail = "test2",
                UserId = 1,
                ParentCarId = 2
            };

            var comment3 = new Comment()
            {
                ID = 3,
                Detail = "test3",
                UserId = 1,
                ParentCarId = 3
            };

            var comment4 = new Comment()
            {
                ID = 4,
                Detail = "test4",
                UserId = 1,
                ParentCarId = 4
            };

            var comment5 = new Comment()
            {
                ID = 5,
                Detail = "test5",
                UserId = 1,
                ParentCarId = 1
            };

            var comment6 = new Comment()
            {
                ID = 6,
                Detail = "test6",
                UserId = 1,
                ParentCarId = 2
            };

            var comment7 = new Comment()
            {
                ID = 7,
                Detail = "test7",
                UserId = 1,
                ParentCarId = 3
            };

            #endregion


            modelBuilder.Entity<Company>().HasData(company);
            modelBuilder.Entity<User>().HasData(user, user2);
            modelBuilder.Entity<Customer>().HasData(customer1, customer2);
            modelBuilder.Entity<Car>().HasData(car, car2, car3, car4);
            modelBuilder.Entity<Comment>().HasData(comment, comment2, comment3, comment4, comment5, comment6, comment7);
            base.OnModelCreating(modelBuilder);
        }
    }
}