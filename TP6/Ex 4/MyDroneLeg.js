/**
 * MyDroneLeg
 * @constructor
 */
 function MyDroneLeg(scene) {
 	CGFobject.call(this,scene);
	
	this.base = new MyUnitCubeQuad(scene, 0, 1, 0, 1);
	this.rightArch = new MyArch(scene);
	this.leftArch = new MyArch(scene);
 };

MyDroneLeg.prototype = Object.create(CGFobject.prototype);
MyDroneLeg.prototype.constructor = MyDroneLeg;

MyDroneLeg.prototype.display = function() {
	//Legs
	//Right leg base
	this.scene.pushMatrix();
	this.scene.translate(1.5, -2, 0)
	this.scene.rotate(-90 * degToRad, 0, 1, 0)
	this.scene.scale(2, 0.15, 0.15);
	this.base.display();
	this.scene.popMatrix();

	//Left leg base
	this.scene.pushMatrix();
	this.scene.translate(-1.5, -2, 0)
	this.scene.rotate(-90 * degToRad, 0, 1, 0)
	this.scene.scale(2, 0.15, 0.15);
	this.base.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	//this.rightArch.display();
	this.scene.popMatrix();
}

MyDroneLeg.prototype.setTexture = function(newTexture){
	this.legAppearance.loadTexture(newTexture);
}