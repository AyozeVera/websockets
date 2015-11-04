var socket = io.connect('http://localhost:8000',{'forceNew':true});
socket.on("messages", function(data){
  console.info(data);
})
