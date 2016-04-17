/**
 * MyPaperPlaneAnimation
 * @constructor
 */
 function MyPaperPlaneAnimation(scene, x, y, z) {
 	CGFobject.call(this,scene);

    this.plane = new MyPaperPlane(scene);
 	this.initBuffers();
	
	//Initial values
	this.X0 = x;
	this.Y0 = y;
	this.Z0 = z;
	
	//Current positions
 	this.X = this.X0;
 	this.Y = this.Y0;
 	this.Z = this.Z0;
 	this.angle = 0;

	//Speeds
	this.stepX = 0;
 	this.stepY = 0.1;
 	this.stepZ = -2;
 	this.angleStep = 5;

 	this.state ={
 	      AscendingTrajectory:1,
 	      DescendingTrajectory:2,
 	      Stopped:3
 	}

 	this.currentState = this.state.AscendingTrajectory;

 	//Object.freeze(this.state);

	//Animation related methods
	this.initialTime = 0;	// Initial time in miliseconds
    this.elapsedTime = 0;	// Elapsed time in SECONDS
 };

MyPaperPlaneAnimation.prototype = Object.create(CGFobject.prototype);
MyPaperPlaneAnimation.prototype.constructor = MyPaperPlaneAnimation;

 MyPaperPlaneAnimation.prototype.display = function() {
	var degToRad = Math.PI*2 / 360;
	
	this.scene.translate(this.X, this.Y, this.Z);
	this.scene.rotate(this.angle * degToRad, 1, 0, 0);
   	this.plane.display();
   
 };

 MyPaperPlaneAnimation.prototype.update = function(currTime){

	if (this.initialTime == 0)
	{
		this.initialTime = currTime;
	}

	else{	
	this.elapsedTime = (currTime - this.initialTime)/1000;
		
	if(this.currentState == this.state.AscendingTrajectory){
		this.Z = this.Z0 + this.elapsedTime*this.stepZ;
		if(this.Z <= 0.35){
			this.currentState = this.state.DescendingTrajectory;
			this.initialTime = 0;
			this.stepZ = 0;
			this.stepY = -1.5;
		}
	} else if(this.currentState == this.state.DescendingTrajectory){
		this.Y = this.Y0 + this.elapsedTime*this.stepY;
		if(this.angle <= 90)
			this.angle += this.elapsedTime*this.angleStep;
		if(this.Y - 0.75 <= 0){
			this.currentState = this.state.Stopped;
		}
	}

	}
	
 }