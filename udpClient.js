var dgram = require('dgram');

if (process.argv[2] == null){
  console.log("Usage: udpClient.js <Port #>");
}

else {
  var Port = process.argv[2];
  var Host = '0.0.0.0';
  var k = Math.floor(Math.random()*13);
  console.log(k);

  var client = dgram.createSocket('udp4');

  client.on('message', function(message, remote){
    console.log(process.pid + " " + message.toString());
  });


  client.bind(Port);

  var register = new Buffer("0 ; " + Port);
  client.send(register, 0, register.length, 10000, Host);

  var keepAlive = new Buffer("1 ; " + Port);

  var i = 0;

  iID = setInterval(function(){
    if (i < k){

      client.send(keepAlive, 0, keepAlive.length, 10000, Host);
    }
    else if (i == k){
      clearInterval(iID);
    }
    i++
  }, 5000);

  

  /*for (var i = 0; i < k; i++){
    tID = setTimeout(function(){
      client.send(keepAlive, 0, keepAlive.length, 10000, Host);
    }, 5000);
  }*/
}