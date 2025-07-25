using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoApp.DTOs;
using Volo.Abp.Application.Services;

namespace TodoApp.Interfaces;

public interface ITodoAppService : IApplicationService
{
	Task<List<TodoItemDto>> GetListAsync();
	Task<TodoItemDto> CreateAsync(CreateTodoItemDto input);
	Task DeleteAsync(Guid id);
}