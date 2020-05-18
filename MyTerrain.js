/**
* MyTerrain
* @method constructor
* @param scene - Reference to MyScene object
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(this.scene, 20);
        this.initBuffers();

        this.initShaders();
    }
    
    initBuffers(){
        this.plane.initBuffers();
    }
    
    initShaders(){
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.textureTerrain = new CGFtexture(this.scene,'images/terrain.jpg');
        this.mapTerrain = new CGFtexture(this.scene,'images/heightmap2.png'); 

        this.shader.setUniformsValues({uSampler1: 1});
        this.shader.setUniformsValues({ uSampler2: 2});
    }

    display(){
       
       this.scene.setActiveShader(this.shader);
       this.textureTerrain.bind(1);
       this.mapTerrain.bind(2);
       
       this.scene.pushMatrix();
       this.scene.rotate(-Math.PI/2.0,1,0,0);
       this.scene.scale(50,50,8); //change z to 8
       this.plane.display();

       this.scene.popMatrix();

    }
}


