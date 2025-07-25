using System.ComponentModel.DataAnnotations;

namespace TodoApp.DTOs;

public class CreateTodoItemDto
{
    [Required]
    [MaxLength(500)]
    public string Text { get; set; } = string.Empty;
} 