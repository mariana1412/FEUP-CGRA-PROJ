/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.numberSlices = 16;
        this.numberStacks = 8;
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        

        this.objects=[
            new MySphere(this, this.numberSlices, this.numberStacks),
            new MyCylinder(this, this.numberSlices)
        ];

        // Object interface variables
		this.objectList = {
			'Sphere': 0,
			'Cylinder': 1
        };
        
         
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayObjects = true;
        this.currentObject = 0;
        this.currentTexture = -1;
    
        //Material
        this.material=new CGFappearance(this);
        this.material.setAmbient(0.1,0.1,0.1,1);
        this.material.setDiffuse(0.9,0.9,0.9,1);
        this.material.setDiffuse(0.2,0.2,0.2,1);
        this.material.setShininess(10);
        this.material.loadTexture('images/earth.jpg');
        this.material.setTextureWrap('REPEAT','REPEAT');
    
        this.textures=[
            new CGFtexture(this, 'images/earth.jpg'),
            new CGFtexture(this, 'images/cubemap.png')
        ];

        this.textureList= {
            'None': -1,
            'Earth': 0,
            'CubeMap': 1
        };
        
    
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    // called when a new object is selected
	selectedObject() {
		this.objects[this.currentObject];
    }

    // called when a new texture is selected
	selectedTexture() {
        if(this.currentTexture != -1)
		this.material.setTexture(this.textures[this.currentTexture]);
    }
    
    updateSlices(){
        this.objects[this.currentObject].updateSlices(this.numberSlices);
    } 

    updateStacks(){
        this.objects[this.currentObject].updateStacks(this.numberStacks);
    }


    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        
        if(this.currentTexture != -1)
            this.material.apply();

        
        if(this.displayObjects)
            this.objects[this.currentObject].display();

        // ---- END Primitive drawing section
    }
}