title: MASLAB2017
draft: false
published: 2017-10-08 16:28:59
layout: markdown
---

# MASLAB 2017: Building an autonomous block stacking robot

Here's the [competition page for 2017](https://maslab.mit.edu/2017/media).

tl;dr - The challenge is to make a robot that can autonomously navigate through a playing field, collect blocks, sort them by color, and stack them to earn points. We're given less than 4 weeks to make all of that happen!

 - you get N^2 points for a stack of size N of your color block (green or red)
 - you get (N+1)^2 points for a stack of size N of your color in your base (a designated purple area on the playing field)
 - there are 2 buttons on the field: one of them drops 6 of your own blocks (good!) and the other drops 6 opponent blocks (-1 points each!)

You can find all of the [code for the project here](https://github.com/milokhl/MASLAB-2017/). Warning: a lot of code was changed at 5am the day before the competition, so if it's messy I apologize.

## Mechanical design

My team thought it would be cool to design our bot around the concept of bottom up stacking. Rather than build a mechanism to bring blocks really high up (at least 24" for a maximum height stack), we decided that it would be much easier to stack from the bottom up.

I started out by designing a linear actuator that could move something about 4". We had some metal gear high-torque servos, plastic gears, and medium-density fiberboard available to us, so I build the actuator out of that. Drawing my own gears from scratch took a few iterations to get right.

I added one intermediate gear to double the gear ratio between the servo and the actuator so that 180 degrees of rotation could cover about 4" of linear distance.

Then, I designed the rest of the elevator and attached the linear actuator to it. I added a little servo-driven grabber on the end of the linear actuator to skewer blocks through their 1" center hole.

The whole elevator mechanism: lower the actuator, skewer a ground-level block, lift it about 3", slide another block underneath, repeat.

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/r7y0b0BK6cc?rel=0" frameborder="0" allowfullscreen></iframe>
</center>

And to drop a stack at the end of the match, the elevator lowers, and the grabber retracts.

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/DVzUAzwLHqs?rel=0" frameborder="0" allowfullscreen></iframe>
</center>

I had to make a ton of trips to the laser cutter as we tested and refined the elevator design. Even when stuff looked great in the assembly, something was always a little off in real life. Amazingly, it worked well in the end.

My team also took a different approach to collecting opponent blocks. Most teams have their robot lift or throw them into some kind of bin. With the way our elevator worked, it was hard to do that. Arinze had this kind of weird idea to have a rotating skewer that would go through a block, and then pull it out from under the elevator. I had no clue whether it would work, but I went ahead and prototyped it and by some miracle (or the way it was prototyped ;) it did!

You probably have to see what it looks like to understand what I'm talking about.

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_3bzQB3cxCQ?rel=0" frameborder="0" allowfullscreen></iframe>
</center>

Finally, I had to design the rest of our robot around the block elevator and block skewer. Pretty much everything in MASLAB is made out of 0.25" MDF. Our robot has two layers centered around the elevator. The second layer accomodates all of the electronics (Teensy, gyro, motor driver, battery, Intel NUC). I also added some supports along two axes for the elevator - it was too tall and had us all worried.

Fully assembled, with electronics installed:

<center>
![Full robot assembly](/images/robot-full-assembly.jpg)
</center>

When it's time to release our stack of blocks at the end of the match. The front wall of the elevator rotates to one side, and the robot *really* carefully backs away. It has to be 2" from the stack for it to receive points.

## 2D SLAM with a Kinect (pretending to be a laser scanner)

I had a Kinect lying around from a previous drone project, and realized that it would make a fine addition to our robot's vision/planning/driving stack. Last year, my MASLAB team used a webcam to identify a block and it's angle and radial distance from the robot. This worked really well, actually, but the robot had no ability to localize. If a block wasn't in sight, its only hope was to drive around randomly until something of interest appeared.

ROS includes a really cool set of packages for working with the kinect. A lot of ROS tutorials for the Kinect use a "Turtlebot" as an example. Our robot is basically a homemade turtlebot (although the first adjective that came to mind was "shittier").

With the right drivers and packages installed, you can [convert the depth images from the Kinect into ROS laser scan messages](http://wiki.ros.org/depthimage_to_laserscan) (by taking a planar slice from the depth data), and then feed laser scan data into a package called [gmapping](http://wiki.ros.org/gmapping). Gmapping uses the laser scans to build an occupancy map (floorplan map) and allows you to determine your robot's pose relative to the map.

Besides being really cool, adding SLAM to our robot would make it a lot easier to find our home base, and hit the right button on the field and get more blocks. It would also ensure that we don't get stuck in one part of the map (a common MASLAB problem).

In addition to the depth imagery from the Kinect, gmapping requires a couple transforms to work. It needs to know the current odometry reading of the robot, and where the Kinect is mounted on the robot. I wrote the necessary transform publishers in Python, and then wrote a roslaunch file to run all of the involved nodes in one command.

If you're curious, this is what the tf tree looks like when I have everything running. The stuff on the right is published by the kinect driver nodes, and the stuff on the left is published by my code on the robot and the gmapping node.

<center>
![ROS Transforms](/images/publisher-frames.png)
![Floorplan example](/images/slam2_good.png)
</center>

## Pursuing a Block with a Webcam and OpenCV

While I was working with the Kinect SLAM, my team was also developing code in OpenCV to allow our robot to navigate to a block in it's FOV with a webcam. Because the dimensions of the blocks and the frame size of our webcam are known, it's easy to deduce the radial distance to a block in an image from the webcam. It's also possible to estimate the angle of the block in the camera's coordinate frame. So basically, with a webcam you can get a great estimation of a block's polar coordinates at 30 fps.

I turned my team's OpenCV code into a ROS node, and added the webcam to our robot's sensor stack in ROS. The vision node publishes the distance and angle of a block to a robot/vision topic, and another node publishes drive commands on robot/drive, which are translated into actual motor outputs (robot/motors) by a PID controller node.

Here you can see the robot centering on a couple blocks and collecting them. The blocks had to be on paper because the color sensor at the base of the elevator was getting confused by the carpet for whatever reason.

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/yYVgA6mhyBU?rel=0" frameborder="0" allowfullscreen></iframe>
</center>

## Final competition strategy

On top of all the ROS nodes in the robot, a 'state controller' node determines what actions the robot is allowed to take at any time. It publishes to a robot/state topic, and all of the other control nodes listen for state changes.

* SCAN: Rotate clockwise slowly (this was advantageous to our mechanical design)
* NAV_BLOCK: When a block is seen, use visual feedback from the webcam to send commands to the PID controller.
* EXTRA: As we navigate to a block, it disappears from the webcam's view right before collection. The robot goes an 'extra' 14 inches to make sure the block is pushed against the back of the elevator.
* COLL_OUR: Stop driving, go through the servo sequence to collect our block
* COLL_OPP: Stop driving, go through servo sequence for opponent block
* UNSTICK: A debug mode. The robot backs up, turns to a random angle between +60 and -60 degrees, and goes forward. This ensures that the robot gets itself out of a corner and tries to look in a new direction. The robot isn't allowed to go to any other states until it finishes unsticking.
* DROP: Drop our stack of blocks and open the front door.
* REVERSE: Carefully drive backwards from the stack
* STOP: Shut everything down and end the match.

I created a timeout for every state, so that the robot couldn't get stuck doing one thing for too long. As soon as the robot times out in it's current state, a function is called that determines what state to enter next.

Arinze and I spent a lot of time making sure that state transitions occurred properly. We found the robot often got stuck in a cycle of 2 or 3 states. For example, it would see a block, enter NAV_BLOCK, hit a wall, timeout, enter UNSTICK, get stuck against another wall in UNSTICK (ironically), timeout, see the same block again, and repeat. It could take 3 or 4 cycles before the robot's randomly chosen unstick angle got it out and into a new area of the map.

It turns out that the really nice threading that ROS does can actually be a nightmare when you want to implement a state machine. However, once we got the proper locks in place to prevent nodes from trying to do competing things at the same time, it all worked beautifully.

## Final competition footage

Despite a very bad seeding round, we won 7/9 matches in the competition, and swept all 3 games in the final round, taking first place!

Here's a highlight reel that I threw together from the competition.

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/M5HQa1MqTzI?rel=0" frameborder="0" allowfullscreen></iframe>
</center>

We actually were adding new features to the robot between every round. It was definitely a risky move, but saved us from some state loops that we discovered during the competition, and from accidentally entering our 'endgame' mode prematurely when the robot thought it had picked up more blocks than it really had.

The kinect mapping didn't make it on to the final robot. There wasn't enough time to turn the ~20 parameters of gmapping, and I didn't have enough confidence in the maps I was getting.

I got to take the robot home with me after the competition, and I'm planning to remount the Kinect and try to actually get mapping to work.
