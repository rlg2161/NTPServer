var EE = require('events').EventEmitter;
var util = require('util');

var producerEmitter = function(){
  EE.call(this);

  this.time = function(){
    var date = new Date();
    this.emit('time', date);
  }

};

util.inherits(producerEmitter, EE);

var consumerListener = function(){

  this.timeHandler = function(date){
    console.log(date);
  }
}

var producer = new producerEmitter();
var consumer = new consumerListener(producer)

producer.on('time', consumer.timeHandler);

setInterval(function(){
  producer.time();
}, 1000);
