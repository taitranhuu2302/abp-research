using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TodoApp.DTOs;
using TodoApp.Interfaces;

namespace TodoApp.Controllers;

[ApiController]
[Route("api/todo-items")]
public class TodoItemController : TodoAppController
{
	private readonly ITodoAppService _todoAppService;

	public TodoItemController(ITodoAppService todoAppService)
	{
		_todoAppService = todoAppService;
	}

	[HttpGet]
	public async Task<List<TodoItemDto>> GetListAsync()
	{
		return await _todoAppService.GetListAsync();
	}

	[HttpPost]
	public async Task<TodoItemDto> CreateAsync(CreateTodoItemDto input)
	{
		var result = await _todoAppService.CreateAsync(input);

		// Log localized message
		Logger.LogInformation(L["TodoItem:Created"]);

		return result;
	}

	[HttpDelete("{id}")]
	public async Task DeleteAsync(Guid id)
	{
		await _todoAppService.DeleteAsync(id);

		// Log localized message with parameter
		Logger.LogInformation(L["TodoItem:Deleted"]);
	}

	[HttpGet("list-title")]
	public string GetListTitle()
	{
		// Example of returning localized string
		return L["TodoItem:List"];
	}
}