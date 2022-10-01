using IMOSApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;

namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BackUpDatabaseController : ControllerBase
    {

        [HttpGet("BackUpDatabase")]
        public IActionResult BackUpDatabase()
        {
            using var context = new IMOSContext();
            var message = "";

            try
            {
             

                context.Database.ExecuteSqlRaw("exec IMOSDBBACKUP2");
                return Ok();

            }

            catch (Exception ex)
            {
                message = ex.Message;
                return Ok();
            }


        }

        [HttpPost("RestoreDatabase")]
        public IActionResult RestoreDatabase(string backuppath)
        {
            using var context = new IMOSContext();
            var message = "";

            try
            {
                var parameters = new[]
                {
                     new SqlParameter("@backuppath", SqlDbType.NVarChar)
                      {
                      Direction = ParameterDirection.Input,
                      Value = backuppath,
                     }
                };


                context.Database.ExecuteSqlRaw("exec RESTOREIMOSDATABASE22 @backuppath", parameters: parameters);
                return Ok();

            }

            catch (Exception ex)
            {
                message = ex.Message;
                return Ok();
            }


        }

    }
}
