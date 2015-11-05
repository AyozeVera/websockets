var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('app'));

var messages = [{
  userId:1,
  messageId:10,
  userName:"Asha Greyjoy",
  content:{
    text:"The stone tree of the Stonetrees.",
    link:"http://awoiaf.westeros.org/index.php/House_Stonetree"
  },
  likedBy:[1],
  ts:Date.now() - 10000
},{
  userId:2,
  messageId:11,
  userName:"Arya Stark",
  content:{
    text:"We'll come see this inn.",
    link:"http://gameofthrones.wikia.com/wiki/Inn_at_the_Crossroads"
  },
  likedBy:[2,3],
  ts:Date.now() - 100000
},{
  userId:3,
  messageId:14,
  userName:"Cersei Lannister",
  content:{
    text:"Her scheming forced this on me.",
    link:"http://gameofthrones.wikia.com/wiki/Margaery_Tyrell"
  },
  likedBy:[],
  ts:Date.now() - 1000000
}];

io.on('connection', function(socket){
  console.log("Something connected to socket.io");
  socket.emit("messages", messages);
  socket.on("new-message", function(data){
    messages.push(data);
    io.sockets.emit("messages", messages);  
  })
})

server.listen(8080);
