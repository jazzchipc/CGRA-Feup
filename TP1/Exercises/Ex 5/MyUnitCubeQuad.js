/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyUnitCubeQuad(scene){
     CGFobject.call(this, scene);

     this.quad = new MyQuad(this.scene);
     this.quad.initBuffers();
}

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function(){
  var deg2rad=Math.PI/180.0;
  var a_rad=90.0*deg2rad;

  //face a apontar para z positivo e para z negativo
  this.scene.pushMatrix();
  this.scene.translate(0, 0, 0.5);
  this.quad.display();
  this.scene.rotate(Math.PI, 1, 0, 0);
  this.scene.translate(0, 0, 1);
  this.quad.display();
  this.scene.popMatrix();
 
  //face a apontar para y positivo e para y negativo
  this.scene.pushMatrix();
  this.scene.rotate(-90*deg2rad, 1, 0, 0);
  this.scene.translate(0, 0, 0.5);
  this.quad.display();
  this.scene.rotate(-180*deg2rad, 1, 0, 0);
  this.scene.translate(0, 0, 1);
  this.quad.display();
  this.scene.popMatrix();

  //face a apontar para x positivo e para x negativo
  this.scene.rotate(a_rad, 0, 1, 0);
  this.scene.translate(0, 0, 0.5);
  this.quad.display();
  this.scene.rotate(Math.PI, 0, 1, 0);
  this.scene.translate(0, 0, 1);
  this.quad.display();


}