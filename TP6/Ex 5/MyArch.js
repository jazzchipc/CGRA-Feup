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

	this.precision = 0.05;
	
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

	for(var t = 0; t < 1; t += this.precision)
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

	/*
	There are (1/precision * 2 + 2) points total on both lines.
	We want the cycle to end 4 points before the end (it draws the last rectangle of the line).
	The first push draws the first half of the rectangle. The second draws the second.
	The second push order is inverted, so that the face turns the right way.
	*/
	for(var i = 0; i <= 1/this.precision * 2 - 3; i+=2)
	{
	    this.indices.push(i, i+1, i+2);
	    this.indices.push(i+1, i+3, i+2);
 	} 


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
 