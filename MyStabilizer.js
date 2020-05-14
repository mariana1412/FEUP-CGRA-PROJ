/**
* MyStabilizer
* @method constructor
* @param scene - Reference to MyScene object
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
        this.scene.scale(1.5,1.5,1.5);


        //quad
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2.0, 1, 0, 0);
        this.scene.scale(0.2,0.2,0.2);
        this.quad.display();
        this.scene.popMatrix();

         //Triangle
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.2);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.rotate(Math.PI/2.0, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        
        this.scene.popMatrix();
    }
}


