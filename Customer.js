  
module.exports = function(){
  var dgram = require('dgram');
  
  var Host = '0.0.0.0';
  var k = 2;//Math.floor(Math.random()*13);
  console.log(k + " keepAlive's");

  var client = dgram.createSocket('udp4');

  client.on('message', function(message, remote){
    var type = message.toString().slice(0,1);
    if (type == 0){
      //var splitMsg = message.split(" ");
      //console.log(message.toString());
      //console.log(remote.toString());
      console.log(message.toString().slice(2,message.length));
    }
    else if (type == 1){
      //console.log(message.toString().slice(2, message.length));
      clearInterval(iID);
      client.close();
      
    }
  });

  var register = new Buffer("0 ");
  client.send(register, 0, register.length, 10000, Host);
  
  var i = 0;

  iID = setInterval(function(){
    
    var keepAlive = new Buffer("1 " /*+ iID*/);  

    if (i < k){

      client.send(keepAlive, 0, keepAlive.length, 10000, Host);
    }
    i++
  }, 5000);

}