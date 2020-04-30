/**
 * MyVehicleBody
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicleBody extends CGFobject {
    
    constructor(scene) {
        super(scene);

        this.sphere = new MySphere(this.scene, 16, 8);
        this.stabilizer = new MyStabilizer(scene);
        this.gondola = new MyGondola(scene);
        this.helix = new MyHelix(scene);

        this.stabilizerDir = 0;
        this.helixAng = 0;  
    }   
   
    setHelixAng(angle){
        this.helixAng = angle * Math.PI /180.0;
    }

	display() {
        //this.scene.setAmbient(0.5, 0.5, 0.5, 1.0);
        
        this.scene.pushMatrix();
        //this.scene.translate(0, 10, 0);
        //this.scene.rotate(Math.PI/2.0,0,1,0);
        
        //sphere- balao
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5, 1);
        this.sphere.display();
        this.scene.popMatrix();

        //Gondola
        this.gondola.display();
     

        //Helix
        this.scene.pushMatrix();
        this.scene.translate(0.1, -0.50, -0.35);
        this.scene.scale(0.05, 0.05, 0.1);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-0.1, -0.50, -0.35);
        this.scene.scale(0.05, 0.05, 0.1);
        this.sphere.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.1, -0.50, -0.45);
        this.scene.scale(0.09, 0.09, 0.09);
        this.scene.rotate(this.helixAng, 0, 0, 1);
        this.helix.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1, -0.50, -0.45);
        this.scene.scale(0.09, 0.09, 0.09);
        this.scene.rotate(this.helixAng, 0, 0, 1);
        this.helix.display();
        this.scene.popMatrix();

        
        //Stabilizers
        //top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.32, -1);
        //this.scene.rotate(this.stabilizerDir, 0,1,0);
        this.scene.rotate(Math.PI/2.0,0,0,1);
        this.stabilizer.display();
        this.scene.popMatrix();

        //bottom
        this.scene.pushMatrix();
        this.scene.translate(0,-0.32,-1);
        //this.scene.rotate(this.stabilizerDir,0,1,0);
        this.scene.rotate(3*Math.PI/2.0,0,0,1);
        this.stabilizer.display();
        this.scene.popMatrix();

        //left
        this.scene.pushMatrix();
        this.scene.translate(0.35,0,-1);
        this.stabilizer.display();
        this.scene.popMatrix();

        //right
        this.scene.pushMatrix();
        this.scene.translate(-0.35,0,-1);
        this.scene.rotate(Math.PI,0,0,1);
        this.stabilizer.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    
    
}

