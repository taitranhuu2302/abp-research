using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace TodoApp.Entities;

public class TodoItem : AuditedAggregateRoot<Guid>
{
	public string Text { get; set; } = string.Empty;
}