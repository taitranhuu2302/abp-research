﻿using System;

namespace TodoApp.DTOs;

public class TodoItemDto
{
	public Guid Id { get; set; }
	public string Text { get; set; } = string.Empty;
}