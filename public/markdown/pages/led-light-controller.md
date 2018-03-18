# iPhone Controlled LED Lighting using Arduino, Bluetooth, and Swift

The github repo for this project is: https://github.com/milokhl/led-light-controller

<center>
![Magenta Room](/images/magenta_room.jpg)
</center>

There are a kits you can buy these days that allow you to control a strip of RGB LEDs with a small infrared remote control. You can choose from some preset solid colors, use fading and flashing effects, and even program in some custom colors.

I thought it would be a lot cooler to integrate this remote control functionality into an iPhone app, and allow it to connect to the LEDs via bluetooth.

Eventually, I’m hoping to set up my LED strips to respond to music. An iOS app should be perfect for this – there are some cool Swift libraries out there for audio processing.

## The iPhone App

Here’s what the main view of the app looks like. Create a custom color with the slider bars and send it by pressing the color display rectangle. I’ve created 3 special effects so far: slow fade, fast fade, and cut (flash is not implemented yet because it is the most likely to give someone a seizure). I’ve also added 6 preset colors that I like, plus white and black (off). If the bluetooth device disconnects, swipe down to reconnect–the status label at the bottom of the app should update accordingly.

<center>
![Original LED controller](/images/original-led-app.jpg)
</center>

<div class="gist-snippet">
	<script src="https://gist.github.com/milokhl/21805f3afe1bce81dea0652050d57b8f.js"></script>
</div>

## Updated iPhone App

Here's a new and improved iPhone app, made by Magnus Johnson (http://www.magmhj.com/)