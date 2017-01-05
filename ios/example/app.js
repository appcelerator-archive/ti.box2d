var window = Ti.UI.createWindow();
var view = Ti.UI.createView();
window.add(view);
window.open();

// load the module
var Box2D = require('ti.box2d');

// create the world, using view as the surface
var world = Box2D.createWorld(view);

// create ground
var ground = Ti.UI.createView({
	backgroundColor: 'black',
	height: 5,
	width: Ti.Platform.displayCaps.platformWidth,
	top: Ti.Platform.displayCaps.platformHeight - 5
});

// add ground to world
var groundBodyRef = world.addBody(ground, {
	density: 12.0,
	friction: 0.3,
	restitution: 0.4,
	type: "static"
});

// create a block
var redBlock = Ti.UI.createView({
	backgroundColor: "red",
	width: 50,
	height: 50,
	top: 0
});

// add the block body to the world
var redBodyRef = world.addBody(redBlock, {
	density: 12.0,
	friction: 0.3,
	restitution: 0.4,
	type: "dynamic"
});

world.addEventListener("collision", function(e) {
	if ((e.a == redBodyRef || e.b == redBodyRef) && e.phase == "begin") {
		Ti.API.info("the red block collided with something");

		Ti.API.info(JSON.stringify(e));
		Ti.Media.vibrate();
	}
});

// start the world
world.start();
