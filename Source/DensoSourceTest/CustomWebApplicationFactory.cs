using System;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Source.Models;

namespace DensoSourceTest
{
    public class CustomWebApplicationFactory<TStartUp> : WebApplicationFactory<TStartUp> where TStartUp : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(
                    x => x.ServiceType == typeof(DbContextOptions<DensoContext>));
                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<DensoContext>(options =>
                {
                    options.UseInMemoryDatabase("Testing");
                });

                var sp = services.BuildServiceProvider();
                using (var scope = sp.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<DensoContext>();

                    // DB を作り直し
                    db.Database.EnsureDeleted();
                    db.Database.EnsureCreated();
                    // テストデータの投入
                    db.Users.Add(new User()
                    {
                        Created = DateTime.Now,
                        Name = "hiroshi",
                        uid = "test"
                    });
                    db.SaveChanges();
                }

            });
            base.ConfigureWebHost(builder);
        }
    }
}