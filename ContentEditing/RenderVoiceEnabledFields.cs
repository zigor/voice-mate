namespace Voice.Mate.ContentEditing
{
  using System.Collections.Generic;
  using System.Linq;
  using System.Web.UI;
  using Sitecore;
  using Sitecore.Configuration;
  using Sitecore.Diagnostics;
  using Sitecore.Shell.Applications.ContentEditor.Pipelines.RenderContentEditor;
  using Sitecore.StringExtensions;
  using Sitecore.Web.UI.Sheer;

  /// <summary>
  /// The render voice enabled fields
  /// </summary>
  public class RenderVoiceEnabledFields
  {
    /// <summary>
    /// The voice enabled fields
    /// </summary>
    private static readonly IEnumerable<string> voiceEnabledFields;

    /// <summary>
    /// Initializes the <see cref="RenderVoiceEnabledFields" /> class.
    /// </summary>
    static RenderVoiceEnabledFields()
    {
      voiceEnabledFields = Settings.GetSetting("Voice.Mate.Fields").Split('|');
    }

    /// <summary>
    /// Runs the processor.
    /// </summary>
    /// <param name="args">The arguments.</param>
    public void Process(RenderContentEditorArgs args)
    {
      Assert.ArgumentNotNull(args, "args");

      Context.Page.Page.ClientScript.RegisterClientScriptInclude("voice-mate", "/sitecore modules/shell/voice mate/scripts/voice-mate.min.js");

      args.Parent.PreRender += (s, e) => OnPagePreRender(args);
    }

    /// <summary>
    /// Called when the page pre has render.
    /// </summary>
    /// <param name="args">The arguments.</param>
    private void OnPagePreRender([NotNull]RenderContentEditorArgs args)
    {
      foreach (var section in args.Sections)
      {
        foreach (var field in section.Fields)
        {
          if (voiceEnabledFields.Contains(field.ItemField.Type))
          {
            var script = "enableVoice('{0}');".FormatWith(field.ControlID);
            Context.Page.Page.ClientScript.RegisterClientScriptBlock(typeof(Page), script, "jQuery(function(){{ {0} }});".FormatWith(script), true);

            SheerResponse.Eval(script);
          }
        }
      }
    }
  }
}

