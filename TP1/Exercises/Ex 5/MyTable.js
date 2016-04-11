/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cubequad = new MyUnitCubeQuad(this.scene);

};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	this.scene.pushMatrix();
	this.scene.translate(1.15, 0, 1.15);
	this.scene.scale(0.3, 3.5, 0.3);
	this.scene.translate(0, 0.5, 0);
    this.cubequad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(5.85, 0, 3.85);
	this.scene.scale(0.3, 3.5, 0.3);
	this.scene.translate(0, 0.5, 0);
    this.cubequad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(1.15, 0, 3.85);
	this.scene.scale(0.3, 3.5, 0.3);
	this.scene.translate(0, 0.5, 0);
    this.cubequad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(5.85, 0, 1.15);
	this.scene.scale(0.3, 3.5, 0.3);
	this.scene.translate(0, 0.5, 0);
    this.cubequad.display();
    this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(3.5, 3.5, 2.5);
	this.scene.scale(5, 0.3, 3);
	this.scene.translate(0, 0.5, 0);
    this.cubequad.display();
    this.scene.popMatrix();
   
    
}