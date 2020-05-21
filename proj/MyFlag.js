/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        this.planeFront = new MyPlane(this.scene, 50);
        this.planeBack = new MyPlane(this.scene, 50);
        this.strip = new My2SideQuad(this.scene);
        this.phase = 0;
        this.previousTime = 0;

        this.initTextures();
    }

    initTextures(){
        //Flag Texture

        this.shaderFront =new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.shaderBack = new CGFshader(this.scene.gl, "shaders/backFlag.vert", "shaders/backFlag.frag");
        this.flagTexture = new CGFtexture(this.scene,'images/flag.png');

        this.stripTexture = new CGFappearance(this.scene);
        this.stripTexture.setAmbient(0.7,0.7,0.7,1);
        this.stripTexture.setDiffuse(0.9,0.9,0.9,1);
        this.stripTexture.setSpecular(0.2,0.2,0.2,1);
        this.stripTexture.setShininess(10.0);
        this.stripTexture.loadTexture('images/redTexture.png');
        this.stripTexture.setTextureWrap('REPEAT', 'REPEAT');


        this.shaderFront.setUniformsValues({ uSampler1: 1});
        this.shaderFront.setUniformsValues({ phase: 0});


        this.shaderBack.setUniformsValues({ uSampler1: 1 });
        this.shaderBack.setUniformsValues({ phase: 0});

    }

    update(speed, time){
        
        if(this.previousTime == 0)
            this.previousTime = time;

        var deltaTime = (time-this.previousTime)/1000;
        this.previousTime = time;

        var deltaX = deltaTime * speed + 1.0;
        this.phase += deltaX;

        this.shaderFront.setUniformsValues({phase: this.phase});
        this.shaderBack.setUniformsValues({phase: this.phase});
    }
    
    display() {
        this.scene.pushMatrix();
        //falta acertar o suporte da bandeira--acertar os translates
         
        this.scene.pushMatrix();
        this.stripTexture.apply();
        this.scene.translate(-0.02,0.40,1.12);
        this.scene.rotate(Math.PI/2.0,1,0,0);
        this.scene.scale(0.020,1,3);
        this.strip.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.stripTexture.apply();
        this.scene.translate(-0.02,-0.40,1.12);
        this.scene.rotate(Math.PI/2.0,1,0,0);
        this.scene.scale(0.020,1,3);
        this.strip.display();
        this.scene.popMatrix();
      
        this.scene.setActiveShader(this.shaderFront);
        this.scene.scale(0.8,0.8,1.3);
        this.flagTexture.bind(1);
        this.scene.pushMatrix();

        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.planeFront.display();
        this.scene.popMatrix();


        this.scene.setActiveShader(this.shaderBack);
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2.0,0,1,0);
        this.planeBack.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

}

