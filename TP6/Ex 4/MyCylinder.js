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

	var incS = 0;
	var incT = 0;
	var counter = 0;
	for(var j = 0; j <= this.stacks; j++){
		for(var i = 0; i < this.slices; i++){
			//posição x e y dos dois vértices de uma mesma face
			x = Math.cos(i * ang); 
			y = Math.sin(i * ang);

			this.vertices.push(x, y, j / this.stacks);
			counter++;
			this.normals.push(Math.cos(i * ang + ang / 2), Math.sin(i * ang + ang/2), 0);
			this.texCoords.push(incS, incT);
			incS+=1/this.slices;
 		}
 		incS = 0;
		incT += 1/this.stacks;
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

	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0, 1);

	var lastVertex = this.slices  + this.slices * this.stacks;
	for(var i = 0; i < this.slices; i++){
		if(i == this.slices - 1)
 				this.indices.push(i, lastVertex , 0);
 			else this.indices.push(i, lastVertex , i + 1);

			if(i == this.slices - 1)
				this.indices.push(0, lastVertex , this.slices);
 			else this.indices.push(i + 1, lastVertex , i + 1);
	}

	this.vertices.push(0, 0, 1);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0, 1);

	lastVertex = this.slices  + this.slices * this.stacks + 1;
	var lastStackVertex = this.slices * this.stacks - 1;
	for(var i = 0; i < this.slices; i++){
		if(i == this.slices - 1)
 				this.indices.push(lastStackVertex + i, lastStackVertex, lastVertex);
 			else this.indices.push(lastStackVertex + i, lastStackVertex +i + 1, lastVertex);

			if(i == this.slices - 1)
				this.indices.push(lastStackVertex, lastStackVertex + this.slices, lastVertex);
 			else this.indices.push(lastStackVertex + i + 1,lastStackVertex+  i + 1, lastVertex);
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };