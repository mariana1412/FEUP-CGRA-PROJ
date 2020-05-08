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
        this.shaderFront.setUniformsValues({ speed: 0 });
        this.shaderFront.setUniformsValues({ timeFactor: 0 });

        this.shaderBack.setUniformsValues({ uSampler1: 1 });
        this.shaderBack.setUniformsValues({ speed: 0 });
        this.shaderBack.setUniformsValues({ timeFactor: 0 });
    }



    update(speed, acceleration, time){
        //TO DO 
        this.shaderFront.setUniformsValues({ speed: speed });
        this.shaderFront.setUniformsValues({ timeFactor: time });
        this.shaderFront.setUniformsValues({ acceleration: acceleration });

        this.shaderBack.setUniformsValues({ speed: speed });
        this.shaderBack.setUniformsValues({ timeFactor: time });
        this.shaderBack.setUniformsValues({ acceleration: acceleration });
    }
    
    display() {
        this.scene.pushMatrix();
        //falta acertar o suporte da bandeira--acertar os translates
        
        this.scene.setActiveShader(this.scene.defaultShader);
 
        this.scene.pushMatrix();
        this.scene.translate(-0.02,0.40,1.12);
        this.scene.rotate(Math.PI/2.0,1,0,0);
        this.scene.scale(0.020,1,3);
        this.strip.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.pushMatrix();
        this.scene.translate(-0.02,-0.40,1.12);
        this.scene.rotate(Math.PI/2.0,1,0,0);
        this.scene.scale(0.020,1,3);
        
        this.strip.display();
        this.scene.popMatrix();


        

        this.scene.setActiveShader(this.shaderFront);
        this.scene.scale(0.8,0.8,1.3);
        this.flagTexture.bind(1);
        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2.0,0,1,0);
        this.planeFront.display();
        this.scene.popMatrix();


        this.scene.setActiveShader(this.shaderBack);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.planeBack.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}

