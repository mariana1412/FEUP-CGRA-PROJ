/**
* MyHelix
* @method constructor
* @param  {CGFscene} scene - MyScene object
*/
class MyHelix extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new My2SideQuad(scene);
        this.sphere = new MySphere(scene, 10, 10);
        this.initBuffers();
    }
    
    initBuffers(){
        this.quad.initBuffers();
        this.sphere.initBuffers();
    }
    
    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, (1/Math.SQRT2)/2, 0);
        this.scene.scale(0.5, 1, 1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.5, 0.5, 1);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -(1/Math.SQRT2)/2, 0);
        this.scene.scale(0.5, 1, 1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.5, 0.5, 1);
        this.quad.display();
        this.scene.popMatrix();
    }
}


