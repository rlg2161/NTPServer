
var util = require('util')
var EventEmitter = require('events').EventEmitter;

var producer = function(consumer){

  var self = this;

  setTimeout(function(){
    self.emit('open', consumer);
  }, 0);

  setTimeout(function(){
    self.emit('close', consumer)
  }, 10000);


  setInterval(function(){
    self.emit('time', consumer);
  }, 1000)

  this.on('newListener', function(listener){
    console.log('Event Listener: ' + listener);
  });
}

util.inherits(producer, EventEmitter);

module.exports = producer;



/*var consumer = new EventEmitter();  // ---> Logs the time every second

consumer.on('sendTime', function(){
  date = new Date();
  console.log(date);
})

setInterval(function (){
  consumer.emit('sendTime');
}, 1000);
*/

















/*function Producer(numConsumers){

  this.producers = 
}



function Consumer(){

}

Consumer.prototype.register = function(){

}

Consumer.prototype.keepAlive = function(){

}

Consumer.prototype.logMessage = function(message){
  
  var thread = 
  console.log(message)

}*/