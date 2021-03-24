using Application.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
namespace Infrastructure.Security

{
    public class UsernameAccessor : IUsernameAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UsernameAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;

        }

        public string GetUserName()
        {
            return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}