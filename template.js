


var templates = {};

// single message template
templates.addOtherMessage = [
  "<li class='list-group-item message'>",
  "<span class='username'>@<%= sender %>: </span>",
  "<span id = <%= _id %> class='listItem'><%= msgBody %></span>",
  "</li>"
].join("");


templates.addUserMessage = [
  "<li class='list-group-item message userMessage'>",
  "<span class='glyphicon glyphicon-remove-circle hide'></span>",
  "<span class='username'>@<%= sender %>: </span>",
  "<span id = <%= _id %> class='listItem'><%= msgBody %></span>",
  "</li>"
].join("");

templates.addUsername = [
  "<input type = 'text' class='userChange' placeholder='<%= username %>'</input>"
].join("");
