/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
 	
	this.vertices = [];
	this.normals = [];
	this.indices = [];
 	var ang = Math.PI*2/this.slices;
 	var x, y;

	for(var j = 0; j <= this.stacks; j++){
		for(var i = 0; i < this.slices; i++){
			
			//lampada com z máximo igual a 1
			z = 1 / this.stacks * j; 
			
			//com o aumento de z, diminui o raio
			raio = 2 * Math.sin (Math.acos (z));

			//x e y dependem do raio
			x = Math.cos(i * 2*Math.PI / this.slices) * raio;
			y = Math.sin(i * 2*Math.PI / this.slices) * raio;

			this.vertices.push(x, y, z);
			this.normals.push(x, y, z);
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