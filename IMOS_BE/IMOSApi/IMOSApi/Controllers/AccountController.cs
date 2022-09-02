using IMOSApi.Dtos.Authentication;
using IMOSApi.Helpers;
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

            try
            {
                var message = "";
                if (!ModelState.IsValid)
                {
                    message = "Something went wrong on your side. Please try again";
                    return BadRequest(new { message });

                }

                var password = EncDscPassword.EncryptPassword(model.Password.ToString());
                var _user = await _context.Users
                    .Where(u => u.Username == model.Username.ToLower() && u.Userpassword == password).FirstOrDefaultAsync();

                if (_user != null)
                {

                    var token = GenerateToken(_user);
                    return GenerateToken(_user);
                }

                return Unauthorized();
            }
            catch (Exception c)
            {
                throw new Exception(c.Message);
                return null;
            }
           
        }


        List <Claim> claims = new List<Claim>();
        private ActionResult GenerateToken(User user)
        {
            var  key = "xvbxjkbgvnxcgbxcjkvxcvvAEWaWW* Ra9wre7ERW&*GIRLS * GDERFDFCCVZBCVB";
            var issuer = "http://localhost:4200/";

            var tokenHandler = new JwtSecurityTokenHandler(); // declaring token handler
           var Securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(Securitykey, SecurityAlgorithms.HmacSha256);
            
            claims.Add(new Claim("Name", user.Username));
            claims.Add(new Claim("Role", user.UserroleId.ToString()));
          // claims.Add(new Claim("DisplayName", user.Userrole.Description));
            var token = new JwtSecurityToken(

             issuer,
             issuer,
            claims,
             expires: DateTime.Now.AddDays(1),
             signingCredentials: credentials
            );


            return Created("", new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo

            });
        }
    






     /*   private RefreshToken GenerateRefreshToken()
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
        }*/


        //private string GenerateAccessToken(string username)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtsettings.JwtKey));
        //    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        //    var claims = new List<Claim>                Subject = new ClaimsIdentity(
        
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
