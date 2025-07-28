using AutoMapper;
using ModularCrm.Books;

namespace ModularCrm;

public class ModularCrmApplicationAutoMapperProfile : Profile
{
    public ModularCrmApplicationAutoMapperProfile()
    {
        CreateMap<Book, BookDto>();
        CreateMap<CreateUpdateBookDto, Book>();
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
    }
}
