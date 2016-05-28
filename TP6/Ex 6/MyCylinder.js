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
	this.texCoords = [];
 	var ang = Math.PI*2/this.slices;
 	var x, y;
 	var counter = 0;

	for(var j = 0; j <= this.stacks; j++){
		for(var i = 0; i <= this.slices; i++){
			//posição x e y dos dois vértices de uma mesma face
			x = Math.cos(i * ang); 
			y = Math.sin(i * ang);

			this.vertices.push(x, y, j / this.stacks);
			this.normals.push(x, y, 0);
			this.texCoords.push(i / this.slices, j / this.stacks); 
			counter++;		
		}
	}

	for(var j = 0; j < this.stacks; j++){
 		for(var i = 0; i <= this.slices + 1; i++){
 			var stack1 = this.slices * j;
 			var stack2 = this.slices * (j + 1);
 	 		this.indices.push(i + stack1, i + 1 + stack1, 1 + i + stack2);
			this.indices.push(i + 1 + stack2, i + stack2, i + stack1);
 		} 
	}

	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0.5, 0.5);

	for(var i = 0; i < this.slices; i++){
		this.indices.push(i, counter, i + 1);
	}

	this.vertices.push(0, 0, 1);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0.5, 0.5);
 	
	for(var i = 0; i < this.slices; i++){
		this.indices.push(counter - 1 - this.slices + i, counter - this.slices + i, counter + 1);
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };