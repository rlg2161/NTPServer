  
  var dgram = require('dgram');

  var Port = 10000;
  var Host = '0.0.0.0';

  var server = dgram.createSocket('udp4');
  var connections = [];
  var connectionTimes = {};

  server.on('listening', function(){
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ':' + address.port);
  });

  server.on('message', function (message, remote){
    
    var type = message.toString().slice(0,1);
    //console.log(remote.address + ":" + remote.port + " - " + message);

    var type = message.toString().slice(0,1);
    //console.log(type);
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
    //console.log(connectionTimes);
    var date = new Date();
    var timeBuffer = new Buffer(0 + " " + date.toString());
    for (var i = 0; i < connections.length; i++){
      var port = connections[i].split(" ")[0];
      var address = connections[i].split(" ")[1];
      server.send(timeBuffer, 0, timeBuffer.length, port, address);
      var tempTime = connectionTimes[port] - 1;
      var tempPort = connections[i];
      if (tempTime == 0){
        //console.log(connectionTimes[port]);
        delete connectionTimes[port];
        connections = connections.filter(function(elem){
          return elem !== tempPort;
        });
        var closeMsgBuffer = new Buffer(1 + " time to close");
        server.send(closeMsgBuffer, 0, closeMsgBuffer.length, port, address);
      }
      else {
        connectionTimes[port] = tempTime;
      }


    }    
  }, 1000);

