using IMOSApi.Dtos.Employee;
using IMOSApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMOSApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private IMOSContext _dbContext;
        public EmployeeController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            using (var context = new IMOSContext())
            {
                return _dbContext.Employees.ToList();
            }
        }


        [HttpGet("GetEmployeeById/{id}")]
        public ActionResult<GetEmployeeDto> GetRecord(int id)
        {
            using (var context = new IMOSContext())
            {
                var recordInDb = _dbContext.Employees
                  .Where(item => item.EmployeeId == id)
                  .Include(item => item.Documents)
                  .Select(item => new GetEmployeeDto()
                  {
                      EmployeeId = item.EmployeeId,
                      Name = item.Name,
                      Email = item.Email,
                      ContactNumber = item.Contactnumber

                  }).OrderBy(item => item.Name).First();
                if (recordInDb == null)
                {
                    return NotFound();
                }
                return recordInDb;
            }
        }


        [HttpPost("AddEmployee")]
        public IActionResult AddEmployee(AddEmployeeDto model)
        {
            var message = "";
            if (!ModelState.IsValid)
            {
                message = "Something went wrong on your side.";
                return BadRequest(new { message });
            }
            using (var _dbContext = new IMOSContext())
            {

                var newEmployee = new Employee()
                {
                    Name = model.Name,
                    Email = model.Email,
                    Contactnumber = model.ContactNumber
                };
                _dbContext.Employees.Add(newEmployee);
                _dbContext.SaveChanges();

                var document = new Document()
                {
                    EmployeeId = newEmployee.EmployeeId,
                    FileUrl = model.FilePath
                };

                _dbContext.Documents.Add(document);
                _dbContext.SaveChanges();
                return Ok();
            }
        }

        [HttpPut("UpdateEmployee/{Id}")]
        public void Update([FromBody] Employee employee, [FromRoute] int Id)
        {
            using (var context = new IMOSContext())
            {
                var emp = context.Employees.Where(emp => emp.EmployeeId == Id).ToList().FirstOrDefault(); ;
                //emp.DocumentId = employee.DocumentId;
                emp.Contactnumber = employee.Contactnumber;
                emp.Name = employee.Name;
                emp.Email = employee.Email;
                emp = employee;
                context.SaveChanges();
            }
        }



        [HttpPost("AddMultiple")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult<List<GetEmployeeDto>>> AddMutipleEmployeesInCSV([FromBody] UploadEmployeeInCSVDto model)
        {
            var message = "";
            if (ModelState.IsValid)
            {
                var lines = await System.IO.File.ReadAllLinesAsync(@model.FileUrl);

                var employees = new List<AddIndividualEmployeeDto>();

                foreach (var line in lines.Skip(2))
                {
                    var rowItems = line.Split(';');//Dont input csv empty rows
                    if (rowItems[(uint)EmployeeRecordInCSV.Name].Length > 1)
                    {
                        var tempEmploye = new AddIndividualEmployeeDto()
                        {
                            Name = rowItems[(uint)EmployeeRecordInCSV.Name],
                            Email = rowItems[(uint)EmployeeRecordInCSV.Email],
                            ContactNumber = "0" + rowItems[(uint)EmployeeRecordInCSV.ContactNumber]
                        };

                        employees.Add(tempEmploye);

                        foreach (var employeeDto in employees)
                        {
                            var newEmployee = new Employee
                            {
                                Name=employeeDto.Name,
                                Email=employeeDto.Email,
                                Contactnumber=employeeDto.ContactNumber
                            };
                            await _dbContext.Employees.AddAsync(newEmployee);
                            await _dbContext.SaveChangesAsync();

                        }

                    }
                }
            }
            message = "Something went wrong on your side.";
            return BadRequest(new { message });

        }


        [HttpDelete("DeleteEmployee/{id}")]
        public async Task<ActionResult<Employee>> Delete(int id)
        {
            var recordInDb = await _dbContext.Employees.FindAsync(id);
            if (recordInDb == null)
            {
                return NotFound();
            }

            var employeeUsers = _dbContext.Users.Where(item => item.EmployeeId == id);
            _dbContext.Users.RemoveRange(employeeUsers);
            await _dbContext.SaveChangesAsync();

            var employeeDocuments = _dbContext.Documents.Where(item => item.EmployeeId == id);
            _dbContext.Documents.RemoveRange(employeeDocuments);
            await _dbContext.SaveChangesAsync();

            _dbContext.Employees.Remove(recordInDb);
            await _dbContext.SaveChangesAsync();
            return Ok();

        }


        public enum EmployeeRecordInCSV
        {
            Name,
            Email,
            ContactNumber,
        }
    }
}

    







       
    


