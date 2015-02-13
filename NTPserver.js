var EE = require('events').EventEmitter;
var util = require('util');

/*var numCustomers = 1;
if (process.argv[2] != null){
  numCustomers = process.argv[2];
}*/


function producer() {

  this.consumerList = [];

  EE.call(this);

  this.time = function(){
    var date = new Date();
    this.emit('time', date);
  }


  this.registerHandler = function(){
    console.log('someone registered');
    setTimeout(function(){
      producer.pEmitter.removeListener('time', customer1.timeHandler);
    }, 10000);
  }

  this.keepAliveHandler = function(consumerList){
    consumerList[0] = 10;
  }

  
}


function consumer(producer) {

  this.register = function(){
    this.emit('register');
  }

  this.keepAlive = function(){
    this.emit('keepAlive');
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
  producer.pEmitter.time();
  iID = setInterval(function(){
    producer.pEmitter.time();
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

/*beginProcess();
setTimeout(function(){
  console.log("timer reset");
  resetProcess();
}, 5000);
*/

