/*!
 * Copyright 2012, Igor Zhukovskyi 
 * Voice Mate
 * Released under the MIT Licenses.
 */
if (document.createElement("input").webkitSpeech !== undefined) {
  if (typeof ($telerik) !== "undefined") {
    $telerik.$(".voice-mate").replaceWith("<input class='voice-mate voice-mate-recoder' x-webkit-speech='' speech='' onspeechchange='voicematePasteHtml' onwebkitspeechchange='voicematePasteHtml()' val='' id='reader' type='text' />");

    $telerik.$(".voice-mate")
      .attr('lang', scLanguage)
      .click(function (e) {
        e.stopImmediatePropagation();
      });

    $telerik.$("<link href='/sitecore modules/shell/voice mate/styles/voice-mate.min.css' rel='stylesheet'>").appendTo("form");
    
    function voicematePasteHtml() {
      var voice = $telerik.$('.voice-mate');
      var rad = $telerik.radControls[2];
      rad.pasteHtml(voice.val());
      rad.collapse(false);
      rad.select();
      voice.val('');
    }
  } 
}