Readme for Bottlenose NTP coding project

Upon beginning this project, I was not very familiar with node.js including events and eventEmitters in particular. For help on where to begin, I looked at several tutorials on Google - below were the two I went through:
  http://www.hacksparrow.com/node-js-eventemitter-tutorial.html
  http://mshiltonj.com/blog/blog/2011/10/04/nodejs-eventemitter-example-with-custom-events/
  ---> some code from these tutorials can be seen in my earlier commits.

I also reviewed the following document for info about how javascript timers work:
  http://ejohn.org/blog/how-javascript-timers-work/

Otherwise, aside for some help fixing bugs from stackoverflow, I only refered to the node.js documentation.

My final program is pretty simple and works as described in the assignment. There are two classes - Producer and Consumer. Producer simply contains the relevant listner and emitter methods (emits: 'time', listens for: 'register', 'keepAlive'). A consumer object keeps track of the number of keepAlive's it will transmit (k), it's personal id and the id of it's timeout function as well as containg the relevent listner and emitter methods (emits: 'register', 'keepAlive', listens for: 'time'). 

The program works as follows. After receiving the number of customers via the command line, a producer instance is created. A for loop calls createConsumer() n number of times.

createConsumer() first creates a new instance of Consumer. The relevant emitters are logged which results in, among other things, the consumer being added to the producer's time listener list. This allows the consumer to catch every 'time' event that is emitted by a producer. Register is then called, which creates a 10 sec timeout timer will remove the consumer from the time listener list at the end of the timeout. After, an interval timing loop is entered which calls consumer.keepAlive() every five seconds up to k times for that consumer. createCustomer returns the interval ids which are collected in a list to be cleared before the program exits.

consumer.register() creates a 10 second timeout counter, the id of which is saved in the consumer object. At the end of this period, this customer's time listener is removed from the process's time listener array so that it will no longer receive/log time messages. When consumer.keepAlive() is called, the current timeout time is cleared and a new 10 second timeout counter is created. The id of that counter is returned and used to overwrite the consumer's timeoutID. This effectively resets the timeout clock every time keepAlive() is called, adding another 5 seconds to the lifespan of the customer. 

Once all of the customer instances have been created (and their relative timers instantiated), the first time event is generated and then an interval timer is set to manage future time events. As long as the producer has one or more listeners in it's time listener array, it creates a time event every second and broadcasts it to its customers. Once the it's time listener array is empty (which will always occur after a maximum of 70 seconds due to the timeout process described above), all of the producer's listeners are removed and all remaining timers are cleared. The program then exits. 

In order to facilitate debugging and evaluating the program, I added a line of code that causes each consumer to print its ID and its randomly generated k value before any time values are printed. 

