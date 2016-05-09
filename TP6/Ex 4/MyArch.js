/**
 *	MyArch
 *	Class that defines the drone's arch connecting body and legs.
 *	Vertices are calculated according to a Bezier QUADRATIC curve.
 */
 function MyArch(scene) {
 	CGFobject.call(this,scene);
	
	this.p0 = [0,1];	// point of beggining of the curve
	this.p1 = [1,0];	// point of end of curve
	this.p = [1,4];	// point which adjusts the curve
	
	this.width = 1;		// width of the arc in Z direction
	
 	this.initBuffers();
 };

MyArch.prototype = Object.create(CGFobject.prototype);
MyArch.prototype.constructor = MyArch;

 MyArch.prototype.initBuffers = function() {
 	
	this.vertices = [];
	this.normals = [];
	this.indices = [];
	this.texCoords = [];

	var ang = Math.PI*2/this.slices;
 	var xt, yt;

	for(var t = 0; t < 1; t += 0.05)
	{
		// Bezier Equations
		xt = Math.pow(1-t, 2) * this.p0[0] + 2 * (1-t) * t * this.p[0] + Math.pow(t, 2) * this.p1[0];
		yt = Math.pow(1-t, 2) * this.p0[1] + 2 * (1-t) * t * this.p[1] + Math.pow(t, 2) * this.p1[1];	
		
		// Push vertices in both curves
		this.vertices.push(xt, yt, 0);	
		this.vertices.push(xt, yt, this.width);

		this.normals.push(xt, yt, 0);
		this.normals.push(xt, yt, 0);
		
		this.texCoords.push(xt, yt);
		this.texCoords.push(xt, yt);
	}

	for(var i = 1; i <= 1/0.05 * 2 - 2; i++){
	    this.indices.push(i-1, i, i+1);
 	} 


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 