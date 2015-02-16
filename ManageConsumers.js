var createConsumer = require('./Consumer.js');

var numConsumers = process.argv[2];

// Verify cmd line args
if (isNaN(numConsumers)){ 
  console.log("Usage: ManageConsumers.js <# customers>");
}

else {
  // Create n number of customers and exit program 
  // after max running time (70 secs + 1 sec extra)
  for (var i = 0; i<process.argv[2]; i++){
    createConsumer();  
  }
  setTimeout(function(){
    process.exit();
  }, 71000);
}






