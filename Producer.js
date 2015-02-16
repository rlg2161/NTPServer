var net = require('net');
var PORT = 10000;
var HOST = '0.0.0.0';

var producer = net.createServer(function (socket){

  var deleteList = [];
  var connectionTimes = {};
  var iIDArray = []


  // Handle incoming messages
  socket.on('data', function(data){
    var type = data.toString().slice(0,1);
    if (type == 0){
      //Registration message
      console.log(socket.remoteAddress + ":" + socket.remotePort + " registered");
      connectionTimes[socket.remotePort] = 10;
    }
    else if (type == 1){
      //Keep Alive message
      connectionTimes[socket.remotePort] = connectionTimes[socket.remotePort] + 5;
    }

  });

  // Handle consumer closing
  socket.on('close', function(data){
    console.log(deleteList[0] + " exited");
    clearInterval(iIDArray[0]);
    delete connectionTimes[deleteList[0]];

  })

  // Manage time stamp sending
  iID = setInterval(function(){
    var date = new Date();
    var tempTime = connectionTimes[socket.remotePort] - 1;
    
    if (tempTime == 0){
      // If time remaining on connection == 0; send last message and terminate connection
      timeString = '1' + socket.remotePort + " " + date.toString();
      socket.write(timeString);
      deleteList.push(socket.remotePort);
      socket.end();
    }
    
    else{
      // Else, send normal time message
      var timeString = '0' + socket.remotePort + " " + date.toString();
      socket.write(timeString);
    }
    
    //Decrement time counter
    connectionTimes[socket.remotePort] = tempTime;

  }, 1000);
  iIDArray.push(iID);

});

producer.listen(PORT, HOST, function(){
  console.log('server bound to ' + HOST + ":" + PORT);
});
