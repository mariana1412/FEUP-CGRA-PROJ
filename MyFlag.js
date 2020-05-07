/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        this.planeFront = new MyPlane(this.scene);
        this.planeBack = new MyPlane(this.scene);
        this.strip = new My2SideQuad(this.scene);

        this.initTextures();
    }

    initTextures(){
        //Flag Texture

        this.shaderFront =new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.shaderBack = new CGFshader(this.scene.gl, "shaders/backFlag.vert", "shaders/backFlag.frag");
        this.flagTexture = new CGFtexture(this.scene,'images/flag.png');


        this.shaderFront.setUniformsValues({ uSampler1: 1 });
        //this.shaderFront.setUniformsValues({ speed: 0 });
        //this.shaderFront.setUniformsValues({ timeFactor: 0 });

        this.shaderBack.setUniformsValues({ uSampler1: 1 });
        //this.shaderBack.setUniformsValues({ speed: 0 });
        //this.shaderBack.setUniformsValues({ timeFactor: 0 });
    }



    update(t){
        //TO DO 
    }
    
    display() {
        this.scene.pushMatrix();
    //falta acertar o suporte da bandeira
        
        this.scene.setActiveShader(this.scene.defaultShader);
 
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2.0,1,0,1);
        this.scene.translate(0,0,2);
        this.scene.scale(1,3,1);
        this.strip.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2.0,1,0,1);
        this.scene.translate(0,0,2);
        this.scene.scale(1,3,1);
        this.strip.display();
        this.scene.popMatrix();


        

        this.scene.setActiveShader(this.shaderFront);
        this.scene.scale(1,1,1.5);
        this.flagTexture.bind(1);
        this.scene.pushMatrix();
        this.scene.translate(-0.8,0,-3);
        this.scene.rotate(-Math.PI/2.0,0,1,0);
        this.planeFront.display();
        this.scene.popMatrix();


        this.scene.setActiveShader(this.shaderBack);
        this.scene.pushMatrix();
        this.scene.translate(-0.8,0,-3);
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.planeBack.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}

