/* Correct output test. To run, redirect output of ManageConsumers.js to 'test.txt' and 
then call test.js <# number consumers> */

var fs = require('fs');

var numConsumers = parseInt(process.argv[2]);

if (isNaN(numConsumers)){
  console.log("Usage: test.js <# consumers>");
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

      //Get k values and port numbers for consumers
      for (var i = 0; i < numConsumers; i++){
        var k = splitFileString[i].split(" ")[0]; // k values
        var kVal = parseInt(k);
        kList.push(kVal);
        var temp = splitFileString[numConsumers + i]; // port values
        counterObj[temp.slice(2,7)] = 0;
      }
      
      // Count messages for each port number
      for (var i = numConsumers; i < splitFileString.length; i++){
        var temp = splitFileString[i].slice(2,7);
        counterObj[temp] = counterObj[temp] + 1;
      }
    
      // Organize and sort number of messages received
      var counterArray = [];
      for (var port in counterObj) {
        counterArray.push(parseInt(counterObj[port]));
      }

      kList.sort(compareNumbers);
      counterArray.sort();

      //console.log(kList);
      //console.log(counterArray);

      // Compare expected and actual numbers of messages per K value
      var outString = "All values correct.";
      for (var i = 0; i < kList.length; i++){
        var kVal = kList[i];
        var secs = counterArray[i];

        if (secs == (10 + 5*kVal)) {
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