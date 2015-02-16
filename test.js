/* Correct output test. To run, redirect output of ManageCustomers.js to 'test.txt' and 
then call test.js <# number customers> */

var fs = require('fs');

var numCustomers = parseInt(process.argv[2]);

if (isNaN(numCustomers)){
  console.log("Usage: test.js <# customers>");
}

else{

  fs.readFile('test.txt', function (err, fileContents){
    if (err) {
      console.log("error occured");
    }
    else {
      var splitFileString = fileContents.toString().split('\n');
      var counterObj = {};
      var kList = [];

      //Get k values and port numbers for customers
      for (var i = 0; i < numCustomers; i++){
        var k = splitFileString[i].split(" ")[0]; // k values
        var kVal = parseInt(k);
        kList.push(kVal);
        var temp = splitFileString[numCustomers + i]; // port values
        counterObj[temp.slice(0,5)] = 0;
      }
      
      // Count messages for each port number
      for (var i = numCustomers; i < splitFileString.length; i++){
        var temp = splitFileString[i].slice(0,5);
        counterObj[temp] = counterObj[temp] + 1;
      }
    
      // Organize and sort number of messages received
      var counterArray = [];
      for (var port in counterObj) {
        counterArray.push(parseInt(counterObj[port]));
      }

      kList.sort(compareNumbers);
      counterArray.sort();

      // Compare expected and actual numbers of messages per K value
      var outString = "All values correct.";
      for (var i = 0; i < kList.length; i++){
        var kVal = kList[i];
        var secs = counterArray[i];

        if (secs == (10 + 5*kVal)){
          console.log("kVal " + kVal + " --> " + secs  + " secs");
        }
        else{
          console.log(kVal + " " + secs);
          outString = "Error! Time values incorrect";
        }
      }
      
    console.log(outString);
    }
  })
}

// Compare numbers for sort()
function compareNumbers(a, b){
  return a - b;
}