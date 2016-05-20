/**
 * MyDroneHook
 * @constructor
 */
 function MyDroneHook(scene) {
 	CGFobject.call(this,scene);
	
	this.cable = new MyCylinder(scene, 6, 1); 
	this.cableScale = 2;
	this.hookRadius = 0.3;
	this.hookLength = 0.25;
	//center bottom coordinates
	this.z = this.hookLength + this.cableScale * 0.15;
	this.y = 0;
	this.x = 0;
	this.hook = new MyCylinder(scene, 8, 4); 
 };

MyDroneHook.prototype = Object.create(CGFobject.prototype);
MyDroneHook.prototype.constructor = MyDroneHook;

MyDroneHook.prototype.display = function() {
	//cable
	this.scene.pushMatrix();
	this.scene.rotate(90 * degToRad, 1, 0, 0);
	this.scene.translate(0, 0, 0.25);
	this.scene.scale(1, 1, this.cableScale);
	this.scene.scale(0.10, 0.10, 0.15);
	this.cable.display();
	this.scene.popMatrix();

	//hook
    this.scene.pushMatrix();
	this.scene.rotate(90 * degToRad, 1, 0, 0);
	this.scene.translate(0, 0, this.z);
	this.scene.scale(0.30, 0.30, 0.25);
	this.hook.display();
	this.scene.popMatrix();
}

MyDroneHook.prototype.scaleHook = function(scale){
	this.cableScale *= scale;
	this.z = this.hookLength + this.cableScale * 0.15;
}