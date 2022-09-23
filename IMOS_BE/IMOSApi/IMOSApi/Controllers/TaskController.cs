
using IMOSApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Http;
using IMOSApi.Dtos.Client;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Dynamic;
using IMOSApi.Dtos.Task;
using System.Threading.Tasks;

namespace IMOSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IMOSContext _dbContext;
        public TaskController(IMOSContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("GetAllTasks")]
        public ActionResult<IEnumerable<GetTaskDto>> GetAllTasks()
        {
            var recordInDb = _dbContext.Tasks
                .Include(item => item.TasktypeNavigation)
                .Select(item => new GetTaskDto()
                {
                    Description = item.Description,
                    Startdate = item.Startdate.ToString("g"),
                    Enddate = item.Enddate.ToString("g"),
                    TasktypeDescription = item.TasktypeNavigation.Description,

                }).OrderBy(item => item.Description).ToList();
            return recordInDb;

        }



        [HttpGet("GetTaskBYProject/{id}")]
        public List<Models.Task> GetTaskBYProject(int id)
        {
            var recordInDb = _dbContext.Tasks
                .Where(item => item.ProjectId == id).ToList();
          

            return recordInDb;

        }




        [HttpPost("AddTask/{Id}")]

        public async Task<ActionResult<Models.Task>> AddTask([FromBody] AddOrUpdateTaskDto model, int Id)
        {
            var message = "";
            var recordInDb = await _dbContext.Projects.FindAsync(Id);
            if (recordInDb == null)
            {
                return NotFound();
            }

            else if (ModelState.IsValid)

            {
                try
                {
                    var newRecord = new Models.Task()
                    {
                        Description = model.Description,
                        Startdate = model.Startdate,
                        Enddate = model.Enddate,
                        TaskTypeId = model.TasktypeId,
                        ProjectId = Id,
                        Qnapassed = 1
                    };


                    _dbContext.Tasks.Add(newRecord);

                }
                catch (Exception e)
                {
                    Console.WriteLine(e.InnerException.Message);
                    return BadRequest(e.Message);
                }

                _dbContext.SaveChanges();
                return Ok();
            }
            

            message = "Something went wrong on your side.";
            return BadRequest(new { message });
        }





        [HttpPut("UpdateTask/{Id}")]
        public IActionResult UpdateTask(AddOrUpdateTaskDto model, int Id)
        {
            if (ModelState.IsValid)
            {
                var recordInDb = _dbContext.Tasks.FirstOrDefault(item => item.TaskId == Id);

                if (recordInDb == null)
                {
                    return NotFound();
                }


                recordInDb.Startdate = model.Startdate;
                recordInDb.Enddate = model.Enddate;
                recordInDb.Description = model.Description;
                recordInDb.TaskTypeId = model.TasktypeId;

                _dbContext.SaveChanges();
                return Ok();

            }

            var message = "Something went wrong on your side.";
            return BadRequest(new { message });

        }



        [HttpDelete("DeleteTask/{Id}")]

        public async Task<ActionResult<Models.Task>> DeleteTask(int Id)
        {
            var recordInDb = await _dbContext.Tasks.FindAsync(Id);

            if (recordInDb == null)
            {
                return NotFound();
            }

            _dbContext.Tasks.Remove(recordInDb);
            await _dbContext.SaveChangesAsync();

            return Ok();

        }



        [HttpGet("GetAllTaskTypes")]
        public ActionResult<IEnumerable<GetTaskTypeDto>> GetAllTaskTypes()
        {
            var recordInDb = _dbContext.Tasktypes
                .Select(item => new GetTaskTypeDto()
                {
                    Description = item.Description,
                }).ToList();

            return recordInDb;
        }


        [HttpPost("AddTaskType")]
        public IActionResult AddRequestStatus(AddOrUpdateTaskType model)
        {
            var message = "";

            if (ModelState.IsValid)
            {
                var recordInDb = _dbContext.Tasktypes
                    .FirstOrDefault(item => item.Description.ToLower() == model.Description.ToLower());

                if (recordInDb != null)
                {
                    message = "Record already exist";
                    return BadRequest(new { message });
                }

                var NewRecord = new Tasktype()
                {
                    Description = model.Description,
                };

                _dbContext.Tasktypes.Add(NewRecord);
                _dbContext.SaveChanges();
                return Ok();


            }

            message = "Something went wrong on your side.";
            return BadRequest(new { message });


        }

            [HttpPut("UpdateTaskType/{Id}")]
            public IActionResult UpdateTaskType(AddOrUpdateTaskType model, int Id)
            {
                if (ModelState.IsValid)
                {

                    var recordInDb = _dbContext.Tasktypes
                        .FirstOrDefault(item => item.TasktypeId == Id);

                    if (recordInDb == null)
                    {
                        return NotFound();
                    }

                    recordInDb.Description = model.Description;

                    _dbContext.SaveChanges();
                    return Ok();

                }
                var message = "Something went wrong on your side.";
                return BadRequest(new { message });

            }



        [HttpDelete("DeleteTaskType/{Id}")]
        public async Task<ActionResult<Tasktype>> DeleteTaskType(int Id)
        {
            var recordInDb = await _dbContext.Tasktypes.FindAsync(Id);

            if (recordInDb == null)
            {
                return NotFound();
            }

            _dbContext.Tasktypes.Remove(recordInDb);
            await _dbContext.SaveChangesAsync();

            return Ok();

        }


    }
    } 

