/**
 * MyDrone
 * @constructor
 */
 function MyDrone(scene) {
 	CGFobject.call(this,scene);
	
	this.crossedArm = new MyCylinder(scene, 8, 20); 
	this.helSupport = new MyCylinder(scene, 8, 20); 
	this.mainBody = new MySemiSphere(scene, 8, 20);
	this.legBase = new MyUnitCubeQuad(scene);
	this.legConnection = new MyUnitCubeQuad(scene);

	this.armAppearance = new CGFappearance(scene);
	this.armAppearance.loadTexture("../resources/images/board.png")	
	this.armAppearance.setDiffuse(0.3, 0.3, 0.3,1);
	this.armAppearance.setSpecular(0.6, 0.6, 0.6,1);	
	this.armAppearance.setShininess(120);

	this.mainBodyAppearance = new CGFappearance(scene);
	this.mainBodyAppearance.loadTexture("../resources/images/board.png")	
	this.mainBodyAppearance.setDiffuse(0.3, 0.3, 0.3,1);
	this.mainBodyAppearance.setSpecular(0.6, 0.6, 0.6,1);	
	this.mainBodyAppearance.setShininess(120);

	this.legAppearance = new CGFappearance(scene);
	this.legAppearance.loadTexture("../resources/images/board.png")	
	this.legAppearance.setDiffuse(0.3, 0.3, 0.3,1);
	this.legAppearance.setSpecular(0.6, 0.6, 0.6,1);	
	this.legAppearance.setShininess(120);

 };

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.display = function() {
	//Arms
	this.armAppearance.apply();

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
	this.mainBodyAppearance.apply();

	this.scene.pushMatrix();
	this.scene.translate(0, -0.25, 3);
	this.scene.scale(0.6, 1.2, 0.6);
	this.scene.rotate(-90 * degToRad, 1, 0, 0)
	this.mainBody.display();
	this.scene.popMatrix();

	//Legs
	this.legAppearance.apply();

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

	//fazer as curvas de bezier num for com consecutivas rotações e translações?
}