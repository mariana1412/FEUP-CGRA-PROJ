/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
        this.initTextures(scene);
    }
    initTextures(scene){
        // with zero specular and diffuse component, and strong ambient component

        //Left Texture
        this.left = new CGFappearance(this.scene);
        this.left.setAmbient(0.9, 0.9, 0.9, 1);
        this.left.setDiffuse(0.0, 0.0, 0.0, 1);
        this.left.setSpecular(0.0, 0.0, 0.0, 1);
        this.left.setShininess(10.0);
        this.left.loadTexture('images/split_cubemap/left.png');
        this.left.setTextureWrap('REPEAT', 'REPEAT');

        //Right Texture
        this.right = new CGFappearance(this.scene);
        this.right.setAmbient(0.9, 0.9, 0.9, 1);
        this.right.setDiffuse(0.0, 0.0, 0.0, 1);
        this.right.setSpecular(0.0, 0.0, 0.0, 1);
        this.right.setShininess(10.0);
        this.right.loadTexture('images/split_cubemap/right.png');
        this.right.setTextureWrap('REPEAT', 'REPEAT');

        //Back Texture
        this.back = new CGFappearance(this.scene);
        this.back.setAmbient(0.9, 0.9, 0.9, 1);
        this.back.setDiffuse(0.0, 0.0, 0.0, 1);
        this.back.setSpecular(0.0, 0.0, 0.0, 1);
        this.back.setShininess(10.0);
        this.back.loadTexture('images/split_cubemap/back.png');
        this.back.setTextureWrap('REPEAT', 'REPEAT');

        //Front Texture
        this.front = new CGFappearance(this.scene);
        this.front.setAmbient(0.9, 0.9, 0.9, 1);
        this.front.setDiffuse(0.0, 0.0, 0.0, 1);
        this.front.setSpecular(0.0, 0.0, 0.0, 1);
        this.front.setShininess(10.0);
        this.front.loadTexture('images/split_cubemap/front.png');
        this.front.setTextureWrap('REPEAT', 'REPEAT');

        //Top Texture
        this.top = new CGFappearance(this.scene);
        this.top.setAmbient(0.9, 0.9, 0.9, 1);
        this.top.setDiffuse(0.0, 0.0, 0.0, 1);
        this.top.setSpecular(0.0, 0.0, 0.0, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/split_cubemap/top.png');
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        //Bottom Texture
        this.bottom = new CGFappearance(this.scene);
        this.bottom.setAmbient(0.9, 0.9, 0.9, 1);
        this.bottom.setDiffuse(0.0, 0.0, 0.0, 1);
        this.bottom.setSpecular(0.0, 0.0, 0.0, 1);
        this.bottom.setShininess(10.0);
        this.bottom.loadTexture('images/split_cubemap/bottom.png');
        this.bottom.setTextureWrap('REPEAT', 'REPEAT');

    }

	display() {
        //scalling
        this.scene.pushMatrix();
        this.scene.scale(50, 50, 50);

        // Right
        this.right.apply();	
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
		this.scene.popMatrix();
		
        // Back
        this.back.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Left
        this.left.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Front
        this.front.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
		this.scene.popMatrix();
		
        // Top
        this.top.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Bottom
        this.bottom.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    
    updateTexture(){
        if(this.scene.currentTexture==1){
            this.left.loadTexture('images/split_cubemap/left.png');
            this.right.loadTexture('images/split_cubemap/right.png');
            this.back.loadTexture('images/split_cubemap/back.png');
            this.front.loadTexture('images/split_cubemap/front.png');
            this.top.loadTexture('images/split_cubemap/top.png');
            this.bottom.loadTexture('images/split_cubemap/bottom.png');
        }
        else if(this.scene.currentTexture==2){
            this.left.loadTexture('images/split_mountain/left.png');
            this.right.loadTexture('images/split_mountain/right.png');
            this.front.loadTexture('images/split_mountain/front.png');
            this.back.loadTexture('images/split_mountain/back.png');
            this.top.loadTexture('images/split_mountain/top.png');
            this.bottom.loadTexture('images/split_mountain/bottom.png');   
        }
    }
}

