export default class Crater extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, tinkyType){
		super(scene,x,y,'craters',tinkyType+1);
		this.scene.add.existing(this);
		//Physics
		this.scene.physics.add.existing(this);
		this.scale = 2;
		this.body.setImmovable();
		this.tinkyInside = tinkyType;

		this.setInteractive();
		this.on('pointerdown',this.ClickedCrater);
	}

	ClickedCrater(){
		if(this.scene.player.inventory.addTinky(this.tinkyInside)){
			console.log("I've given you a tinky");
			this.scene.updateInventoryText();
		} else{
			console.log("Your inventory is full");
		}
	console.log("I have tinkies of type " + this.tinkyInside);
	}
}