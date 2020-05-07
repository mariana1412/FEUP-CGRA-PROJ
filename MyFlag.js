/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        this.planeFront = new MyPlane(scene);
        this.planeBack = new MyPlane(scene);
        this.initTextures();
    }

    initTextures(){
        //Flag Texture
        this.shaderFront = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.shaderBack = new CGFshader(this.scene.gl, "shaders/flag.vert","shadder/flag.frag");

        this.flagTexture = new CGFtexture(this.scene,'images/flag.png');

        this.shaderFront.setUniformsValues({uSampler1:1});
        this.shaderBack.setUniformsValues({uSampler1:1});
    }



    update(t){
    }
    
    display() {
        this.scene.pushMatrix();

//falta o suporte da bandeira 

        this.scene.setActiveShader(this.scene.defaultShader);
        //scale maybe

        this.setActiveShader(this.shaderFront);
        this.flagTexture.bind(1);
        this.scene.pushMatrix();
        //translate e rotate 
        this.planeFront.display();
        this.scene.popMatrix();


        this.setActiveShader(this.shaderBack);
        this.scene.pushMatrix();
        //translate e rotate
        this.planeBack.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}

