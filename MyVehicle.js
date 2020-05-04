/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);

        this.vehiclebody = new MyVehicleBody(scene);
        this.angY = 0;
        this.speed = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.automatic = false;
        
        this.center_x = 0;
        this.center_z = 0;

        this.radius = 5;
        this.pilotAngle = 0;

        this.previousTime = 0; //ms
        this.deltaTime = 0; //seconds
        this.deltaAngle = 0;
        this.angularSpeed =360/5.0; // formula: 360/animationTime 
    }

    startAutoPilot(){
        
        this.automatic = true;
        
        this.pilotAngle = (this.angY + 90) * Math.PI / 180.0;

        this.center_x = this.x + Math.sin(this.pilotAngle)*this.radius;
        this.center_z = this.z + Math.cos(this.pilotAngle)*this.radius;
    }

    update(t){      

        if(this.previousTime == 0)
            this.previousTime = t;

        this.deltaTime = (t-this.previousTime)/1000;
        this.previousTime = t;

        var cos, sin;
        
        if(this.automatic){

            sin = Math.sin(this.angY*Math.PI/180.0);
            cos = Math.cos(this.angY*Math.PI/180.0);
            this.x = -this.radius * cos + this.center_x;
            this.z = this.radius * sin + this.center_z; 
            
            this.deltaAngle = this.deltaTime * this.angularSpeed;

            this.turn(this.deltaAngle);  
            this.vehiclebody.setHelixAng(5.0*t);
            
        }
        else{
            sin = Math.sin(this.angY*Math.PI/180.0);
            cos = Math.cos(this.angY*Math.PI/180.0);
            this.x += this.speed*sin;
            this.z += this.speed*cos; 
            this.vehiclebody.setHelixAng(this.speed*t);
        }

        
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
        this.automatic = false;
    }




    display(){
        
        this.scene.setAmbient(0.5, 0.5, 0.5, 1.0);
        this.scene.pushMatrix(); 

        //orientar a posiçao do veiculo
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angY*Math.PI/180.0, 0, 1, 0);

        //this.scene.translate(0, 0, -0.5);//para o eixo dos y estar a meio
        //this.scene.rotate(Math.PI/2.0,1,0,0);//rodar para o eixo dos z
        //super.display();//tipo override o display de scene

        //this.scene.scale(3,3,3);
        this.vehiclebody.display();
        this.scene.popMatrix();  

    }
}


