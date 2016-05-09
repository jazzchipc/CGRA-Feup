/**
 * MyDroneHelice
 * @constructor
 */
 function MyDroneHelice(scene) {
 	CGFobject.call(this,scene);
	
	this.center = new MySemiSphere(scene, 8, 8); 
	this.spade = new MyCylinder(scene, 8, 1); 
	
	this.heliceAppearance = new CGFappearance(scene);
	this.heliceAppearance.loadTexture("../resources/images/board.png")	
	this.heliceAppearance.setDiffuse(0.3, 0.3, 0.3,1);
	this.heliceAppearance.setSpecular(0.6, 0.6, 0.6,1);	
	this.heliceAppearance.setShininess(120);
 };

MyDroneHelice.prototype = Object.create(CGFobject.prototype);
MyDroneHelice.prototype.constructor = MyDroneHelice;

MyDroneHelice.prototype.display = function() {
	this.heliceAppearance.apply();

	//Center
	this.scene.pushMatrix();
	this.scene.scale(0.25, 0.30, 0.25);
	this.scene.rotate(-90 * degToRad, 1, 0, 0)
	this.center.display();
	this.scene.popMatrix();

	//spade
    this.scene.pushMatrix();
	this.scene.translate(0, 0.15, 0);
	this.scene.scale(2, 0.05, 0.25);
	this.scene.rotate(-90 * degToRad, 1, 0, 0)
	this.spade.display();
	this.scene.popMatrix();
}