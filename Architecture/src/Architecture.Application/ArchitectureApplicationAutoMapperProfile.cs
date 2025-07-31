using AutoMapper;
using Architecture.Books;

namespace Architecture;

public class ArchitectureApplicationAutoMapperProfile : Profile
{
    public ArchitectureApplicationAutoMapperProfile()
    {
        CreateMap<Book, BookDto>();
        CreateMap<CreateUpdateBookDto, Book>();
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
    }
}
