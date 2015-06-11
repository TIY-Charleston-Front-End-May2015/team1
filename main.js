$(document).ready(function(){
  page.init();
})
// variables
var $list = $('.list-group');
var $li = $('.message');
var $messageForm = $('.messageForm')
var $addInput = $('.messageInput')
var $loginOverlay = $('.fullscreen')
var $usernameInput = $('.usernameInput')
var listTemplateString = "<li class='list-group-item message'><span class='listItem'><%= listItem %></span></li>";


var page = {
  url: "http://tiy-fee-rest.herokuapp.com/collections/nl",
  init: function () {
    page.initStyling();
    page.initEvents();
  },
  initStyling: function(){
  //load to-do's
  },
  initEvents: function() {
    $usernameInput.submit(page.hideOverlay);
    $messageForm.submit(page.newmessage);
  },
  newmessage: function(event) {
    event.preventDefault();
    var compiledTemplate = _.template(listTemplateString);
    var result = compiledTemplate({
      listItem: $addInput.val()
    });
    $list.append(result);
    $addInput.val("");
  },
  hideOverlay: function(event) {
    $loginOverlay.addClass('hide');
  }
}

  //ajax goes here
