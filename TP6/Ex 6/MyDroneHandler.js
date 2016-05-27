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
 	this.drone.hook.updateCoordinates(this.X/2, this.Y/2, this.Z/2);
 	this.angle = 0;

	this.angleStep = 5;
	this.motionVelocity = 0;
	this.floatVelocity = 0;
	this.acceleration = 0.8;
	this.friction = 0.4;
	this.maxVelocity = Math.sqrt(this.acceleration/this.friction);
 	this.maxTime = 2.5/(this.maxVelocity);
 	this.slowRotation = 0.1 * 360;
 	this.normalRotation = 1 * 360;
 	this.fastRotation = 10 * 360;
 	this.rotationFactor = 1;

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

 	this.delivery ={
 	      Collecting:1,
 	      Delivering:2,
 	      Delivered:3,
 	}

 	this.motionState = this.motionTrajectory.Stopped;
 	this.floatState = this.floatTrajectory.Stopped;
 	this.packageState = this.delivery.Collecting;

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

MyDroneHandler.prototype.rotate = function(orientation){
  this.angle += this.angleStep*orientation;
  this.drone.setHelicesRotationSpeed(this.slowRotation, this.slowRotation, this.fastRotation, this.fastRotation)
}

MyDroneHandler.prototype.staticMovement = function(){
  this.drone.setHelicesRotationSpeed(this.normalRotation, this.normalRotation, this.normalRotation, this.normalRotation)
}

MyDroneHandler.prototype.setRotationFactor = function(rotationFactor){
  this.rotationFactor = rotationFactor;
}

MyDroneHandler.prototype.stopMove = function(){
	if(this.motionState == this.motionTrajectory.Forward || this.motionState == this.motionTrajectory.Backward){
		this.motionState = this.motionTrajectory.Halting;
	}
}

MyDroneHandler.prototype.move = function(orientation){
	if(this.motionState == this.motionTrajectory.Stopped){
		if(orientation == 1){
			this.motionState = this.motionTrajectory.Forward;
		} else this.motionState = this.motionTrajectory.Backward;
		this.motionTime = 0;
		this.motionTimeStart = this.elapsedTime;
	} else if(this.motionState == this.motionTrajectory.Halting){
		this.motionTime = Math.log((-Math.abs(this.motionVelocity) - this.maxVelocity)/(Math.abs(this.motionVelocity) - this.maxVelocity))/(2* Math.sqrt(this.acceleration*this.friction));
		if(orientation == 1){
			this.motionState = this.motionTrajectory.Forward;
		} else this.motionState = this.motionTrajectory.Backward;
		this.motionTimeStart = this.elapsedTime;	
	}
	
	//completar
}

MyDroneHandler.prototype.fly = function(orientation){
	if(this.floatState == this.floatTrajectory.Stopped){
		if(orientation == 1){
			this.floatState = this.floatTrajectory.Upward;
		} else this.floatState = this.floatTrajectory.Downward;
		this.floatTime = 0;
		this.floatTimeStart = this.elapsedTime;
	} else if(this.floatState == this.floatTrajectory.Halting){
		this.floatTime = Math.log((-Math.abs(this.floatVelocity) - this.maxVelocity)/(Math.abs(this.floatVelocity) - this.maxVelocity))/(2* Math.sqrt(this.acceleration*this.friction));
		if(orientation == 1){
			this.floatState = this.floatTrajectory.Upward;
		} else this.floatState = this.floatTrajectory.Downward;
		this.floatTimeStart = this.elapsedTime;
	}
	
	//completar -> falta quando o estado é upward e downward
}

MyDroneHandler.prototype.stopFly = function(){
	if(this.floatState == this.floatTrajectory.Upward || this.floatState == this.floatTrajectory.Downward){
		this.floatState = this.floatTrajectory.Halting;
	}
}

MyDroneHandler.prototype.retrieveHook = function(){
	this.drone.hook.scaleHook(-0.3);
}

MyDroneHandler.prototype.releaseHook = function(){
	this.drone.hook.scaleHook(0.3);
}

MyDroneHandler.prototype.update = function(currTime){
	if (this.initialTime == 0)
	{
		this.initialTime = currTime;
	}

	else{	
		this.elapsedTime = (currTime - this.initialTime)/1000;
		this.drone.setHelicesAngle(this.elapsedTime, this.rotationFactor);
	
		if(this.motionState == this.motionTrajectory.Forward){
			this.motionTime = this.elapsedTime - this.motionTimeStart;
			this.motionVelocity = (this.maxVelocity * (Math.exp(2* Math.sqrt(this.acceleration*this.friction) * this.motionTime)- 1))/(Math.exp(2* Math.sqrt(this.acceleration*this.friction) * this.motionTime) + 1);

			if(this.motionTime > this.maxTime){
				this.motionState = this.motionTrajectory.Halting;
				console.log(this.motionVelocity);
			}
		} else if(this.motionState == this.motionTrajectory.Backward){
			this.motionTime = this.elapsedTime - this.motionTimeStart;
			this.motionVelocity = (this.maxVelocity * (Math.exp(2* Math.sqrt(this.acceleration*this.friction) * this.motionTime)- 1))/(Math.exp(2* Math.sqrt(this.acceleration*this.friction) * this.motionTime) + 1);
			this.motionVelocity *= -1;
			if(this.motionTime > this.maxTime){
				this.motionState = this.motionTrajectory.Halting;
			}
		} else if(this.motionState == this.motionTrajectory.Halting){
			if(Math.abs(this.motionVelocity) < 0.01)
				this.motionState = this.motionTrajectory.Stopped;
			this.motionVelocity *= 0.95;
		} else{
			this.motionVelocity = 0;
		}


		if(this.floatState == this.floatTrajectory.Upward){
			this.floatTime = this.elapsedTime - this.floatTimeStart;
			this.floatVelocity = (this.maxVelocity * (Math.exp(2* this.acceleration*this.friction * this.floatTime)- 1))/(Math.exp(2* this.acceleration*this.friction * this.floatTime) + 1);
			if(this.floatTime > this.maxTime){
				this.floatState = this.floatTrajectory.Halting;
			}
		} else if(this.floatState == this.floatTrajectory.Downward){
			if(this.floatTime > this.maxTime){
				this.floatState = this.floatTrajectory.Halting;
			}
			this.floatTime = this.elapsedTime - this.floatTimeStart;
			this.floatVelocity = (this.maxVelocity * (Math.exp(2* this.acceleration*this.friction * this.floatTime)- 1))/(Math.exp(2* this.acceleration*this.friction * this.floatTime) + 1);
			this.floatVelocity *= -1;
		} else if(this.floatState == this.floatTrajectory.Halting){
			if(Math.abs(this.floatVelocity) < 0.01)
				this.floatState = this.floatTrajectory.Stopped;
			this.floatVelocity *= 0.95;
		} else{
			this.floatVelocity = 0;
		}

		this.X += this.motionVelocity * Math.sin(this.angle*degToRad);
		this.Z += this.motionVelocity * Math.cos(this.angle*degToRad);
		this.Y += this.floatVelocity;
 		this.drone.hook.updateCoordinates(this.X/2, this.Y / 2, this.Z/2);
	}
 }

 MyDroneHandler.prototype.updateTexturesIndex = function(bodyIndex, legIndex, heliceIndex){
 	this.drone.bodyTextureIndex = bodyIndex;
 	this.drone.legTextureIndex = legIndex;
 	this.drone.heliceTextureIndex = heliceIndex;
 }

 MyDroneHandler.prototype.checkCargoLoad = function(SceneCargo){
 	console.log('Cargo x value: ', SceneCargo.X);
 	console.log('Cargo Y value: ', SceneCargo.Y);
 	console.log('Cargo Z value: ', SceneCargo.Z);
 	console.log('hook x value: ', this.drone.hook.x);
 	console.log('hook Y value: ', this.drone.hook.y);
 	console.log('hook Z value: ', this.drone.hook.z);
 	if(SceneCargo.Y < this.drone.hook.y && this.drone.hook.y < (SceneCargo.Y + 0.1)
 		|| SceneCargo.Y > this.drone.hook.y && this.drone.hook.y > (SceneCargo.Y - 0.1)){
 		
 		var circle = {x:this.drone.hook.x, z:this.drone.hook.z, radius:this.drone.hook.radius};
 		var rectangle = {x:SceneCargo.X, z:SceneCargo.Z, length:1};
		var collision = RectCircleColliding(circle, rectangle);
		if(collision){
			this.packageState = this.delivery.Delivering;
		}
 	}
 }


function RectCircleColliding(circle, rectangle){
	//distances between the circle’s center and the rectangle’s center
	var halfRectangleLength = rectangle.length/2;
    var distX = Math.abs(circle.x - rectangle.x-halfRectangleLength);
    var distZ = Math.abs(circle.z - rectangle.z-halfRectangleLength);

	//If the distance is greater than halfCircle + halfRect means that they are too far apart to be colliding
    if (distX > (halfRectangleLength + circle.radius))
    	return false; 
    if (distZ > (halfRectangleLength + circle.radius))
    	return false;

	//If the distance is less than halfRect then they are definitely colliding
    if (distX <= (rectangle.length/2))
    	return true;
    if (distZ <= (rectangle.length/2))
    	return true;

    var dx=distX-rectangle.length/2;
    var dz=distZ-rectangle.length/2;
    return (dx*dx+dz*dz<=(circle.radius*circle.rradius));
}