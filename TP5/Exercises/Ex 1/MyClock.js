/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
    this.cylinder = new MyCylinder(scene, this.slices, this.stacks);
    this.circle = new MyCircle(scene, this.slices, this.stacks);
    this.minPointer = new MyClockHand(scene, 0.7, 0);
    this.horPointer = new MyClockHand(scene, 0.5, 0);
    this.secPointer = new MyClockHand(scene, 0.6, 0);
 	this.initBuffers();

 	this.clockAppearance = new CGFappearance(scene);
	this.clockAppearance.loadTexture("../resources/images/clock.png")
    this.materialDefault = new CGFappearance(scene);
 };

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {
    this.clockAppearance.apply();
    this.circle.display();
    this.materialDefault.apply();
 	this.cylinder.display();

 	this.scene.pushMatrix();
 	this.minPointer.setAngle(180);
 	this.scene.translate(0, 0, 1);
 	this.minPointer.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.secPointer.setAngle(270);
 	this.scene.translate(0, 0, 1);
 	this.secPointer.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.minPointer.setAngle(90);
 	this.scene.translate(0, 0, 1);
 	this.horPointer.display();
 	this.scene.popMatrix();
 };

 MyClock.prototype.update = function(currTime){

 }
 