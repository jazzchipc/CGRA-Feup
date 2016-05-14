/**
 * MyDrone
 * @constructor
 */
 function MyDrone(scene) {
 	CGFobject.call(this,scene);
	
	this.body = new MyDroneBody(scene); 
	this.rightLeg = new MyDroneLeg(scene); 
	this.leftLeg = new MyDroneLeg(scene);
	this.northHelice = new MyDroneHelice(scene);
	this.southHelice = new MyDroneHelice(scene);
	this.westHelice = new MyDroneHelice(scene);
	this.eastHelice = new MyDroneHelice(scene);
	
 };

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.display = function() {
	this.body.display();
	this.rightLeg.display();
	this.leftLeg.display();

	this.scene.pushMatrix();
	this.scene.translate(0, 0.25, -3.5);
	this.northHelice.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-3.5, 0.25, 0);
	this.westHelice.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(3.5, 0.25, 0);
	this.eastHelice.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 0.25, 3.5);
	this.southHelice.display();
	this.scene.popMatrix();
}