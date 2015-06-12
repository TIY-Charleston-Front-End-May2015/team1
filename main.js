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
var user = "";

var page = {
  url: "http://tiy-fee-rest.herokuapp.com/collections/YouveGotMail15",
  init: function () {
    page.initStyling();
    page.initEvents();
  },
  initStyling: function(){

  },
  initEvents: function() {
    $('.pageWrapper').on('submit', $loginOverlay, page.hideOverlay );
    $messageForm.submit(page.newmessage);
    $userForm.submit(page.addUser);
  setInterval(page.addAllMessagesToDOM(), 2000)
  },

  addNewMessageToDOM: function (msg) {
    if (msg.hasOwnProperty('msgBody')) {
      page.loadTemplate("message", msg, $list);
    }

  },
  addAllMessagesToDOM: function (msgCollection) {
    // $('target').html('');
    _.each(msgCollection, page.addNewMessageToDOM);
  },
  addUser: function (event) {
    user = "";
    event.preventDefault();
    var newUser = {
    sender: $userInput.val()
    }
    $.ajax({
      url: page.url,
      method: 'POST',
      data: {username: newUser.sender},
      success: function (data) {
        user += newUser.sender;
      },
      error: function (err) {
      }
    });

   page.loadMessages();
  },
  newmessage: function(event) {
    event.preventDefault();
    var newMessage = {
      msgBody: $addInput.val(),
      sender: user
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

    $target.prepend(compiledTmpl(data));
  },
  getTemplate: function (name) {
    return templates[name];
  }
}
