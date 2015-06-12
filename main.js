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
var $userForm = $('#usernameForm')
var $userInput = $('#usernameInput')
var timeStamp = ""



var page = {
  url: "http://tiy-fee-rest.herokuapp.com/collections/YouveGotMail",
  init: function () {
    page.initStyling();
    page.initEvents();
  },
  initStyling: function(){
    page.loadMessages();
  },
  initEvents: function() {
    $('.pageWrapper').on('submit', $loginOverlay, page.hideOverlay );
    $messageForm.submit(page.newmessage);
    $userForm.submit(page.addUser);
  },
  addNewMessageToDOM: function (msg) {
    page.loadTemplate("message", msg, $list);
  },
  addAllMessagesToDOM: function (msgCollection) {
    $('target').html('');
    _.each(msgCollection, page.addNewMessageToDOM);
  },
  addUser: function (event) {
    event.preventDefault();
    var newUser = {
    user: $userInput.val(),
    }
    $.ajax({
      url: page.url,
      method: 'POST',
      data: {username: newUser.user},
      success: function (data) {

      },
      error: function (err) {
      }
    });
  },
  newmessage: function(event) {
    event.preventDefault();
    // build an object that looks like our original data
    var newUser = {
    user: $addInput.val()
    // sender:
    }
    page.createMessage(newMessage);
    // clear form
    $addInput.val("");
  },
  hideOverlay: function(event) {
    event.preventDefault;
    $loginOverlay.addClass('hide');
  },
  createMessage: function (newMessage) {
    $.ajax({
      url: page.url,
      method: 'POST',
      data: newMessage,
      success: function (data) {
        page.addNewMessageToDOM(data);
      },
      error: function (err) {
      }
    });
  },
  loadMessages: function () {
    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        page.addAllMessagesToDOM(data);
      },
      error: function (err) {
      }
    });
  },
  loadTemplate: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTemplate(tmplName));

    $target.append(compiledTmpl(data));
  },
  getTemplate: function (name) {
    return templates[name];
  }
}
