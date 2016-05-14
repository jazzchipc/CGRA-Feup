/**
 * MyDroneLeg
 * @constructor
 */
 function MyDroneLeg(scene) {
 	CGFobject.call(this,scene);
	
	this.base = new MyUnitCubeQuad(scene, -0.5, 1,-0.5, 1.5);
	this.rightArch = new MyArch(scene);
	this.leftArch = new MyArch(scene);
	
	this.legAppearance = new CGFappearance(scene);
	this.legAppearance.loadTexture("../resources/images/Colorful.jpg");
	this.legAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
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
	this.scene.translate(2, -2, 0)
	this.scene.rotate(-90 * degToRad, 0, 1, 0)
	this.scene.scale(3, 0.15, 0.15);
	this.base.display();
	this.scene.popMatrix();

	//Left leg base
	this.scene.pushMatrix();
	this.scene.translate(-2, -2, 0)
	this.scene.rotate(-90 * degToRad, 0, 1, 0)
	this.scene.scale(3, 0.15, 0.15);
	this.base.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	//this.rightArch.display();
	this.scene.popMatrix();
}

MyDroneLeg.prototype.setTexture = function(newTexture){
	this.legAppearance.loadTexture(newTexture);
}