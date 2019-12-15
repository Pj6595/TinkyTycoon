export default class Crater extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y){
		super(scene,x,y,'craters',0);
		this.scene.add.existing(this);
		//Physics
		this.scene.physics.add.existing(this);
		this.scale = 2;
		this.body.setImmovable();

		this.randomizeTinky();
		this.acceptableDistanceToPlayer = 300;

		this.setInteractive();
		this.on('pointerdown',this.ClickedCrater);
	}

	ClickedCrater(){
		if(!this.scene.player.playerInCar){
			let distance = this.scene.player.getCenter().distance(this.getCenter());
			if(distance <= this.acceptableDistanceToPlayer){
				if(this.scene.player.inventory.numTinkies < this.scene.player.inventory.capacity){
					this.scene.scene.launch('Minigame',[this.tinkyInside+1,this.scene]); //Offsetting by one due to an unkown engine bug
				}else
					this.scene.displayNotification("Inventory is full",'#cc0000');
			}else
				this.scene.displayNotification("Crater is too far away",'#cc0000');	
		}else
			this.scene.displayNotification("Can't mine craters in the car",'#cc0000');
	}

	randomizeTinky(){
		//50% getting a tinky of your tier, 50% of getting any other tinky, equal chances
		let toolTier = this.scene.player.toolTier;
		if(Math.floor(Math.random()*100) < 50){
			this.tinkyInside = toolTier;
		}else{
			let tinkyNum = 7 - toolTier;
			this.tinkyInside = Math.floor(Math.random()*tinkyNum)+toolTier;
		}
		this.setFrame(this.tinkyInside+1);
	}
}