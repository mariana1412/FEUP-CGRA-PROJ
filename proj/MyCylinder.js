class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     */
    constructor(scene, slices) {
      super(scene);
      this.slices = slices;
  
      this.initBuffers();
    }
    
    /**
     * @method initBuffers
     * Initializes the cylinder buffers
     */
    initBuffers() {
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];

      var genericAngle = (2*Math.PI)/this.slices;
      var angle = 0;
      var x, z;
      var genericTexture = 1/this.slices;
      var texture = 0;  
      
      for(var i = 0; i <= this.slices; i++){
        
        x = Math.cos(angle);
        z = -Math.sin(angle); //z < 0 because z grows down
        this.vertices.push(x, 0, z); 
        this.vertices.push(x, 1, z);

        if(i > 0){ //we need two vertices to do a triangle (plus the center of the polygon)
            this.indices.push(i*2, (i*2+1), (i*2-1));
            this.indices.push(i*2, (i*2-1), (i*2-2));
        }

        this.normals.push(x, 0, z);
        this.normals.push(x, 0, z);
        this.texCoords.push(texture, 1);
        this.texCoords.push(texture, 0);

        texture += genericTexture;
        angle += genericAngle;
      }
  
  
      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
    }

    updateSlices(complexity){
        this.slices = complexity;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
  }