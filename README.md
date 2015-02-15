Readme for Bottlenose NTP coding project

There are essentially two versions of this project. I was confused by the instructions (specifically the part which states "the goal of this exercise is to write a SINGLE program which contains a Producer and multiple Consumers"). I didn't quite understand the exercise, but wrote a program (NTPserver.js) that creates Producer and Consumer objects and has them send messages to each other. However, after emailing with Damon, I came to the conclusion that the idea was actually to write a server and a client that run independently. As a result, I rewrote my code entirely. The previous verion of the project can be seen in commit: __________.

This version of the project has 2 programs, udpServer.js and udpClient.js. udpServer.js creates the producer server and sends out time messages 1/second to all clients that have connected to it. It also waits for keepAlive messages and disconnects any client that hasn't sent a keepAlive
message in the last 10 seconds. 
