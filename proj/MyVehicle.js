/**
* MyVehicle
* @method constructor
* @param scene - Reference to MyScene object
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        //this para inicializar os shaders da flag no veiculo--confirmar

        this.vehiclebody = new MyVehicleBody(scene);
        
        this.angY = 0;
        this.speed = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.automatic = false;
        this.acceleration = 0;
        
        this.center_x = 0;
        this.center_z = 0;

        this.radius = 5;
        this.pilotAngle = 0;

        this.previousTime = 0; //ms
        this.deltaTime = 0; //seconds
        this.angularSpeed = 360/5.0 * (Math.PI / 180); // formula: 360/animationTime 
    }

    startAutoPilot(){
        this.automatic = true;
        this.previousAngY = this.angY;
        this.pilotAngle = (this.angY - 90) * Math.PI / 180.0;
        var perpendicularAngle = (this.angY + 90) * Math.PI / 180.0;
        this.center_x = this.x + Math.sin(perpendicularAngle)*this.radius;
        this.center_z = this.z + Math.cos(perpendicularAngle)*this.radius;
    }

    stopAutoPilot(){    
        this.automatic = false;
    }

    update(t, speedFactor){      
        if(this.previousTime == 0)
            this.previousTime = t;

        this.deltaTime = (t-this.previousTime)/1000;
        this.previousTime = t;

        var cos, sin;
        
        if(this.automatic){

            var deltaAngle = this.deltaTime * this.angularSpeed;

            this.pilotAngle += deltaAngle;

            sin = Math.sin(this.pilotAngle);
            cos = Math.cos(this.pilotAngle);
            this.angY = (this.pilotAngle * 180 / Math.PI) + 90;
            this.angY %= 360;

            this.x = this.radius * sin + this.center_x;
            this.z = this.radius * cos + this.center_z; 

            this.vehiclebody.setStabilizerDir(-this.deltaAngle*4);
            this.vehiclebody.setHelixAng(5.0*t);
        }
        else{
            if(this.speed >0)
                this.speed = speedFactor*0.5;

            sin = Math.sin(this.angY*Math.PI/180.0);
            cos = Math.cos(this.angY*Math.PI/180.0);
            this.x += this.speed*sin;
            this.z += this.speed*cos; 
            if(this.speed == 0)
                this.vehiclebody.setHelixAng(0.2*t);
            else 
                this.vehiclebody.setHelixAng(this.speed*t);
            
        }
        //update flag
        this.vehiclebody.updateFlag(this.speed, t);
        
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-60
        this.stacks = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 1-60
        //reinitialize buffers
        
        this.initNormalVizBuffers();
    }

    turn(val){
        this.angY += val;
        this.angY %= 360;
        this.vehiclebody.setStabilizerDir(-val*4);
    }

    accelerate(val){
        this.acceleration = val;
        this.speed = this.speed + val;
        if(this.speed < 0)
            this.speed = 0;
    }

    reset(){    
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.angY = 0;
        this.speed = 0;
        this.acceleration = 0;
        this.automatic = false;
    }




    display(){
        
        this.scene.pushMatrix(); 
        this.scene.setAmbient(0.5, 0.5, 0.5, 1.0);
        //orientar a posiçao do veiculo
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angY*Math.PI/180, 0, 1, 0);

        this.vehiclebody.display();

        this.scene.popMatrix(); 
    }
}


