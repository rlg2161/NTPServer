var createCustomer = require('./Customer.js');

var numCustomers = process.argv[2];

if (isNaN(numCustomers)){
  console.log("Usage: ManageCustomers.js <# customers>");
}

else {
  for (var i = 0; i<process.argv[2]; i++){
    createCustomer();  
  }
  setTimeout(function(){
    process.exit();
  }, 71000);
}






