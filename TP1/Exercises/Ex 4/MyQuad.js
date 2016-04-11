/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {

	//Vertices do objeto (x, y, z)
	this.vertices = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0,
			];

	//definição dos vertices dos triangulos
	this.indices = [
            0, 1, 2, 
			3, 2, 1,
        ];
		
	//o objeto é desenhado a partir de triangulos
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};