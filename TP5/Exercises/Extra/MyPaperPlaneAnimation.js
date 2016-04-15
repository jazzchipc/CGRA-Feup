/**
 * MyPaperPlaneAnimation
 * @constructor
 */
 function MyPaperPlaneAnimation(scene, x, y, z) {
 	CGFobject.call(this,scene);

    this.plane = new MyPaperPlane(scene);
 	this.initBuffers();
 	this.X = x;
 	this.Y = y;
 	this.Z = z;
 	this.angle = 0;

 	this.stepY = 0.1;
 	this.stepZ = -0.5;
 	this.angleStep = 5;

 	this.state ={
 	      AscendingTrajectory:1,
 	      Collision:2,
 	      DescendingTrajectory:3,
 	      Stopped:4
 	}

 	this.currentState = this.state.Collision;

 	Object.freeze(this.state);

	//Animation related methods
	this.initialTime = 0;	// Initial time in miliseconds
    this.elapsedTime = 0;	// Elapsed time in SECONDS
 };

MyPaperPlaneAnimation.prototype = Object.create(CGFobject.prototype);
MyPaperPlaneAnimation.prototype.constructor = MyPaperPlaneAnimation;

 MyPaperPlaneAnimation.prototype.display = function() {
   if(this.currentState == this.state.Collision){
         this.scene.rotate(this.angleStep * degToRad, 1, 0, 0);
   } else{
        this.scene.translate(0 , this.elapsedTime * this.stepY, this.elapsedTime * this.stepZ);
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
	    if(this.Z == 0 &&  this.currentState == this.state.AscendingTrajectory){
	        this.currentState = this.state.Collision;
	        this.angleStep = 5;
	    } else if(this.angle == 90 &&  this.currentState == this.state.Collision){
            this.currentState = this.state.DescendingTrajectory;
 	        this.stepY = -0.5;
 	        this.stepZ = 0;

	    } else if(this.Y == 0 &&  this.currentState == this.state.DescendingTrajectory){
            this.currentState = this.state.Stopped;
 	        this.stepY = 0;
	    }

	    this.elapsedTime = (currTime - this.initialTime)/1000;
		this.X += this.elapsedTime * this.stepX;
		this.Y += this.elapsedTime * this.stepY;
		this.Z += this.elapsedTime * this.stepZ;
		this.angle  += this.angleStep;
	}
	
 }