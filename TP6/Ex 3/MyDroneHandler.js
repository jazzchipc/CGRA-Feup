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
 	this.angle = angle;

	this.angleStep = 5;
 	this.step = 0.2;

 	//Animation related methods
	this.initialTime = 0;	// Initial time in miliseconds
    this.elapsedTime = 0;	// Elapsed time in SECONDS
 };

MyDroneHandler.prototype = Object.create(CGFobject.prototype);
MyDroneHandler.prototype.constructor = MyDroneHandler;

MyDroneHandler.prototype.display = function() {
    this.scene.translate(this.X, this.Y, this.Z);
    this.scene.rotate(this.angle*degToRad, 0, 1, 0);
    this.drone.display();
}

MyDroneHandler.prototype.setRotation = function(orientation){
  this.angle += this.angleStep*orientation;
}

MyDroneHandler.prototype.setTranslation = function(acceleration, y){
    this.X += this.step*acceleration * Math.sin(this.angle*degToRad);
    this.Y += this.step*y;
    this.Z += this.step*acceleration * Math.cos(this.angle*degToRad);
    
}

MyDroneHandler.prototype.update = function(currTime){
	if (this.initialTime == 0)
	{
		this.initialTime = currTime;
	}

	else{	
	this.elapsedTime = (currTime - this.initialTime)/1000;
	}
	
 }