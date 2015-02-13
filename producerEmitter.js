var EE = require('events').EventEmitter;
var util = require('util');


function producer() {

  this.consumerList = [];

  this.pEmitter = new producerEmitter();
  this.pListener = new producerListener(this.consumerList);

  
}


function consumer() {

  this.cEmitter = new consumerEmitter();
  this.cListener = new consumerListener(producer);
}


var producerEmitter = function(){
  EE.call(this);

  this.time = function(){
    var date = new Date();
    this.emit('time', date);
  }

};

var producerListener = function(consumerList){

  this.registerHandler = function(consumerList){
    consumerList.append(10);
  }

  this.keepAliveHandler = function(consumerList){
    consumerList[0] = 10;
  }

}

var consumerEmitter = function(){

  this.register = function(){
    this.emit('register');
  }

  this.keepAlive = function(){
    this.emit('keepAlive');
  }
}



var consumerListener = function(){

  this.timeHandler = function(date){
    console.log(date);
  }
}

util.inherits(producerEmitter, EE);
util.inherits(consumerEmitter, EE);

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
var consumer = new consumer(producer)

producer.pEmitter.on('time', consumer.cListener.timeHandler);
//consumer.on('register', producer.)

beginProcess();
setTimeout(function(){
  console.log("timer reset");
  resetProcess();
}, 5000);


