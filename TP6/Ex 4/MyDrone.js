/**
 * MyDrone
 * @constructor
 */
 function MyDrone(scene) {
 	CGFobject.call(this,scene);
	
	this.droneBody = new MyDroneBody(scene); 
	this.rightDroneLeg = new MyDroneLeg(scene); 
	this.leftDroneLeg = new MyDroneLeg(scene);
	this.northHelice = new MyDroneHelice(scene);
	this.southHelice = new MyDroneHelice(scene);
	this.westHelice = new MyDroneHelice(scene);
	this.eastHelice = new MyDroneHelice(scene);
	 
 };

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.display = function() {
	this.droneBody.display();
	this.rightDroneLeg.display();
	this.leftDroneLeg.display();

	this.scene.pushMatrix();
	this.scene.translate(0, 0.25, -0.5);
	this.northHelice.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-3.5, 0.25, 3);
	this.westHelice.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(3.5, 0.25, 3);
	this.eastHelice.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 0.25, 6.5);
	this.southHelice.display();
	this.scene.popMatrix();
}