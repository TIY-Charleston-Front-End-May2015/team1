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
var currentContent = [];
var $userChangeForm = $('.userChangeForm')



$(document).ready(function(){
  page.init();


  $('.fullscreen').on('submit', $('#usernameInput'), function (){
    setInterval(function (){
      $.ajax({
        url: page.url,
        method: 'GET',
        success: function (data) {
          var updatedContent = data;
          updatedContent = _.filter(data, function(obj){ return !_.findWhere(currentContent, obj); });
          console.log(updatedContent)
          page.addAllMessagesToDOM(updatedContent)
          page.getAllContent();
          $(".scrollFix").prop({ scrollTop: $(".scrollFix").prop("scrollHeight") });



        },
        error: function (err) {
          console.log('error')
        }
      })
    }, 600)
  });
})


var page = {
  url: "http://tiy-fee-rest.herokuapp.com/collections/ChaatAapp",
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
    $('ul').on('click', '.glyphicon', page.deleteMessage);
    $userChangeForm.submit(page.updateUser);
    page.showDeleteBtn();
  },
  addUsernameToDOM: function (user) {

    page.loadTemplate("addUsername", user, $('.userChangeForm'));
  },
  addNewMessageToDOM: function (msg) {
    if (msg.hasOwnProperty('msgBody') && msg.sender === user) {
      page.loadTemplate("addUserMessage", msg, $list);
    }
    else if (msg.hasOwnProperty('msgBody') && msg.sender !== user) {
      page.loadTemplate("addOtherMessage", msg, $list);
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
        page.addUsernameToDOM(data);
      },
      error: function (err) {
      }
    });

    page.loadMessages();


  },
  updateUser: function () {
    event.preventDefault();

    var newUser = {
      username: $('.userChange').val(),
    };


    user = "";
    user = newUser.username;
    $('.userChangeForm').html("");
    page.addUsernameToDOM(newUser);


  },
  newmessage: function(event) {
    event.preventDefault();
    var newMessage = {
      msgBody: $addInput.val(),
      sender: user

    }
    page.createMessage(newMessage);
    $addInput.val("");
  },
  hideOverlay: function(event) {
    event.preventDefault;
    $loginOverlay.addClass('ignore');
  },
  createMessage: function (newMessage) {

    $.ajax({
      url: page.url,
      method: 'POST',
      data: newMessage,
      success: function (data) {
        page.addNewMessageToDOM;
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
        page.addAllMessagesToDOM(data.reverse());
        currentContent = data;

      },
      error: function (err) {
      }
    });
  },
  showDeleteBtn: function (){
    $('ul').on('click', $('.userMessage'), function(){
      $('.glyphicon').toggleClass('hide')
    })
  },

  deleteMessage: function () {
    event.preventDefault();
    var msgId = $(this).next().next().attr('id').toString();
    var removeThis = $(this).parent();
    console.log(msgId);
    $.ajax({
      url: page.url + '/' + msgId,
      method: 'DELETE',
      success: function (data) {
        removeThis.remove();
      },


      error: function (err) {
      }
    });


  },
  getAllContent: function () {
  $.ajax({
    url: page.url,
    method: 'GET',
    success: function (data) {
      currentContent = data;
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
