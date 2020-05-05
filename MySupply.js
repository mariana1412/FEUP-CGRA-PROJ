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

        this.state = SupplyStates.INACTIVE;

        this.x = 0;
        this.y = 10;
        this.z = 0;
    }
    drop(x,z){
        this.state = SupplyStates.FALLING;
        this.x = x;
        this.z = z;
    }

    land(){
        this.y = 0; 
        this.state = SupplyStates.LANDED;  
    
    }

    update(t){
        if(this.state == SupplyStates.FALLING){
            this.y -= 10/3;//it should take 3 seconds to hit the floor
            if(this.y == 0){
                this.land();
            }
            //acabar -fazer animaçao da queda 

        }
    }
    
    display() {// When it hasn't yet been released, it is not drawn
        if(this.state != SupplyStates.INACTIVE){
            this.scene.pushMatrix();
            this.scene.translate(this.x,this.y,this.z);
            this.woodBox.display();
            this.scene.popMatrix();
        }
    
    }

}

