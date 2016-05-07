var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 1;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.light0 = true;
	this.light1 = false; 
	this.light2 = true;
	this.light3 = false;

	this.animateClock = true; 
	this.speed = 3;

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	this.enableTextures(true);


	// Scene elements
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this, 8, 20);
	this.table = new MyTable(this);
	this.rightWall = new Plane(this);
	this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0, 1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);
	this.clock = new MyClock(this, 12, 1);
	this.drone = new MyDroneHandler(this, 4.5, 4, 8, -180);

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("../resources/images/floor.png")

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("../resources/images/window.png")
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("../resources/images/board.png")	
	this.boardAppearance.setDiffuse(0.3, 0.3, 0.3,1);
	this.boardAppearance.setSpecular(0.6, 0.6, 0.6,1);	
	this.boardAppearance.setShininess(120);

	this.slidesAppearance= new CGFappearance(this);
	this.slidesAppearance.loadTexture("../resources/images/slides.png")	
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9,1);
	this.slidesAppearance.setSpecular(0.2, 0.2, 0.2,1);	
	this.slidesAppearance.setShininess(30);

	this.columnAppearance = new CGFappearance(this);
	this.columnAppearance.loadTexture("../resources/images/Column.png")	
	this.columnAppearance.setDiffuse(0.3, 0.3, 0.3, 1);

	//Set update function
	this.updatePeriod = 60;
	this.setUpdatePeriod(this.updatePeriod);

};

LightingScene.prototype.AnimateClock = function (){
	if(this.animateClock)
		this.animateClock = false;
	else
		this.animateClock = true;
	
};

LightingScene.prototype.update = function(currTime){
	if(this.animateClock)
		this.clock.update(currTime);
	this.drone.update(currTime);
}

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0,0,0, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1, 1, 0, 1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].enable();

	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].enable();
};

LightingScene.prototype.updateLights = function() {
	
	for (i = 0; i < this.lights.length; i++){
		this.lights[i].update();
	}

	if(this.light0)
		this.lights[0].enable();
	else this.lights[0].disable();


	if(this.light1)
		this.lights[1].enable();
	else this.lights[1].disable();

	if(this.light2)
		this.lights[2].enable();
	else this.lights[2].disable();

	if(this.light3)
		this.lights[3].enable();
	else this.lights[3].disable();
		

}


LightingScene.prototype.display = function() {

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	this.materialDefault.apply();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();

	this.materialDefault.apply();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.rightWall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
	this.translate(2, 0, 6);
	this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
	this.translate(9, 0, 6);
		this.table.display();
	this.popMatrix();

	// default material apply
	this.materialDefault.apply();
	
	// Board A
	this.pushMatrix();
	this.translate(4, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	this.slidesAppearance.apply();
	this.boardA.display();
	this.popMatrix();

	this.materialDefault.apply();

	// Board B
	this.pushMatrix();
	this.translate(10.5, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	this.boardAppearance.apply();
	this.boardB.display();
	this.popMatrix();

	this.materialDefault.apply();

	// cylinder 1
	this.pushMatrix();
	this.translate(4, 0, 12);
	this.rotate(-90 * degToRad, 1, 0, 0)
	this.scale(1, 1, 10);
	this.columnAppearance.apply();
	this.cylinder.display();
	this.popMatrix();
	
	// cylinder 2
	this.pushMatrix();
	this.translate(12, 0, 3);
	this.rotate(-90 * degToRad, 1, 0, 0)
	this.scale(1, 1, 10);
	this.cylinder.display();
	this.popMatrix();

	this.materialDefault.apply();

	// lamp
	this.pushMatrix();
	this.translate(8, 8, 8);
	this.rotate(-90 * degToRad, 1, 0, 0)
	this.lamp.display();
	this.popMatrix();

	//clock
	this.pushMatrix();
	this.translate(7.25, 7.20, 0);
	this.scale(0.75, 0.75, 0.15);
	this.clock.display();
	this.popMatrix();

	//drone
	this.pushMatrix();
	this.drone.display();
	this.popMatrix();

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// ---- END Primitive drawing section

};
