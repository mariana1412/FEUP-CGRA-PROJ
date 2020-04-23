/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        
        this.initBuffers();

        this.angY=0;
        this.speed=0;
        this.x=0;
        this.y=0;
        this.z=0;
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,1,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    update(){
        this.x += this.speed*Math.sin(this.angY*Math.PI/180.0);
        this.z += this.speed*Math.cos(this.angY*Math.PI/180.0); 
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        //reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    turn(val){
        this.angY += val;
    }

    accelerate(val){
        this.speed = val;
        if(this.speed<0)
            this.speed=0;
    }

    reset(){
        this.x=0;
        this.y=0;
        this.z=0;
        this.angY=0;
        this.speed=0;
    }

    display(){
        this.scene.pushMatrix();

        //orientar a posiçao do veiculo
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angY*Math.PI/180.0,0,1,0);

        this.scene.translate(0,0,-0.5);//para o eixo dos y estar a meio
        this.scene.rotate(Math.PI/2.0,1,0,0);//rodar para o eixo dos z
        super.display();//tipo override o display de scene

        this.scene.popMatrix();  

    }
}


