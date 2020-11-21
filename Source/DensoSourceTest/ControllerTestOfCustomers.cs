using System.Net;
using System.Net.Http;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Source;
using Source.Models;
using Xunit;

namespace DensoSourceTest
{
    public class ControllerTestOfCustomers : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly CustomWebApplicationFactory<Startup> _factory;
        private HttpClient _client;
        public ControllerTestOfCustomers(CustomWebApplicationFactory<Startup> factory)
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
        public async void CustomerGetの件数()
        {
            var res = await _client.GetAsync("/api/customers");
            res.StatusCode.Is(HttpStatusCode.OK);
            var responseContent = await JsonSerializer.DeserializeAsync<Customer[]>(
                await res.Content.ReadAsStreamAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            responseContent.Length.Is(3);
        }
    }
}