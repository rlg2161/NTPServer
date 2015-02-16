var dgram = require('dgram');

var Port = 10000;
var Host = '0.0.0.0';

var server = dgram.createSocket('udp4');
var connections = [];
var deleteList = [];
var connectionTimes = {};

//Startup message
server.on('listening', function(){
  var address = server.address();
  console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', function (message, remote){

  var type = message.toString().slice(0,1);
  // if first part of message = 0 --> register the client
    // set some sort of counter/timer to 10
  if (type == 0){
    connections.push(remote.port + " " + remote.address);
    connectionTimes[remote.port] = 10;
  }

  //if the first part of message = 1 --> reset the time counter to 10
  if (type == 1){
    connectionTimes[remote.port] = 10;
  }

});

server.bind(Port);

iID = setInterval(function(){

  deleteList.length = 0;

  for (var i = 0; i < connections.length; i++){
    //Generate message
    var date = new Date();
    var port = connections[i].split(" ")[0];
    var address = connections[i].split(" ")[1];
    var timeBuffer = new Buffer(0 + " " + port + " " + date.toString());
    

    //Find port and decrement timer
    var tempTime = connectionTimes[port] - 1;
    var tempPort = connections[i];

    //Send last time message if time == 0
    if (tempTime == 0){
      deleteList.push(connections[i]);
      
      timeBuffer = new Buffer(1 + " " + port + " " + date.toString());
      server.send(timeBuffer, 0, timeBuffer.length, port, address);
    }
    // Send normal time message and decrememtt timer
    else {
      server.send(timeBuffer, 0, timeBuffer.length, port, address);
      connectionTimes[port] = tempTime;
    }
  }

  for (var j = 0; j<deleteList.length; j++){
    //Delete timed out connection
    var del = connections.indexOf(deleteList[j]);
    delete connectionTimes[deleteList[j].slice(0,5)];
    delete connections[deleteList[j]];
  }    
}, 1000);

