/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	var lightGroup=this.gui.addFolder('Lights');	
	lightGroup.open();
	lightGroup.add(this.scene, 'light0');
	lightGroup.add(this.scene, 'light1');
	lightGroup.add(this.scene, 'light2');
	lightGroup.add(this.scene, 'light3');

	var appearanceGroup=this.gui.addFolder('Appearances');
	appearanceGroup.open();
	appearanceGroup.add(this.scene, 'DroneBodyAppearance', this.scene.droneAppearanceList);
	appearanceGroup.add(this.scene, 'DroneLegAppearance', this.scene.droneAppearanceList);
	appearanceGroup.add(this.scene, 'DroneHeliceAppearance',  this.scene.droneAppearanceList);

	this.gui.add(this.scene, 'AnimateClock');	

	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			this.scene.drone.setRotation(1);
			break;
		case(68): // only works for capital 'D', as it is
			this.scene.drone.setRotation(-1);
			break;
		case(87): // only works for capital 'W', as it is
			this.scene.drone.move(1);
			break;
		case(83): // only works for capital 'S', as it is
			this.scene.drone.move(-1);
			break;
		case(73): // only works for capital 'I', as it is
			this.scene.drone.fly(1)
			break;
		case(74): // only works for capital 'J', as it is
			this.scene.drone.fly(-1)
			break;
	};
};

