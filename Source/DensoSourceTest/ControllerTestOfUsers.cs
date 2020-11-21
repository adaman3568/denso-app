using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Source;
using Source.Models;
using Xunit;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace DensoSourceTest
{
    public class UsersControllerTest : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly CustomWebApplicationFactory<Startup> _factory;
        private HttpClient _client;

        public UsersControllerTest(CustomWebApplicationFactory<Startup> factory)
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
        public async Task 所属ユーザーの取得()
        {
            var res = await _client.GetAsync("/api/users");
            res.StatusCode.Is(HttpStatusCode.OK);
            var responseContent2 = await JsonSerializer.DeserializeAsync<User[]>(
                await res.Content.ReadAsStreamAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            responseContent2.Length.Is(2);
        }

        [Fact]
        public async Task ユーザーの登録()
        {
            var user = new User()
            {
                Name = "Hiroshi",
                uid = "aaa"
            };

            var res = await _client.PostAsync("/api/users", new JsonContent(user));
            res.StatusCode.Is(HttpStatusCode.Created);
            var data = await JsonSerializer.DeserializeAsync<User>(
                await res.Content.ReadAsStreamAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            data.Name.Is("Hiroshi");
        }

        [Fact]
        public async Task ユーザーの更新()
        {
            var res = await _client.GetAsync("/api/users/4");
            res.IsSuccessStatusCode.IsTrue();
            var data = await JsonSerializer.DeserializeAsync<User>(
                await res.Content.ReadAsStreamAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            data.Name = "Takahiro";
            var res2 = await _client.PutAsync("/api/users/4", new JsonContent(data));
            res2.IsSuccessStatusCode.IsTrue();
            res2.StatusCode.Is(HttpStatusCode.NoContent);
        }
    }
}