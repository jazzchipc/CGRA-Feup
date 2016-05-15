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
	this.velocity = 0;
	this.upwardVelocity = 0;
	this.acceleration = 0.02;
	this.friction = 0.7;
 	this.slowRotation = 0.2 * 360;
 	this.normalRotation = 1 * 360;
 	this.fastRotation = 10 * 360;

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
	this.velocity = Math.sqrt(this.acceleration/this.friction) * (Math.exp(2*Math.sqrt(this.acceleration*this.friction) * this.elapsedTime)- 1)/(Math.exp(2*Math.sqrt(this.acceleration*this.friction) * this.elapsedTime) + 1);
	this.velocity *= orientation;
}

MyDroneHandler.prototype.fly = function(orientation){
	this.upwardVelocity = Math.sqrt(this.acceleration/this.friction) * (Math.exp(2*Math.sqrt(this.acceleration*this.friction) * this.elapsedTime)- 1)/(Math.exp(2*Math.sqrt(this.acceleration*this.friction) * this.elapsedTime) + 1);
	this.upwardVelocity *= orientation;
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

		this.X += this.velocity * Math.sin(this.angle*degToRad);
		this.Z += this.velocity * Math.cos(this.angle*degToRad);
		this.Y += this.upwardVelocity;

		this.velocity *= this.friction;
		this.upwardVelocity *= this.friction;
	}
 }

 MyDroneHandler.prototype.updateTexturesIndex = function(bodyIndex, legIndex, heliceIndex){
 	this.drone.bodyTextureIndex = bodyIndex;
 	this.drone.legTextureIndex = legIndex;
 	this.drone.heliceTextureIndex = heliceIndex;
 }