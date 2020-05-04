/**
* MyTerrain
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(this.scene, 20);
        this.initBuffers();

        this.init();
    }
    
    initBuffers(){
        this.plane.initBuffers();
    }
    
    init(){
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.textureTerrain = new CGFtexture(this.scene,'images/terrain.jpg');
        this.mapTerrain = new CGFtexture(this.scene,'images/heightmap.jpg'); 

        this.shader.setUniformsValues({uSampler1: 1});
        this.shader.setUniformsValues({ uSampler2: 2});
    }

    display(){
        this.scene.pushMatrix();
         
        //TO DO
        
        this.scene.popMatrix();
    }
}


