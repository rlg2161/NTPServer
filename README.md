Readme for Bottlenose NTP coding project

Upon beginning this project, I was not very familiar with node.js including events and eventEmitters in particular. For help on where to begin, I looked at several tutorials on Google - below were the two I went through:
  http://www.hacksparrow.com/node-js-eventemitter-tutorial.html
  http://mshiltonj.com/blog/blog/2011/10/04/nodejs-eventemitter-example-with-custom-events/

I also reviewed the following document for info about how javascript timers work:
  http://ejohn.org/blog/how-javascript-timers-work/

Otherwise, aside for some help fixing bugs from stackoverflow, I only refered to the node.js documentation.

My final program is pretty simple and works as described in the assignment. There are two classes - Producer and Consumer. Producer simply contains the relevant listner and emitter methods (emits: 'time', listens for: 'register', 'keepAlive'). A consumer object keeps track of the number of keepAlive's it will transmit (k), it's personal id and the id of it's timeout function as well as containg the relevent listner and emitter methods (emits: 'register', 'keepAlive', listens for: 'time'). 

The program works as follows. After receiving the number of customers via the command line, a producer instance is created. A for loop calls createConsumer() where the bulk of the work of the program is done.

createConsumer() first generates a random value between 0-12 (k). k and a counter are fed as arguments in creating a new instance of constructor. The relevant emitters are logged and then the consumer method register is called. Register emits a 'register' event which is caught by the producer which causes the consumer to be added to the producers register listener list. This allows the consumer to catch every 'time' event that is emitted by a producer. Additionally, a interval timing loop is entered which calls consumer.keepAlive() every five seconds up to k for that consumer. createCustomer returns the interval ids which are collected in a list to be cleared before the program exits.

consumer.register() creates a 10 second timeout counter, the id of which is saved in the consumer object. At the end of this period, this customer's time listener is removed from the process's time listener array so that it will no longer receive/log time messages. When consumer.keepAlive() is called, the current timeout time is cleared and a new 10 second timeout counter is created. The id of that counter is returned and used to overwrite the consumer's timeoutID. This effectively resets the timeout clock every time keepAlive() is called, adding another 5 seconds to the lifespan of the customer. 


