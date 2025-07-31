using Volo.Abp.Settings;

namespace Architecture.Settings;

public class ArchitectureSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(ArchitectureSettings.MySetting1));
    }
}
