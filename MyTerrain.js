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

        
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.shader.setUniformsValues({uSampler1: 1});
        this.shader.setUniformsValues({ uSampler2: 2});
    }

    display(){
       
       this.scene.setActiveShader(this.shader);
       this.textureTerrain.bind(1);
       this.mapTerrain.bind(2);
       
       this.scene.pushMatrix();
       this.scene.scale(50,50,1);
       this.plane.display();

       this.scene.popMatrix();

       // restore default shader (will be needed for drawing the axis in next frame)
		this.setActiveShader(this.defaultShader);

    }
}


