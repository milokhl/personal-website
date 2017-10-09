title: MASLAB2017
draft: false
published: 2017-10-08 16:28:59
layout: markdown
---

# MASLAB 2017: Building an autonomous block stacking robot

Here's the competition page for 2017.

tl;dr - The challenge is to make a robot that can autonomously navigate through a playing field, collect blocks, sort them by color, and stack them to earn points. We're given less than 4 weeks to make all of that happen!

 - you get N^2 points for a stack of size N of your color block (green or red)
 - you get (N+1)^2 points for a stack of size N of your color in your base (a designated purple area on the playing field)
 - there are 2 buttons on the field: one of them drops 6 of your own blocks (good!) and the other drops 6 opponent blocks (-1 points each!)

You can find all of the [code for the project here](https://github.com/milokhl/MASLAB-2017/). Warning: a lot of code was changed at 5am the day before the competition, so if it's messy I apologize.

## Mechanical design

My team thought it would be cool to design our bot around the concept of bottom up stacking. Rather than build a mechanism to bring blocks really high up (at least 24" for a maximum height stack), we decided that it would be much easier to stack from the bottom up.

I started out by designing a linear actuator that could move something about 4". We had some metal gear high-torque servos, plastic gears, and medium-density fiberboard available to us, so I build the actuator out of that. Drawing my own gears from scratch took a few iterations to get right.

I added one intermediate gear to double the gear ratio between the servo and the actuator so that 180 degrees of rotation could cover about 4" of linear distance.

<!-- <picture of linear actuator assembly> -->

Then, I designed the rest of the elevator and attached the linear actuator to it. I added a little servo-driven grabber on the end of the linear actuator to skewer blocks through their 1" center hole.

<!-- <picture of whole elevator assembly> -->

The whole elevator mechanism: lower the actuator, skewer a ground-level block, lift it about 3", slide another block underneath, repeat.

[![Elevator mechanism](https://img.youtube.com/vi/r7y0b0BK6cc/0.jpg)](https://youtu.be/r7y0b0BK6cc)