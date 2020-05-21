class MyGondola extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     */
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 15, 8);
        this.cylinder = new MyCylinder(this.scene, 16);
        
        this.initBuffers();
    }
    
    initBuffers(){
        this.sphere.initBuffers();
        this.cylinder.initBuffers();
    }
    

    display(){
        //cylinder
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.scale(0.1, 0.10, 0.6);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI/2.0, 1, 0, 0);//turn the cylinder so it's horizontal
        this.cylinder.display();
        this.scene.popMatrix();

        //sphere
        this.scene.pushMatrix();
        this.scene.translate(0, -0.50, 0.29);
        this.scene.scale(0.1, 0.1, 0.1);
        this.sphere.display();
        this.scene.popMatrix();

        //sphere
        this.scene.pushMatrix();
        this.scene.translate(0, -0.50, -0.29);
        this.scene.scale(0.1, 0.1, 0.1);
        this.sphere.display();
        this.scene.popMatrix();       
    }
}


