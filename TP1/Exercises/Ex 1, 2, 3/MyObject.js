/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyObject(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyObject.prototype = Object.create(CGFobject.prototype);
MyObject.prototype.constructor=MyObject;

MyObject.prototype.initBuffers = function () {

	//Vertices do objeto (x, y, z)
	this.vertices = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0,
            0, 1.5, 0,
            -1, 0.5, 0,
             1, 0.5, 0,
			];

	//definição dos vertices dos triangulos
	this.indices = [
            0, 1, 2, 
			3, 2, 1,
			4, 5, 6
        ];
		
	//o objeto é desenhado a partir de triangulos
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
