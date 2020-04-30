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
       
    }
    
    update(t){
        this.x += this.speed*Math.sin(this.angY*Math.PI/180.0);
        this.z += this.speed*Math.cos(this.angY*Math.PI/180.0); 
    
        this.vehiclebody.setHelixAng(this.speed*t);
    }
    
    updateBuffers(complexity){
        //this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        //reinitialize buffers
        
        this.initNormalVizBuffers();
    }

    turn(val){
        this.angY += val;
        this.vehiclebody.setStabilizerDir(-val*4);
        this.vehiclebody.setStabilizerDir(-val*4);
    }

    accelerate(val){
        this.speed = val;
        if(this.speed < 0)
            this.speed = 0;
    }

    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.angY = 0;
        this.speed = 0;
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

        this.scene.scale(3,3,3);
        this.vehiclebody.display();
        this.scene.popMatrix();  

    }
}


