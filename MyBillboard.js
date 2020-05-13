/**
* MyBillboard
* @method constructor
* @param scene - Reference to MyScene object
*/
class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.baseFront = new MyPlane(this.scene, 20);
        this.baseBack = new MyPlane(this.scene,20);
        this.progressBar = new MyPlane(this.scene,20);
        this.beamLeft = new My2SideQuad(this.scene);
        this.beamRight = new My2SideQuad(this.scene);
        this.nSuppliesDelivered = 0;

        this.initShaders();
    }

    
    initShaders(){
        /*this.shader = new CGFshader(this.scene.gl, "shaders/progressBar.vert", "shaders/progressBar.frag");
        this.shader.setUniformsValues({nSuppliesDelivered: nSuppliesDelivered});*/
    }
    update(){
        this.shader.setUniformsValues({nSuppliesDelivered: ++this.nSuppliesDelivered});
    }
    reset(){
        this.nSuppliesDelivered = 0;
        this.shader.setUniformsValues({nSuppliesDelivered: this.nSuppliesDelivered});
    }

    display(){
        /*this.baseFront.display();
        */
    }
}


