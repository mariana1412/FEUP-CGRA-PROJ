/**
* MyStabilizer
* @constructor
*/
class MyStabilizer extends CGFobject {
    constructor(scene) {
        super(scene);

        this.quad = new My2SideQuad(this.scene);
        this.triangle = new MyTriangle(this.scene);
        
        this.initBuffers();
    }
    
    initBuffers(){
        this.quad.initBuffers();
        this.triangle.initBuffers();
    }
    

    display(){
        this.scene.pushMatrix();
        this.scene.scale(1/3, 1/3, 1/3);
        
        //quad
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2.0, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.scale(1, 1/Math.sqrt(8), 1/Math.sqrt(8));
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        
        this.scene.popMatrix();
    }
}


