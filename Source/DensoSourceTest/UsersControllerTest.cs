using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Source;
using Xunit;

namespace DensoSourceTest
{
    public class UsersControllerTest : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly CustomWebApplicationFactory<Startup> _factory;

        public UsersControllerTest(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task Unauthorized()
        {
            var client = _factory.CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false,
            });
            var forecasts = await client.GetAsync("/api/users");
            Assert.Equal(HttpStatusCode.Unauthorized, forecasts.StatusCode);
        }

        [Fact]
        public async Task GetMyProfile()
        {
            var client = _factory.WithWebHostBuilder(b =>
                b.ConfigureTestServices(services =>
                {
                    services.AddAuthentication("test")
                        .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>
                            ("Test", options => { });
                })).CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false,
            });

            var forecasts = await client.GetAsync("/api/profile/myprofile");
            Assert.Equal(HttpStatusCode.OK, forecasts.StatusCode);
        }
    }
}