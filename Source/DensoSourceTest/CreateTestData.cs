using System.Collections.Generic;
using Source.Models;

namespace DensoSourceTest
{
    public class CreateTestData
    {
        private DensoContext _context;

        public CreateTestData(DensoContext context)
        {
            _context = context;
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
        }

        public void MakeData()
        {
            #region Companyの追加

            var company1 = new Company() { Name = "Rst.Com" };
            var company2 = new Company() { Name = "Rejoist" };
            _context.Companies.AddRange(new List<Company>()
                        {company1,company2});

            #endregion

            #region Userの追加

            var user1 = new User()
            {
                Name = "hiroshi",
                uid = "test",
                ParentCompany = company1
            };

            var user2 = new User()
            {
                Name = "hisashi",
                uid = "test2",
                ParentCompany = company1
            };

            var user3 = new User()
            {
                Name = "takao",
                uid = "test3",
                ParentCompany = company2
            };

            var user4 = new User()
            {
                Name = "hisanori",
                uid = "test3",
                ParentCompany = company2
            };
            _context.Users.AddRange(new List<User>()
                    {
                        user1,user2,user3,user4
                    });

            #endregion

            #region Customerの追加

            var cus1 = new Customer()
            {
                Name = "Rst.com1",
                ParentCompany = company1
            };
            var cus2 = new Customer()
            {
                Name = "Rst.com2",
                ParentCompany = company1
            };
            var cus3 = new Customer()
            {
                Name = "Rst.com3",
                ParentCompany = company1
            };
            var cus4 = new Customer()
            {
                Name = "Rst.com4",
                ParentCompany = company2
            };
            var cus5 = new Customer()
            {
                Name = "Rst.com5",
                ParentCompany = company2
            };
            var cus6 = new Customer()
            {
                Name = "Rst.com6",
                ParentCompany = company2
            };
            _context.Customers.AddRange(cus1, cus2, cus3, cus4, cus5, cus6);

            #endregion

            #region Carの追加

            var car1 = new Car()
            {
                CarNo = "11-11",
                ParentCustomer = cus1
            };

            var car2 = new Car()
            {
                CarNo = "11-12",
                ParentCustomer = cus1
            };

            var car3 = new Car()
            {
                CarNo = "11-13",
                ParentCustomer = cus2
            };
            var car4 = new Car()
            {
                CarNo = "11-14",
                ParentCustomer = cus2
            };

            var car5 = new Car()
            {
                CarNo = "11-15",
                ParentCustomer = cus3
            };

            var car6 = new Car()
            {
                CarNo = "11-16",
                ParentCustomer = cus3
            };

            var car7 = new Car()
            {
                CarNo = "11-17",
                ParentCustomer = cus4
            };

            var car8 = new Car()
            {
                CarNo = "11-18",
                ParentCustomer = cus4
            };

            _context.Cars.AddRange(new List<Car>()
            {
                car1, car2, car3, car4, car5, car6, car7, car8
            });

            #endregion

            #region Commentの追加

            var comment1 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car1
            };

            var comment2 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car1,
                ParentComment = comment1
            };

            var comment3 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car2,
                ParentComment = comment2
            };

            var comment4 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car2,
                ParentComment = comment2
            };

            var comment5 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car2
            };

            var comment6 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car3
            };

            var comment7 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car4
            };

            var comment8 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car5
            };

            var comment9 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car6
            };

            var comment10 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car7
            };

            var comment11 = new Comment()
            {
                Detail = "Test1",
                ParentCar = car8
            };

            _context.Comments.AddRange(new List<Comment>()
            {
                comment1,comment2,comment3,comment4,comment5,comment6,comment7,comment8,comment9,comment10,comment11
            });

            #endregion
            _context.SaveChanges();
        }
    }
}