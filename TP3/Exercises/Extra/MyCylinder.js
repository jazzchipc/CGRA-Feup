/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	
	this.vertices = [];
	this.normals = [];
	this.indices = [];
 	var ang = Math.PI*2/this.slices;
 	var x, y;

	for(var j = 0; j <= this.stacks; j++){
		for(var i = 0; i < this.slices; i++){
			//posição x e y dos dois vértices de uma mesma face
			x = Math.cos(i * ang); 
			y = Math.sin(i * ang);

			this.vertices.push(x, y, j / this.stacks);
			this.normals.push(x, y, j / this.stacks);
 		}
	}

	for(var j = 0; j < this.stacks; j++){
 		for(var i = 0; i < this.slices; i++){
 			if(i == this.slices - 1)
 				this.indices.push(i + this.slices * j, 0 + this.slices * j, this.slices + i + this.slices * j);
 			else this.indices.push(i + this.slices * j, i + 1 + this.slices * j, this.slices + i + this.slices * j);

			if(i == this.slices - 1)
				this.indices.push(0 + this.slices * j, this.slices + this.slices * j, this.slices + i + this.slices * j);
 			else this.indices.push(i + 1 + this.slices * j, this.slices + i + 1 + this.slices * j, this.slices + i + this.slices * j);
 		} 
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };