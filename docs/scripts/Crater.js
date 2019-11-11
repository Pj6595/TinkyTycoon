export default class Crater extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, tinky, tinkyType){
		super(scene,x,y,'crater');
		this.scene.add.existing(this);
		//Physics
		this.scene.physics.add.existing(this);
		this.scale = 0.4;
		this.body.setImmovable();
		this.tinkyInside = tinky;
		this.tinkyType = tinkyType;


		this.setInteractive();
		this.on('pointerdown',this.ClickedCrater);
	}

	ClickedCrater(){
		console.log("I have " + this.tinkyInside + " tinky of type " + this.tinkyType);
		if(this.scene.player.returnToolTier() === 1 && this.tinkyInside > 0)
			{
				console.log("I've given you a tinky");
				if(this.scene.player.inventory.addTinky(this.tinkyType)){
					this.tinkyInside--;
					console.log("I've given you a tinky");
				} else{
					console.log("Your inventory is full");
				}
			}
	}
}