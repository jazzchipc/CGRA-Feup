/**
 * MyLoadingZone
 * @constructor
 */
 function MyLoadingZone(scene, x, y, z) {
 	CGFobject.call(this,scene);
	this.cylinder = new MyCylinder(scene, 12, 1);
    this.circle = new MyCircle(scene, 12, 1);
	//center coordinates
    this.X = x;
    this.Y = y;
    this.Z = z;
    
    this.targetAppearance = new CGFappearance(scene);
	this.targetAppearance.loadTexture("../resources/images/Helipad.jpg");
	this.targetAppearance.setDiffuse(0.3, 0.3, 0.3,1);
	this.targetAppearance.setSpecular(0.6, 0.6, 0.6,1);	
	this.targetAppearance.setShininess(120);
 };

MyLoadingZone.prototype = Object.create(CGFobject.prototype);
MyLoadingZone.prototype.constructor = MyLoadingZone;

MyLoadingZone.prototype.display = function() {
	//Cylinder display
	this.scene.pushMatrix();
 	this.scene.translate(this.X, this.Y, this.Z);
    this.scene.rotate(90 * degToRad, 1, 0, 0);
    this.scene.translate(0, 0, -0.5)
    this.scene.scale(1, 1, 0.45);
 	this.cylinder.display();
 	this.scene.popMatrix();

	this.scene.pushMatrix();
    this.scene.translate(this.X, this.Y + 0.52, this.Z);
    this.scene.rotate(-90 * degToRad, 1, 0, 0);
    this.scene.translate(0, 0, -1)
    this.targetAppearance.apply();
	this.circle.display();
	this.scene.popMatrix();
}