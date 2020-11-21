using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Source;
using Source.Models;
using Xunit;

namespace DensoSourceTest
{
    public class ControllerTestOfProfile : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly CustomWebApplicationFactory<Startup> _factory;
        private HttpClient _client;
        public ControllerTestOfProfile(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = _factory.WithWebHostBuilder(b =>
                b.ConfigureTestServices(services =>
                {
                    services.AddAuthentication("Test")
                        .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>
                            ("Test", options => { });
                })).CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false,
            });
        }

        [Fact]
        public async Task 自分のProfileを取得できるか()
        {
            var res = await _client.GetAsync("/api/profile/myprofile");
            res.StatusCode.Is(HttpStatusCode.OK);
            var responseContent = await JsonSerializer.DeserializeAsync<User>(
                await res.Content.ReadAsStreamAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            responseContent.uid.Is("test");
        }
    }
}