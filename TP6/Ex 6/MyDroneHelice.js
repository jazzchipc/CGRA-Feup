/**
 * MyDroneHelice
 * @constructor
 */
 function MyDroneHelice(scene) {
 	CGFobject.call(this,scene);
	
	this.center = new MySemiSphere(scene, 8, 4); 
	this.spade = new MyCylinder(scene, 8, 1); 
	this.angle = 180;
	this.desiredSpeed = 1 * 360;
	this.speedStep = 0;
	this.speed = 1 * 360;
	
	this.heliceSpeed ={
 	      Increasing:1,
 	      Decreasing:2,
 	      Constant:3,
 	}
	
	this.speedState = this.heliceSpeed.Constant;
 };

MyDroneHelice.prototype = Object.create(CGFobject.prototype);
MyDroneHelice.prototype.constructor = MyDroneHelice;

MyDroneHelice.prototype.display = function() {
	//spade
    this.scene.pushMatrix();
    this.scene.rotate(this.angle * degToRad, 0,1, 0)
	this.scene.translate(0, 0.15, 0);
	this.scene.scale(1.5, 0.05, 0.25);
	this.scene.rotate(-90 * degToRad, 1, 0, 0)
	this.spade.display();
	this.scene.popMatrix();
	
	//Center
	this.scene.pushMatrix();
	this.scene.scale(0.20, 0.30, 0.20);
	this.scene.rotate(-90 * degToRad, 1, 0, 0)
	this.center.display();
	this.scene.popMatrix();
}

MyDroneHelice.prototype.update = function(angle){
	if(this.speedState != this.heliceSpeed.Constant)
		this.speed += this.speedStep;
	this.angle += (angle * this.speed) - this.angle;
	
	if(this.speed == this.desiredSpeed)
		this.speedState = this.heliceSpeed.Constant;
}

MyDroneHelice.prototype.setRotationSpeed = function(speed) {
	if(this.speed < speed){
		if(this.speedState == this.heliceSpeed.Constant || this.speedState == this.heliceSpeed.Decreasing)
			this.speedState = this.heliceSpeed.Increasing;
			this.speedStep = +10;
	} else if(this.speed > speed){
		if(this.speedState == this.heliceSpeed.Constant || this.speedState == this.heliceSpeed.Increasing)
			this.speedState = this.heliceSpeed.Decreasing;
			this.speedStep = -10;
	}
	this.desiredSpeed = speed;
}