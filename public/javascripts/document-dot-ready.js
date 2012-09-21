$(document).ready(function () { 
  // prepopulate fields with last used values
  if (typeof(Storage) !== "undefined" && localStorage && localStorage.ircOptions) {
    var opts = JSON.parse(localStorage.ircOptions);
    for(option in opts) {
      $('#' + option).val(opts[option]);
    }
  }
  $('#connect').click(function() {
    $.nirc();
  });
});
