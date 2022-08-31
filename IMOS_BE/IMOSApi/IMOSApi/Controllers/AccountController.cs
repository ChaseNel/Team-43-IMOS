using IMOSApi.Dtos.Authentication;
using IMOSApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMOSContext _context;

        private readonly JWTSettings _jwtsettings;

        public AccountController(IMOSContext context, IOptions<JWTSettings> jwtsettings)
        {
            _context = context;
            _jwtsettings = jwtsettings.Value;
        }


        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<ActionResult>Login([FromBody] LogInDto model)
        {
            var message = "";
            if(!ModelState.IsValid)
            {
                message = "Something went wrong on your side. Please try again";
                return BadRequest(new { message });

            }

            var _user = await _context.Users
                .Where(u => u.Username == model.Username.ToLower() && u.Userpassword == model.Password).FirstOrDefaultAsync();

            if (_user == null)
            {
                return Unauthorized();

            }

            var tokenHandler = new JwtSecurityTokenHandler(); // declaring token handler
            var key = Encoding.UTF8.GetBytes(_jwtsettings.JwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.Name, _user.Username)

                    }),
                Expires = DateTime.Now.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            string finalToken = tokenHandler.WriteToken(token);
            return Ok(finalToken);


            //sign your token here here..
            //userWithToken.AccessToken = GenerateAccessToken(user.Username);
            //return userWithToken;

            //UserWithToken userWithToken = null;
            //if (user != null)
            //{
            //    RefreshToken refreshToken = GenerateRefreshToken();
            //    user.RefreshTokens.Add(refreshToken);
            //    await _context.SaveChangesAsync();
            //    userWithToken = new UserWithToken(user);
            //    userWithToken.RefreshToken = refreshToken.Token;
            //}

            //if (userWithToken == null)
            //{
            //    return NotFound();
            //}
        }


        private RefreshToken GenerateRefreshToken()
        {
            RefreshToken refreshToken = new RefreshToken();

            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                refreshToken.Token = Convert.ToBase64String(randomNumber);
            }
            refreshToken.ExpiryDate = DateTime.UtcNow.AddMonths(3);
            return refreshToken;
        }


        //private string GenerateAccessToken(string username)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtsettings.JwtKey));
        //    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        //    var claims = new List<Claim>
        //    {
        //         new Claim(ClaimTypes.Name,username),
        //           new Claim("CompanyName","Imos Syetem"),
        //    };

        //    var token = new JwtSecurityToken(

              

        //             signingCredentials: credentials
        //        );
        //}
    }
}
