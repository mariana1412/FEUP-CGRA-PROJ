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

        this.setUpdatePeriod(150);
        
        this.enableTextures(true);

        this.numberSlices = 16;
        this.numberStacks = 8;
        this.nSuppliesDelivered = 0;
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.vehicle = new MyVehicle(this, this.numberSlices, this.numberStacks);
        this.terrain = new MyTerrain(this); 
        this.billboard = new MyBillboard(this);
        
        this.supplies = [];
        for(var i = 0; i < 5; i++){
            this.supplies.push(new MySupply(this));
        }
        
        this.objects=[
            new MySphere(this, this.numberSlices, this.numberStacks),
            new MyCylinder(this, this.numberSlices),
            new MyCubeMap(this)
        ];

        // Object interface variables
		this.objectList = {
			'Sphere': 0,
            'Cylinder': 1,
            'Cube': 2
        };
        
         
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayObjects = false;
        this.displayVehicle = true;
        this.displayTerrain = true;
        this.currentObject = 0;
        this.currentTexture = -1;
        this.complexity = 0.0;
        this.speedFactor = 0.5;
        this.scaleFactor = 1;
    
        //Material
        this.material=new CGFappearance(this);
        this.material.setAmbient(0.7,0.7,0.7,1);
        this.material.setDiffuse(0.9,0.9,0.9,1);
        this.material.setSpecular(0.2,0.2,0.2,1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/earth.jpg');
        this.material.setTextureWrap('REPEAT','REPEAT');
    
        this.textures=[
            new CGFtexture(this, 'images/earth.jpg'),
            new CGFtexture(this, 'images/cubemap.png'),
            new CGFtexture(this, 'images/mountain.png'),
            new CGFtexture(this, 'images/heightmap.jpg')
        ];

        this.textureList= {
            'None': -1,
            'Earth': 0,
            'CubeMap': 1,
            'Mountain': 2
        };
        
    
    }
    initLights() {
        this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(30, 20, 30), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }


    checkKeys(t){
        
        var text="Keys pressed: ";
        var keysPressed=false;


        if(this.gui.isKeyPressed("KeyP")){

            if(!this.vehicle.automatic)
                this.vehicle.startAutoPilot();
            
            else
                this.vehicle.stopAutoPilot();


            text +="P";
            keysPressed = true;
        }
        

        //check for key codes
        if(!this.vehicle.automatic){
            if(this.gui.isKeyPressed("KeyW")){
                text +="W";
                this.vehicle.accelerate(0.5*this.speedFactor);
                keysPressed = true;
            }
            if(this.gui.isKeyPressed("KeyS")){
                text +="S";
                this.vehicle.accelerate(-0.5*this.speedFactor);
                keysPressed = true;
            }
            if(this.gui.isKeyPressed("KeyA")){
                text +="A";
                this.vehicle.turn(-5);
                keysPressed = true;
            }
            if(this.gui.isKeyPressed("KeyD")){
                text +="D";
                this.vehicle.turn(5);
                keysPressed = true;
            }
        }
        if(this.gui.isKeyPressed("KeyL")){//only one supply dropped at a time
            text += "L";
            if (this.nSuppliesDelivered != 5){

                if((this.nSuppliesDelivered == 0) || (this.nSuppliesDelivered != 0 && (this.supplies[this.nSuppliesDelivered-1].previousTime == 0))){
                    this.supplies[this.nSuppliesDelivered].drop(this.vehicle.x, this.vehicle.z);
                    this.nSuppliesDelivered++;
                    this.billboard.update();
                }
            }
            
            keysPressed = true;
        }
        
        if(this.gui.isKeyPressed("KeyR")){
            text +="R";
            
            this.resetVehicle();

            keysPressed = true;
        }

        if(keysPressed)
            console.log(text);
        
        else if(!this.vehicle.autoPilot)
            this.vehicle.turn(0);
       
    }

    resetVehicle(){
        this.vehicle.reset();

        this.nSuppliesDelivered = 0;
        
        for(var i = 0; i < 5; i++){
            this.supplies[i].reset();
        }

        this.billboard.reset();
    }
    
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
       if(this.displayVehicle){
            this.checkKeys(t);
            this.vehicle.update(t, this.speedFactor);
    
            for(var i=0; i<5; i++){
                this.supplies[i].update(t);
            }   
        }
        
    }

    updateComplexity(){
        this.vehicle.updateBuffers(this.complexity);
    }
    // called when a new object is selected
	selectedObject() {
		this.objects[this.currentObject];
    }

    // called when a new texture is selected
	selectedTexture() {
        if(this.currentObject == 2)
            this.objects[this.currentObject].updateTexture();
        
        else
            this.material.setTexture(this.textures[this.currentTexture]);
    }
    
    updateSlices(){
        if(this.currentObject == 0 || this.currentObject == 1)
            this.objects[this.currentObject].updateSlices(this.numberSlices);
    } 

    updateStacks(){
        if(this.currentObject == 0)
            this.objects[this.currentObject].updateStacks(this.numberStacks);
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
        this.pushMatrix();


        if(this.currentTexture != -1)
            this.material.apply();
        //ainda temos que arranjar forma de limitar as texturas
        
        if(this.displayObjects)
            if((this.displayVehicle || this.displayTerrain)){
                if(this.currentObject==2){
                    this.objects[this.currentObject].display();
                }  
            }
            else if(!(this.displayTerrain || this.displayVehicle))
            this.objects[this.currentObject].display();
      

        if(this.displayVehicle){    
            
            for(var i = 0; i < 5; i++){
                this.supplies[i].display();
            }   

            this.pushMatrix();
            this.translate(0, 10, 0);
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.vehicle.display();
            this.popMatrix();


        }
        else
            this.resetVehicle();    

        if(this.displayTerrain){
            this.currentTexture = 0;
            this.currentObject = 2;
            this.displayObjects = true;
            this.terrain.display();

            this.billboard.display();
        }
        

        this.popMatrix();

        // ---- END Primitive drawing section
        this.setActiveShader(this.defaultShader);
    }
}