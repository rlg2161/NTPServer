Readme for Bottlenose NTP coding project

There are essentially two versions of this project. I was confused by the instructions (specifically the part which states "the goal of this exercise is to write a SINGLE program which contains a Producer and multiple Consumers"). I didn't quite understand the exercise, but wrote a program (NTPserver.js) that creates Producer and Consumer objects and has them send messages to each other. However, after emailing with Damon, I umderstood that the idea was actually to write a server and a client that run independently. As a result, I rewrote my code entirely. The previous verion of the project can be seen in commit: 5f4a3ec...

How it Works:

  This version of the project has 3 programs, Producer.js, Consumer.js and ManageConsumers.js. I designed and implemented a set of UDP servers, one of which serves as the Producer and continuously emits time messages until killed (via Ctrl+C) and another which serves as the Cosumer and receives and logs time messages from the producer. Producer.js creates the producer server and sends out time messages 1/second to all clients that have connected to it. It also waits for keepAlive messages and disconnects any client that hasn't sent a keepAlive message in the last 10 seconds. Consumer.js creates a single instance of a consumer. This consumer has a randomly generated value between 0-12 that governs how many "keepAlive" messages it will send. ManageConsumers.js is a simple program that takes a command line argument and creates that many instances of a consumer.

  The producer is very simple. It broadcasts the time to all of its receipients every second under the server is killed (w/ CTRL + C). It also maintains two lists; the first is a list of the port numbers of all of the consumers connected to it and the second is an object that stores the port number of a consumer and the remaining time that consumer will be alive as a key-value pair. In the broadcast loop, each consumer is looked up by port number and the remaining time value is decremented. If the value is > 0, the normal time message is sent to the client with a 0 appended to the beginning of the message. If the value == 0, then a message with the prefix 1 is sent to the consumer.

  Upon receiving a message, the consumer looks at the prefix. If the prefix is 0, it prints the message to console along with the port it is receiving the message on. (I interpreted this as the desired "identifier of the thread the Consumer is running in." Alternatively, if different processes were actually desired for each Consumer, a simple script could be written to fork a modified version of the manageConsumers program to generate Consumers who were actually running on different threads. At this point, their pid's would be the unique identifier.) If the prefix is 1, the consumer prints its final time stamp, closes its connection to the producer and then clears its interval timer.

  The consumer also sends two types of messages. When it is created, it sends a registration message - a message prefixed by a 0 to the producer. It also sends k keepAlive messages on 5 second intervals - this message is a 1 and the intervalID. When the producer receives a message with a 0, it adds that consumer to the lists it curates as described above. When it receives a message of a 1, it resets the timer on that Consumer's port number to 10 seconds. 

Tests:

  I also wrote one simple test called test.js. To use this test, I redirected stdout of ManageConsumers.js X > test.txt. You then simply call test.js X which reads the output in test.txt and parses the number of time messages sent to confirm that the correct number of messages was sent to each customer.

To Improve:
  
  Keeping track of and sending "keepAlive" message is a bit hackish - should be implemented more idiomatically.

  Program should exit after all consumers close themselves and not need the timeout timer.

  Program doesn't work with large numbers of client nodes. Additionally, there is an occasional off-by-one bug that I cannot replicate reliably or identify.



