/**
 * MyWoodBox
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyWoodBox extends CGFobject {
	constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);

        this.initTextures();
    }
    initTextures(){
        // with zero specular and diffuse component, and strong ambient component

        //Wood Texture
        this.woodTexture = new CGFappearance(this.scene);
        this.woodTexture.setAmbient(0.9, 0.9, 0.9, 1);
        this.woodTexture.setDiffuse(0.0, 0.0, 0.0, 1);
        this.woodTexture.setSpecular(0.0, 0.0, 0.0, 1);
        this.woodTexture.setShininess(10.0);
        this.woodTexture.loadTexture('images/woodBox.png');
        this.woodTexture.setTextureWrap('REPEAT', 'REPEAT');

    }

	display() {
        //scalling
        this.scene.pushMatrix();
        this.scene.scale(0.7, 0.7, 0.7);
        this.woodTexture.apply();

        //Right
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
		
        //Back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
		
        //Top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //Bottom
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

