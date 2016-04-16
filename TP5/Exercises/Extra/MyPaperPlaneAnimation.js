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
 	this.stepZ = -0.5;
 	this.angleStep = 0;

 	this.state ={
 	      AscendingTrajectory:1,
 	      Collision:2,
 	      DescendingTrajectory:3,
 	      Stopped:4
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
	 
   if(this.currentState == this.state.DescendingTrajectory){
	   this.scene.translate(this.X, this.Y, this.Z);
        this.scene.rotate(this.angle * degToRad, 1, 0, 0);
   } else{
        this.scene.translate(this.X, this.Y, this.Z);
   }
	
   this.plane.display();
   
 };

 MyPaperPlaneAnimation.prototype.update = function(currTime){

	if (this.initialTime == 0)
	{
		this.initialTime = currTime;
	}

	else
	{
		if (this.currentState == this.state.AscendingTrajectory)	// if it's flying
		{
			if (this.Z <= 0)	//if it collides with the wall
			{
				this.currentState = this.state.Collision;
				
				//Reset initial conditions for different kind of movement
				this.initialTime = 0;
				this.X0 = this.X;
				this.Y0 = this.Y;
				this.Z0 = this.Z;
			}
			
			// else continues to fly
		}
		
		if (this.currentState == this.state.Collision)	// if it hits
		{
			this.currentState = this.state.DescendingTrajectory;	// it starts falling
			
			this.angleStep = 5;
		}
		
		if (this.currentState == this.state.DescendingTrajectory)
		{
			if (this.Y >= 0)
			{
				if (this.angle >= 90)
				{
					this.angleStep = 0;
				}
				
				this.stepX = 0;
				this.stepY = -0.9;
				this.stepZ = 0;
			}
			
			/*else
			{
				this.currentState = this.state.Stopped;
				
				//Reset initial conditions for different kind of movement
				this.initialTime = 0;
				this.X0 = this.X;
				this.Y0 = this.Y;
				this.Z0 = this.Z;
			}*/
		}
			
		if (this.currentState == this.state.Stopped)
		{
			{
				this.stepY = 0;
			}
			
		}
		
		//Update positions
	    this.elapsedTime = (currTime - this.initialTime)/1000;
		this.X = this.X0 + this.elapsedTime * this.stepX;
		this.Y = this.Y0 + this.elapsedTime * this.stepY;
		this.Z = this.Z0 + this.elapsedTime * this.stepZ;
		this.angle  += this.angleStep;
	}
	
 }