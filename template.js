


var templates = {};

// single message template
templates.addOtherMessage = [
  "<li class='list-group-item message'>",
  "<span class='username'>@<%= sender %>: </span>",
  "<span id = <%= _id %> class='listItem <%= sender %>'><%= msgBody %></span>",
  "</li>"
].join("");


templates.addUserMessage = [
  "<li class='list-group-item message'>",
  "<span class='glyphicon glyphicon-remove-circle'></span>",
  "<span class='username'>@<%= sender %>: </span>",
  "<span id = <%= _id %> class='listItem <%= sender %>'><%= msgBody %></span>",
  "</li>"
].join("");

templates.addUsername = [
  "<h1 class='hello-user'>Hello, @<form class = 'userChangeForm'><input class='userChange' placeholder='<%= username %>'</input></form>!</h1>"


].join("");
