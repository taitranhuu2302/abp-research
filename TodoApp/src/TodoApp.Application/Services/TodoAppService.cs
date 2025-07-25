using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoApp.DTOs;
using TodoApp.Entities;
using TodoApp.Interfaces;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace TodoApp.Services;

public class TodoAppService : TodoAppAppService, ITodoAppService
{
	private readonly IRepository<TodoItem, Guid> _todoItemRepository;

	public TodoAppService(IRepository<TodoItem, Guid> todoItemRepository)
	{
		_todoItemRepository = todoItemRepository;
	}

	public async Task<List<TodoItemDto>> GetListAsync()
	{
		var todoItems = await _todoItemRepository.GetListAsync();
		return ObjectMapper.Map<List<TodoItem>, List<TodoItemDto>>(todoItems);
	}

	public async Task<TodoItemDto> CreateAsync(CreateTodoItemDto input)
	{
		var todoItem = new TodoItem
		{
			Text = input.Text
		};

		await _todoItemRepository.InsertAsync(todoItem);

		return ObjectMapper.Map<TodoItem, TodoItemDto>(todoItem);
	}

	public async Task DeleteAsync(Guid id)
	{
		if (await _todoItemRepository.FindAsync(id) == null)
		{
			throw new Exception(L["TodoItem:NotFound", id]);
		}

		await _todoItemRepository.DeleteAsync(id);
	}
}