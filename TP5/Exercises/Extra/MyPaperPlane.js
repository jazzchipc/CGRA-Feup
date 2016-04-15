/**
 * MyPaperPlane
 * @constructor
 */
 function MyPaperPlane(scene) {
 	CGFobject.call(this,scene);

 	this.initBuffers();
 };

MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor = MyPaperPlane;

 MyPaperPlane.prototype.initBuffers = function() {
 	this.vertices = [
 		0, 0, 0, 
 		//superior right face vertex's
 		1, 0, 0.75,
 		0.25, 0, 0.75,
 		//superior left face vertex's
 		-1, 0, 0.75,
 		-0.25, 0, 0.75,
 		//inferior face vertex
 		0, -0.25, 0.75,
 		 ];

 	this.indices = [
 	0, 2, 1,
 	0, 3, 4,
 	0, 5, 2,
 	0, 4, 5
 	];


 	this.primitiveType = this.scene.gl.TRIANGLES;

 	this.normals = [
 	  0, 0, 1,
 	  0, 0, 1,
 	  0, 0, 1,
 	  0, 0, 1,
 	  0, 0, 1,
 	  0, 0, 1
 	];
 	
	this.initGLBuffers();
 };