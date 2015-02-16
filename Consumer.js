  
module.exports = function(){
  var dgram = require('dgram');
  
  var Host = '0.0.0.0';
  // Gen k value
  var k = Math.floor(Math.random()*13);
  console.log(k + " keepAlive's");

  var consumer = dgram.createSocket('udp4');

  consumer.on('message', function(message, remote){
    // Log time message --> which if statement depends on 1st char of message
    var type = message.toString().slice(0,1);
    if (type == 0) {
      console.log(message.toString().slice(0,message.length));
    }
    else if (type == 1){
      //Log last message and clear interval and consumer 
      console.log(message.toString().slice(0, message.length));
      clearInterval(iID);
      consumer.close();      
    }
  });

  // Create and send first message to server
  var register = new Buffer("0 ");
  // Since not previously bound, gets assigned a random port number. This port number is the 
  // "thread id" described in problem
  consumer.send(register, 0, register.length, 10000, Host);
  
  //Manage sending of keep alive messages
  var i = 0;
  iID = setInterval(function(){
    
    var keepAlive = new Buffer("1 ");  
    // sends k keep alive messages
    if (i < k){
       
      consumer.send(keepAlive, 0, keepAlive.length, 10000, Host);
    }
    i++
  }, 5000);

}