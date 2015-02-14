var EE = require('events').EventEmitter;
var util = require('util');


function Producer() {
  
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


function Consumer(k, n) {

  //EE.call(this);
  this.repeat = k;
  this.ID = n;
  this.timeoutID = null;

  this.register = function(){
    this.emit('register', this);
  }

  this.keepAlive = function(){
    this.emit('keepAlive', this);
    
  }

  this.timeHandler = function(date){
    console.log(n + ": " + date);
  }

}

util.inherits(Producer, EE);
util.inherits(Consumer, EE);

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


function createConsumer(producer){

  var k = Math.floor(Math.random()*13)
  var num = count;
  
  //var consumer = new consumer(k);
  var consumer = new Consumer(k, num);
  console.log("Consumer ID: " + consumer.ID + "  Number keepAlive messages: " + consumer.repeat);
  //console.log(consumer.repeat);
  consumer.on('register', producer.registerHandler);
  consumer.on('keepAlive', producer.keepAliveHandler);
  producer.on('time', consumer.timeHandler);

  consumer.register();

  var i = 0;
  var numIter = consumer.repeat;

  iID = setInterval(function(){
    if (i < numIter){
      consumer.keepAlive();
    }
    i++;
  }, 5000);

  return iID;

}

var count = 1;
var numCustomers = process.argv[2];

if (numCustomers == 0)
  console.log("No customers - program exiting");

else{

  var producer = new Producer();

  var consumerIntervalArray = [];

  for (var i = 0; i<numCustomers; i++){
    var id = createConsumer(producer);
    consumerIntervalArray.push(id);
    count++;
  }
   

  producer.time();
  piID = setInterval(function(){
    if (producer.listeners('time').length > 0){
      producer.time();
    }
    else {
      //console.log("No more time listeners");
      producer.removeAllListeners();
      clearInterval(piID);
      for (var j = 0; j< consumerIntervalArray.length; j++){
        clearInterval(consumerIntervalArray[j]);  
      }
      
    }
  }, 1000);
}
