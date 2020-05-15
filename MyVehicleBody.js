/**
 * MyVehicleBody
 * @method constructor
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
        this.flag = new MyFlag(scene);

        this.initTextures();
    }   

    updateFlag(speed, time){
        this.flag.update(speed, time);
    }
   
    setHelixAng(angle){
        this.helixAng = angle * Math.PI /180.0;
    }
    setStabilizerDir(angle){
        this.stabilizerDir = angle * Math.PI /180.0;
    }

    initTextures(){
        //Body
        this.blimpBody = new CGFappearance(this.scene);
        this.blimpBody.setAmbient(0.7,0.7,0.7,1);
        this.blimpBody.setDiffuse(0.9,0.9,0.9,1);
        this.blimpBody.setSpecular(0.2,0.2,0.2,1);
        this.blimpBody.setShininess(10.0);
        this.blimpBody.loadTexture('images/vehicleBody.png');
        this.blimpBody.setTextureWrap('REPEAT', 'REPEAT');

        this.redTexture = new CGFappearance(this.scene);
        this.redTexture.setAmbient(0.7,0.7,0.7,1);
        this.redTexture.setDiffuse(0.9,0.9,0.9,1);
        this.redTexture.setSpecular(0.2,0.2,0.2,1);
        this.redTexture.setShininess(10.0);
        this.redTexture.loadTexture('images/redTexture.png');
        this.redTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.blueTexture = new CGFappearance(this.scene);
        this.blueTexture.setAmbient(0.7,0.7,0.7,1);
        this.blueTexture.setDiffuse(0.9,0.9,0.9,1);
        this.blueTexture.setSpecular(0.2,0.2,0.2,1);
        this.blueTexture.setShininess(10.0);
        this.blueTexture.loadTexture('images/blueTexture.png');
        this.blueTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.whiteTexture = new CGFappearance(this.scene);
        this.whiteTexture.setAmbient(0.7,0.7,0.7,1);
        this.whiteTexture.setDiffuse(0.9,0.9,0.9,1);
        this.whiteTexture.setSpecular(0.2,0.2,0.2,1);
        this.whiteTexture.setShininess(10.0);
        this.whiteTexture.loadTexture('images/whiteTexture.png');
        this.whiteTexture.setTextureWrap('REPEAT', 'REPEAT');

    }

	display() {
                
        this.scene.pushMatrix();
        
        //sphere- balao
        
        this.scene.pushMatrix();
        this.blimpBody.apply();
        //this.scene.scale(1, 1, 2);
        this.scene.scale(0.5,0.5, 1);
        this.sphere.display();
        this.scene.popMatrix();

        //Gondola
        this.redTexture.apply();
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
        this.whiteTexture.apply();
        this.scene.translate(-0.1, -0.50, -0.45);
        this.scene.scale(0.09, 0.09, 0.09);
        this.scene.rotate(this.helixAng, 0, 0, 1);
        this.helix.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.whiteTexture.apply();
        this.scene.translate(0.1, -0.50, -0.45);
        this.scene.scale(0.09, 0.09, 0.09);
        this.scene.rotate(this.helixAng, 0, 0, 1);
        this.helix.display();
        this.scene.popMatrix();

        
        //Stabilizers
        this.scene.pushMatrix();
        

        //left
        this.scene.pushMatrix();
        this.whiteTexture.apply();
        this.scene.translate(0.35,0,-1);
        this.stabilizer.display();
        this.scene.popMatrix();

        //right
        this.scene.pushMatrix();
        this.whiteTexture.apply();
        this.scene.translate(-0.35,0,-1);
        this.scene.rotate(Math.PI,0,0,1);
        this.stabilizer.display();
        this.scene.popMatrix();
        
        //top
        this.scene.pushMatrix();
        this.blueTexture.apply();
        this.scene.translate(0, 0.32, -1);
        this.scene.rotate(this.stabilizerDir, 0,1,0);
        this.scene.rotate(Math.PI/2.0,0,0,1);
        this.stabilizer.display();
        this.scene.popMatrix();

        //bottom
        this.scene.pushMatrix();
        this.blueTexture.apply();
        this.scene.translate(0,-0.32,-1);
        this.scene.rotate(this.stabilizerDir,0,1,0);
        this.scene.rotate(3*Math.PI/2.0,0,0,1);
        this.stabilizer.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        
        
        //Flag
        this.scene.pushMatrix();
        this.scene.translate(0,0,-2.55); 
        this.scene.scale(0.9,0.9,0.9);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
    
}

