/**
 * MyDroneLeg
 * @constructor
 */
 function MyDroneLeg(scene) {
 	CGFobject.call(this,scene);
	
	this.legBase = new MyUnitCubeQuad(scene);
	
	this.legAppearance = new CGFappearance(scene);
	this.legAppearance.loadTexture("../resources/images/board.png")	
	this.legAppearance.setDiffuse(0.3, 0.3, 0.3,1);
	this.legAppearance.setSpecular(0.6, 0.6, 0.6,1);	
	this.legAppearance.setShininess(120);
 };

MyDroneLeg.prototype = Object.create(CGFobject.prototype);
MyDroneLeg.prototype.constructor = MyDroneLeg;

MyDroneLeg.prototype.display = function() {
	this.legAppearance.apply();

	//Legs

	//Right leg base
	this.scene.pushMatrix();
	this.scene.translate(2, -2, 3)
	this.scene.rotate(-90 * degToRad, 0, 1, 0)
	this.scene.scale(4, 0.15, 0.15);
	this.legBase.display();
	this.scene.popMatrix();

	//Left leg base
	this.scene.pushMatrix();
	this.scene.translate(-2, -2, 3)
	this.scene.rotate(-90 * degToRad, 0, 1, 0)
	this.scene.scale(4, 0.15, 0.15);
	this.legBase.display();
	this.scene.popMatrix();
}