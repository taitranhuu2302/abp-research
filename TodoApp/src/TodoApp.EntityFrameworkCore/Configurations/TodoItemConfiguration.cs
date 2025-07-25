using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodoApp.Entities;

namespace TodoApp.Configurations;

public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
{
	public void Configure(EntityTypeBuilder<TodoItem> builder)
	{
		builder.HasKey(x => x.Id);

		builder.ToTable("TodoItems");
	}
}