export default class Crater extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, tinkyType){
		super(scene,x,y,'crater');
		this.scene.add.existing(this);
		//Physics
		this.scene.physics.add.existing(this);
		this.scale = 0.4;
		this.body.setImmovable();
		this.tinkyInside = tinkyType;

		this.setInteractive();
		this.on('pointerdown',this.ClickedCrater);
	}

	ClickedCrater(){
			console.log("I've given you a tinky of type " + this.tinkyInside);
			if(this.scene.player.inventory.addTinky(this.tinkyInside)){
				console.log("I've given you a tinky");
			} else{
				console.log("Your inventory is full");
			}
	}
}