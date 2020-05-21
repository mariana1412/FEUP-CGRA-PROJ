const SupplyStates =  {       INACTIVE: 0,       FALLING: 1,       LANDED: 2   }; 

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
	constructor(scene) {
        super(scene);

        this.woodBox = new MyWoodBox(this.scene);
        this.woodBoxLanded = new MyWoodBoxLanded(this.scene);

        this.state = SupplyStates.INACTIVE;

        this.x = 0;
        this.y = 9;
        this.z = 0;

        this.previousTime = 0; //ms
        this.deltaTime = 0; //seconds
    }
    
    reset(){
        this.state = SupplyStates.INACTIVE;;
        this.y = 9;
        this.x = 0;
        this.z = 0;
        this.previousTime = 0;
        this.deltaTime = 0;
    }

    drop(x, z){
        this.state = SupplyStates.FALLING;
        this.x = x;
        this.z = z;
    }

    land(){
        this.y = 0.35; //unico valor com que consegui ver a caixa no chao
        this.previousTime = 0
        this.state = SupplyStates.LANDED;  
    }

    update(t){

        if(this.state == SupplyStates.FALLING){
            if(this.previousTime == 0)
                this.previousTime = t;

            this.deltaTime = (t-this.previousTime)/1000;
            this.previousTime = t;

            this.y -= (9/3 * this.deltaTime); //it should take 3 seconds to hit the floor

            if(this.y <= 0.35){
                this.land();
            }

        }
    }
    
    display() {// When it hasn't yet been released, it is not drawn

        if(this.state != SupplyStates.INACTIVE){
            this.scene.pushMatrix();
            this.scene.translate(this.x, this.y, this.z);

            if(this.state == SupplyStates.FALLING)
                this.woodBox.display();
            
            else if(this.state == SupplyStates.LANDED)
                this.woodBoxLanded.display();
            

            this.scene.popMatrix();
        }
    }

}

