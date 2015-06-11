$(document).ready(function () {
  page.init();
});

var page = {

  url: "http://tiy-fee-rest.herokuapp.com/collections/team1",
  init: function () {
    page.initStyling();
    page.initEvents();
  },

  initStyling: function () {
    page.loadMessages();
  },

  initEvents: function () {

  setInterval(function () {
    page.loadMessages();
  }, 1000);

  $('.').on('click', page.addMessage);
  $('.').on('click', '.', page.addUser);

  addNewMessageToDOM: function (msg) {
    page.loadTemplate("msgTemplate", msg, $target);
  },
  addAllMessagesToDOM: function (msgCollection) {
    $('target').html('');
    _.each(msgCollection, page.addNewMessageToDOM);
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
  createMessage: function (newMessage) {
    $.ajax({
      url: page.url,
      method: 'POST',
      data: newMessage,
      success: function (data) {
        page.addOneMessageToDOM(data);
      },
      error: function (err) {
      }
    });
  },
  deleteMsg: function(e) {
    e.preventDefault();

    })
  },
  addMessage: function (event) {
    event.preventDefault();

    // build an object that looks like our original data
    var newMessage = {
    sender:
    timestamp:
    id:
    msgBody: $('input[name=""]').val(),
  }
    page.createMessage(newMessage);
    // clear form
    $('input, textarea').val("");
  },

  loadTemplate: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTemplate(tmplName));

    $target.append(compiledTmpl(data));
  },
  getTemplate: function (name) {
    return templates[name];
  }
};
