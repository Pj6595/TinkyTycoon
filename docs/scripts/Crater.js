export default class Crater extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, tinky){
		super(scene,x,y,'crater');
		this.scene.add.existing(this);
		this.scale = 0.4;
		//Physics
		this.scene.physics.add.existing(this);
		this.tinkyInside = tinky;


		this.setInteractive();
		this.on('pointerdown',this.ClickedCrater);
	}

	ClickedCrater(){
		console.log("I have been clicked, and I have " + this.tinkyInside + " tinky");
		if(this.scene.player.returnToolTier() === 1)
			{
				console.log("I've given you a tinky");
				
			}
	}
}