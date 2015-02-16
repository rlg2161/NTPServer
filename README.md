Readme for Bottlenose NTP coding project

I wrote an NTP server and client utilizing TCP servers. 

To run:

  In one process:
    nodejs Producer.js

  In another process:
    nodejs ManageConsumers.js X

  To test correct output:
    nodejs ManageCustomers.js X > test.txt
    nodejs test.js X

How it Works:

  This version of the project has 3 programs, Producer.js, Consumer.js and ManageConsumers.js. I designed and implemented this project as a set of TCP connections. The Producer maintains all connections and sends time messages to the clients - the clients simply connect, send a registration and then subsequent keepAlive messages, and print what they hear to console. ManageCustomers.js is a wrapper program to create N number of Consumers (where N is a command line arg).

  Consumer.js creates a single instance of a Consumer. This consumer has a randomly generated value between 0-12 that governs how many "keepAlive" messages it will send. Upon instantiation, the Consumer sends a registration message to the Producer. Subsequently, an interval loop is created and the Consumer sends 1 keepAlive message every five seconds for k iterations. 

  The message from the Producer contains the date, the port the message is being sent to, and a leading 1 or a 0. 0 indicates a normal message and Consumer prints the port number and the time to console (I interpreted the identifier discussed in the Consumer section of page 2 of the assignment as the port number of the connection between the Consumer and the Producer). A 1 indicates that it is the last message, so in addition to printing the port ant time to console, the interval timer that governs the sending of keepAlive messages is also cleared.

  Producer.js creates a single instance of the Producer. The producer listens for connections on port 10000, address '0.0.0.0'. On receiving a registration message, it creates a connectionTimes object that contains the client's port number and a counter that governs what type of message to send to that client. For each socket, an interval loop is entered that sends a time message. The interval id is saved in an array. If it is a normal message, the message is prefixed by a 0; if it is the last message, the message is prefixed by a 1. The type of message is determined by the value in the connectionTimes object - when that counter == 1 the last message will be sent, otherwise a normal message will be sent. Additionally, if it is the last message, the producer closes the socket after sending the message. After sending a message, the counter stored in the connectionsTime object is decremented by 1. Upon receiving a close message from the client, the interval timer stored in the array is cleared and the connection is removed from the producer's connectionTime object. 


Tests:

  I also wrote one simple test called test.js. To use this test, I redirected stdout of ManageConsumers.js X > test.txt. You then simply call test.js X which reads the output in test.txt and parses the number of time messages sent to confirm that the correct number of messages was sent to each customer.

To Improve:
  
  Keeping track of the correct number of "keepAlive" messages to send is a bit hackish - should be implemented more idiomatically (with a real for loop for example).

  Works for a relatively large number of clients but meets problems when dealing with hundreds of clients. Works reliably for at least 200 customers but significantly more clients (ex: 500) do not yeild correct messages.

  Could fully automate testing so output doesn't have to be redirected to file which is then tested.


Note:
 
  My git log history is so long (and probably confusing) because there are essentially 3 versions of this project. Initially, I was confused by the prompt (particularly the part about writing a SINGLE program to handle both the consumer and the producer), so I wrote a single program that contained producer and consumer objects that sent the relevant messages to one another. This version can be found at commit 5f4a3ec...

  After speaking with Damon, I realized I had misunderstood the assignment, so I rewrote the whole program as a UDP server application. I wrote it this way because I thought the time stamps were best thought of as datagrams and assumed that the unreliabilty issues inherent in UDP would not be an issue in an application of this size. I finished this version of the application which can be found at commit 3b32a06... However, I was having problems always getting the correct number of time messages sent to each client. I believe that this problem was caused by some of the packets getting lost, which led to an incorrect number of messages being sent. This problem was exacerbated by high numbers of clients (presumably because it was simply a higher volume of messages so there was a greater likelihood one or more would be dropped). I didn't think the problems with the UDP channel would have been a significant issue with a server and a client running on the same machine, which is why I chose to use the UDP protocol. Upon realizing this problem, I made a few stabs at trying to fix this issue. Not finding any immediate success, I decided to just rewrite the entire project using TCP.

  The final version of this project (as described above) is the TCP version. It borrows much of its internal logic from the UDP version - it is merely an adaptation to the new protocol (with a few simplifications that come from utilizing TCP). 
