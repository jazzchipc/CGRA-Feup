/**
 * MyDroneHandler
 * @constructor
 */
 function MyDroneHandler(scene, x, y, z, angle) {
 	CGFobject.call(this,scene);

 	this.drone = new MyDrone(scene);

 	this.X = x;
 	this.Y = y;
 	this.Z = z;
 	this.angle = 0;

	this.angleStep = 5;
	this.motionVelocity = 0;
	this.floatVelocity = 0;
	this.acceleration = 0.8;
	this.friction = 0.4;
	this.maxVelocity = Math.sqrt(this.acceleration/this.friction);
 	this.maxTime = 2.5/(this.maxVelocity);
 	this.slowRotation = 0.2 * 360;
 	this.normalRotation = 1 * 360;
 	this.fastRotation = 10 * 360;

 	this.motionTime = 0;
 	this.motionTimeStart = 0;
 	this.floatTime = 0;
 	this.floatTimeStart = 0;

 	this.motionTrajectory ={
 	      Forward:1,
 	      Backward:2,
 	      Halting:3,
 	      Stopped:4
 	}

 	this.floatTrajectory ={
 	      Upward:1,
 	      Downward:2,
 	      Halting:3,
 	      Stopped:4
 	}

 	this.motionState = this.motionTrajectory.Stopped;
 	this.floatState = this.floatTrajectory.Stopped;

 	//Animation related methods
	this.initialTime = 0;	// Initial time in miliseconds
    this.elapsedTime = 0;	// Elapsed time in SECONDS
 };

MyDroneHandler.prototype = Object.create(CGFobject.prototype);
MyDroneHandler.prototype.constructor = MyDroneHandler;

MyDroneHandler.prototype.display = function() {
    this.scene.translate(this.X, this.Y, this.Z );
    this.scene.rotate(this.angle*degToRad, 0, 1, 0);
    this.drone.display();
}

MyDroneHandler.prototype.setRotation = function(orientation){
  this.angle += this.angleStep*orientation;
}

MyDroneHandler.prototype.move = function(orientation){
	if(this.motionState == this.motionTrajectory.Stopped){
		if(this.orientation == 1){
			this.motionState = this.motionTrajectory.Forward;
		} else this.motionState = this.motionTrajectory.Backward;
		this.motionTime = 0;
		this.motionTimeStart = this.elapsedTime;
	}
}

MyDroneHandler.prototype.fly = function(orientation){
	if(this.floatState == this.floatTrajectory.Stopped){
		if(this.orientation == 1){
			this.floatState = this.floatTrajectory.Upward;
		} else this.floatState = this.floatTrajectory.Downward;
		this.floatTime = 0;
		this.floatTimeStart = this.elapsedTime;
	}
}

MyDroneHandler.prototype.update = function(currTime){
	if (this.initialTime == 0)
	{
		this.initialTime = currTime;
	}

	else{	
		this.elapsedTime = (currTime - this.initialTime)/1000;
		var rotation = this.normalRotation * this.elapsedTime;
		this.drone.setHelicesRotation(rotation, rotation, rotation ,rotation);
	
		if(this.motionState == this.motionTrajectory.Forward){
			this.motionTime = this.elapsedTime - this.motionTimeStart;
			this.motionVelocity = (this.maxVelocity * (Math.exp(2* this.maxVelocity * this.motionTime)- 1))/(Math.exp(2* this.maxVelocity * this.motionTime) + 1);

			if(this.motionTime > this.maxTime){
				this.motionState = this.motionTrajectory.Halting;
			}
		} else if(this.motionState == this.motionTrajectory.Backward){

		} else if(this.motionState == this.motionTrajectory.Halting){

		} else{
			this.motionVelocity = 0;
		}


		if(this.floatState == this.floatTrajectory.Upward){
			this.floatTime = this.elapsedTime - this.floatTimeStart;
			this.floatVelocity = (this.maxVelocity * (Math.exp(2* this.maxVelocity * this.floatTime)- 1))/(Math.exp(2* this.maxVelocity * this.floatTime) + 1);
			
			if(this.floatTime > this.maxTime){
				this.floatState = this.floatTrajectory.Halting;
			}
		} else if(this.floatState == this.floatTrajectory.Downward){

		} else if(this.floatState == this.floatTrajectory.Halting){

		} else{
			this.floatVelocity = 0;
		}

		this.X += this.motionVelocity* 0.04 * Math.sin(this.angle*degToRad);
		this.Z += this.motionVelocity* 0.04 * Math.cos(this.angle*degToRad);
		this.Y += this.floatVelocity * 0.04;
	}
 }

 MyDroneHandler.prototype.updateTexturesIndex = function(bodyIndex, legIndex, heliceIndex){
 	this.drone.bodyTextureIndex = bodyIndex;
 	this.drone.legTextureIndex = legIndex;
 	this.drone.heliceTextureIndex = heliceIndex;
 }