  
module.exports = function(port){
  var dgram = require('dgram');
  
  var Port = port;
  var Host = '0.0.0.0';
  var k = Math.floor(Math.random()*13);
  console.log(k + " keepAlive's on port: " + port);

  var client = dgram.createSocket('udp4');

  client.on('message', function(message, remote){
    var type = message.toString().slice(0,1);
    if (type == 0){
      console.log(process.pid + " " + port + ": " + message.toString().slice(2,message.length));
    }
    else if (type == 1){
      //console.log(message.toString());
      client.close();
      clearInterval(iID);
    }
  });

  client.bind(Port);

  var register = new Buffer("0 ");
  client.send(register, 0, register.length, 10000, Host);
  
  var i = 0;

  iID = setInterval(function(){
    
    var keepAlive = new Buffer("1 " + iID);  

    if (i < k){

      client.send(keepAlive, 0, keepAlive.length, 10000, Host);
    }
    i++
  }, 5000);

}