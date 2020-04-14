/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayObjects').name('Display Object');
        this.gui.add(this.scene, 'displayTextures').name('Display Texture');
        this.gui.add(this.scene, 'currentObject', this.scene.objectList).name('Selected Object').onChange(this.scene.selectedObject.bind(this.scene));
        this.gui.add(this.scene, 'currentTexture', this.scene.textureList).name('Selected Texture').onChange(this.scene.selectedTexture.bind(this.scene));

        this.gui.add(this.scene, 'numberSlices', 0, 60, 1).name("Slices").onChange(this.scene.updateSlices.bind(this.scene));
        this.gui.add(this.scene, 'numberStacks', 0, 60, 1).name("Stacks").onChange(this.scene.updateStacks.bind(this.scene));
        return true;
    }
}   