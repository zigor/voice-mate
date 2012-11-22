/*!
 * Copyright 2012, Igor Zhukovskyi 
 * Voice Mate
 * Released under the MIT Licenses.
 */
jQuery("<link href='/sitecore modules/shell/voice mate/styles/voice-mate.min.css' rel='stylesheet'>").appendTo("form");

function enableVoice(id) {
  if (document.createElement("input").webkitSpeech !== undefined) {
    var element = jQuery('#' + id);
      
    var mate = jQuery("<input class='voice-mate voice-mate-recoder ce-voice-mate' x-webkit-speech='' speech='' val='' type='text' onspeechchange='voicematePasteText(this)' onwebkitspeechchange='voicematePasteText(this)' />");
    mate.insertBefore(element.parent());
    mate.attr('lang', jQuery('#scLanguage').val())
       .data('data-input', element.attr('id'));
  }
}

function voicematePasteText(voice) {
  var mate = jQuery(voice);
  var input = jQuery('#' + mate.data('data-input'));
  var value = input.val();
  if (value.length > 0 && value[value.length - 1]) {
    value += " ";
  }
  input.val(value + mate.val());
  mate.val('');
};


