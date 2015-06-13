


var templates = {};

// single message template
templates.addUserMessage = [
  "<li class='list-group-item message'>",
  "<a href=#><span class='glyphicon glyphicon-remove-circle'></span></a>",
  "<span class='username'>@<%= sender %>: </span>",
  "<span class='listItem'><%= msgBody %></span>",
  "</li>"
].join("");

templates.addOtherMessages = [
  "<li class='list-group-item message'>",
  "<span class='username'>@<%= sender %>: </span>",
  "<span class='listItem'><%= msgBody %></span>",
  "</li>"
].join("");
