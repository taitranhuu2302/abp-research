using System.Collections.Generic;
using AutoMapper;
using TodoApp.DTOs;
using TodoApp.Entities;

namespace TodoApp.Profiles;

public class TodoItemProfile : Profile
{
	public TodoItemProfile()
	{
		CreateMap<TodoItem, TodoItemDto>();
	}
}