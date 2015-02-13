var EE = require('events').EventEmitter;
var util = require('util');
var childProcess = require('child_process');


function producer() {
  
  EE.call(this);

  this.time = function(){
    var date = new Date();
    this.emit('time', date);
  }


  this.registerHandler = function(cons){
    //console.log('someone registered');
    cons.timeoutID = setTimeout(function(){
      producer.removeListener('time', cons.timeHandler);
      //console.log('someone left');
      //console.log(producer.listeners('time'));
    }, 10000);

  }

  this.keepAliveHandler = function(cons){
    clearTimeout(cons.timeoutID)
    cons.timeoutID = setTimeout(function(){
      producer.removeListener('time', cons.timeHandler);
      //console.log('someone left');
      //console.log(producer.listeners('time'));
    }, 10000)
  }
}


function consumer(n) {

  //EE.call(this);
  this.name = n;
  this.timeoutID = null;

  this.register = function(){
    this.emit('register', this);
  }

  this.keepAlive = function(){
    this.emit('keepAlive', this);
    
  }

  this.timeHandler = function(date){
    console.log(process.pid + ": " + date);
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


function main(){

  var numCustomers = process.argv[2];

  if (numCustomers == 0)
    console.log("No customers - program exiting");

  else{

    var producer = new producer();


  }

}
var producer = new producer();
var consumer1 = new consumer(1);
var consumer2 = new consumer(2);


consumer1.on('register', producer.registerHandler);
consumer1.on('keepAlive', producer.keepAliveHandler);
producer.on('time', consumer1.timeHandler);

consumer2.on('register', producer.registerHandler);
consumer2.on('keepAlive', producer.keepAliveHandler);
producer.on('time', consumer2.timeHandler);


//console.log(producer.listeners('time'));

consumer1.register();
consumer2.register();

var i = 0;
numIter = 1;
iID = setInterval(function(){
  
  if (i < numIter){
    //console.log(i);
    //console.log(numIter);
    //console.log("Kept Alive");
    consumer1.keepAlive();
  }
  //else{
    //console.log(producer.listeners('time'));
  //}

  i++;
}, 5000);

producer.time();
piID = setInterval(function(){
  if (producer.listeners('time').length > 0){
    producer.time();
  }
  else {
    //console.log("No more time listeners");
    producer.removeAllListeners();
    clearInterval(piID);
    clearInterval(iID);
  }
}, 1000);

