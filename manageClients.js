var createClient = require('./udpClient.js');
//var createServer = require('./udpServer.js');

//createServer();

var numClients = process.argv[2];
for (var i = 0; i < numClients; i++){
  createClient(10001+i);
}