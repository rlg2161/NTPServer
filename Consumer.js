
module.exports = function(){
  var net = require('net');

  var serverAddress = '0.0.0.0';
  var serverPort = 10000;
  // Gen k value
  var k = Math.floor(Math.random()*13);
  var iIDArray = []

  console.log(k + " keepAlive's");

  var consumer = net.createConnection(serverPort, serverAddress, function(){
    
    consumer.on('data', function(data){
      var type = data.toString().slice(0,1);
      //console.log(type);
      
      if (type == 0){
        console.log(data.toString().slice(1, data.length));
      }

      else if (type == 1){
        console.log(data.toString().slice(1, data.length));
        clearInterval(iIDArray[0]);
      }
    });
    
  });

  // Sends initial registration message
  var register = '0'
  consumer.write(register);

  //Manage sending of keep alive messages
  var i = 0;
  iID = setInterval(function(){
    
    var keepAlive = '1';  
    // sends k keep alive messages
    if (i < k){
      //console.log("keepAlive sent") 
      consumer.write(keepAlive);
    }
    i++
  }, 5000);
  iIDArray.push(iID);
}
  