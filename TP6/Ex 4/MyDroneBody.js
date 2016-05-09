/**
 * MyDroneBody
 * @constructor
 */
 function MyDroneBody(scene) {
 	CGFobject.call(this,scene);
	
	this.crossedArm = new MyCylinder(scene, 8, 1); 
	this.helSupport = new MyCylinder(scene, 8, 1); 
	this.mainBody = new MySemiSphere(scene, 8, 10);
	
	this.bodyAppearance = new CGFappearance(scene);
	this.bodyAppearance.loadTexture("../resources/images/board.png")	
	this.bodyAppearance.setDiffuse(0.3, 0.3, 0.3,1);
	this.bodyAppearance.setSpecular(0.6, 0.6, 0.6,1);	
	this.bodyAppearance.setShininess(120);
 };

MyDroneBody.prototype = Object.create(CGFobject.prototype);
MyDroneBody.prototype.constructor = MyDroneBody;

MyDroneBody.prototype.display = function() {
	this.bodyAppearance.apply();

	//Arms
	//Arm paralel to z axis
	this.scene.pushMatrix();
	this.scene.scale(0.2, 0.2, 6);
	this.crossedArm.display();
	this.scene.popMatrix();

	//Arm paralel to X axis
	this.scene.pushMatrix();
	this.scene.translate(3, 0, 3);
	this.scene.rotate(-90 * degToRad, 0, 1, 0)
	this.scene.scale(0.2, 0.2, 6);
	this.crossedArm.display();
	this.scene.popMatrix();

	//Helices support

	//support at negative z axis
	this.scene.pushMatrix();
	this.scene.translate(0, -0.25, -0.5);
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.rotate(-90 * degToRad, 1, 0, 0)
	this.helSupport.display();
	this.scene.popMatrix();

	//support at positive z axis
	this.scene.pushMatrix();
	this.scene.translate(0, -0.25, 6.5);
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.rotate(-90 * degToRad, 1, 0, 0)
	this.helSupport.display();
	this.scene.popMatrix();
	
	//support at positive x axis
	this.scene.pushMatrix();
	this.scene.translate(3.5, -0.25, 3);
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.rotate(-90 * degToRad, 1, 0, 0)
	this.helSupport.display();
	this.scene.popMatrix();

	//support at negative x axis
	this.scene.pushMatrix();
	this.scene.translate(-3.5, -0.25, 3);
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.rotate(-90 * degToRad, 1, 0, 0)
	this.helSupport.display();
	this.scene.popMatrix();

    //Main body
	this.scene.pushMatrix();
	this.scene.translate(0, -0.25, 3);
	this.scene.scale(0.6, 1.2, 0.6);
	this.scene.rotate(-90 * degToRad, 1, 0, 0)
	this.mainBody.display();
	this.scene.popMatrix();
}