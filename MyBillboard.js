/**
* MyBillboard
* @method constructor
* @param scene - Reference to MyScene object
*/
class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.baseFront = new MyPlane(this.scene, 20);
        this.baseBack = new MyPlane(this.scene, 20);
        this.progressBar = new MyPlane(this.scene, 20);
        this.beamLeft = new My2SideQuad(this.scene);
        this.beamRight = new My2SideQuad(this.scene);
        this.nSuppliesDelivered = 0;

        this.initShaders();

        this.initTextures();
    }

    initTextures() {

        this.billboardTexture = new CGFappearance(this.scene);
        this.billboardTexture.setAmbient(0.9, 0.9, 0.9, 1);
        this.billboardTexture.setDiffuse(0.9,0.9,0.9,1);
        this.billboardTexture.setSpecular(0.2,0.2,0.2,1);
        this.billboardTexture.setShininess(10.0);
        this.billboardTexture.loadTexture('images/billboardBase.png');
        this.billboardTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.beamTexture = new CGFappearance(this.scene);
        this.beamTexture.setAmbient(0.7,0.7,0.7,1);
        this.beamTexture.setDiffuse(0.9,0.9,0.9,1);
        this.beamTexture.setSpecular(0.2,0.2,0.2,1);
        this.beamTexture.setShininess(10.0);
        this.beamTexture.loadTexture('images/beam.png');
        this.beamTexture.setTextureWrap('REPEAT', 'REPEAT');

    }
    
    initShaders(){
        this.shader = new CGFshader(this.scene.gl, "shaders/progressBar.vert", "shaders/progressBar.frag");
        this.shader.setUniformsValues({nSuppliesDelivered: 0});
    }
    update(){
        this.shader.setUniformsValues({nSuppliesDelivered: ++this.nSuppliesDelivered});
    }
    reset(){
        this.nSuppliesDelivered = 0;
        this.shader.setUniformsValues({nSuppliesDelivered: 0});
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(2,9,17);
        this.scene.rotate(-Math.PI/8.0,0,1,0);
        
        this.scene.setActiveShader(this.scene.defaultShader);
        //Left Beam
        this.scene.pushMatrix();
        this.beamTexture.apply();
        this.scene.translate(0,-1,-0.946);
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.scene.scale(0.10,1,1);
        this.beamLeft.display();
        this.scene.popMatrix();
        
        //Right Beam
        this.scene.pushMatrix();
        this.beamTexture.apply();
        this.scene.translate(0,-1,0.946);
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.scene.scale(0.10,1,1);
        this.beamRight.display();
        this.scene.popMatrix();
        
        //Front Base
        this.scene.pushMatrix();
        this.billboardTexture.apply();
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.scene.scale(2,1,1);
        this.baseFront.display();
        this.scene.popMatrix();

        //Back Base
        this.scene.pushMatrix(); 
        this.beamTexture.apply();
        this.scene.rotate(-Math.PI/2.0,0,1,0);
        this.scene.scale(2,1,1);
        this.baseBack.display();
        this.scene.popMatrix();

        //progress bar 
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        this.scene.scale(1.5,0.2,1);    
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.scene.translate(0,-1,0.01);
        this.progressBar.display();
        this.scene.popMatrix(); 
        this.scene.popMatrix();
        
        this.scene.popMatrix();
    }
}


