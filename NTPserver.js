var EE = require('events').EventEmitter;
var util = require('util');

/*var numCustomers = 1;
if (process.argv[2] != null){
  numCustomers = process.argv[2];
}*/


function producer() {

  
  EE.call(this);

  this.time = function(){
    var date = new Date();
    this.emit('time', date);
  }


  this.registerHandler = function(cons){
    console.log('someone registered');
    var timeoutID = setTimeout(function(){
      producer.removeListener('time', cons.timeHandler);
      console.log('someone left');
      console.log(producer.listeners('time'));
    }, 10000);
  }

  this.keepAliveHandler = function(cons){
    console.log('someone kept alive');
    producer.removeListener('time', cons.timeHandler);
    producer.on('time', cons.timeHandler);
  }

  
}


function consumer(producer) {

  EE.call(this);

  this.register = function(){
    this.emit('register', this);
  }

  this.keepAlive = function(){
    this.emit('keepAlive', this);
  }

  this.timeHandler = function(date){
    console.log(date);
  }

}

util.inherits(producer, EE);
util.inherits(consumer, EE);

var iID = null;
var tID = null;

function beginProcess(){
  producer.time();
  iID = setInterval(function(){
    producer.time();
  }, 1000);

  tID = setTimeout(function(){
    clearInterval(iID);
  }, 10000);
}

function resetProcess(){
  clearInterval(iID);
  clearTimeout(tID);
  beginProcess();
}

var producer = new producer();
var consumer1 = new consumer(producer);


consumer1.on('register', producer.registerHandler);
producer.on('time', consumer1.timeHandler);

console.log(producer.listeners('time'));

consumer1.register();

producer.time();
iID = setInterval(function(){
  if (producer.listeners('time').length > 0){
    producer.time();
  }
}, 1000);

/*beginProcess();
setTimeout(function(){
  console.log("timer reset");
  resetProcess();
}, 5000);
*/

