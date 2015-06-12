

var templates = {};

// single message template
templates.message = [
  "<li class='list-group-item message'>",
  "span class='username'><%= sender %></span>",
  "<span class='listItem'><span class='timeSent'><%= timeStamp %></span>"
  "<%= listItem %></span>",
  "</li>"
].join("");
