import Inventory from './Inventory.js'

export default class Car extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, inventoryCapacity, player){
		super(scene,x,y,'car');
		this.scene.add.existing(this);
		//Physics
		this.scene.physics.add.existing(this);
		this.body.setCollideWorldBounds();

		this.player = player;

		this.inventory = new Inventory(inventoryCapacity);

		//Movement control
		this.body.setImmovable(true);
		this.movementEnabled = false;
		this.speed = 200;
		this.scale = 1;
		this.cursors = this.scene.input.keyboard.createCursorKeys();
		this.w = scene.input.keyboard.addKey('W');
		this.s = scene.input.keyboard.addKey('S');
		this.a = scene.input.keyboard.addKey('A');
		this.d = scene.input.keyboard.addKey('D');

		this.acceptableDistanceToPlayer = 150;
		this.setInteractive();
		this.on('pointerdown',this.boardVehicle);
	}

	preUpdate(){
		if((this.cursors.down.isDown || this.s.isDown) && this.movementEnabled){
			this.body.setVelocityY(this.speed);
		}
		else if((this.cursors.up.isDown || this.w.isDown) && this.movementEnabled){
			this.body.setVelocityY(-this.speed);
		}else{
			this.body.setVelocityY(0);
		}
			

		if((this.cursors.left.isDown || this.a.isDown) && this.movementEnabled){
			this.body.setVelocityX(-this.speed);
		}
		else if((this.cursors.right.isDown || this.d.isDown) && this.movementEnabled){
			this.body.setVelocityX(this.speed);
		}else{
			this.body.setVelocityX(0);
		}	
	}

	boardVehicle(){
		/*
		if(!this.movementEnabled){
			let distance = this.player.getCenter().distance(this.getCenter());
			console.log(distance);
			//If distance acceptable, player rides vehicle
			if(distance <= this.acceptableDistanceToPlayer){
				this.body.setImmovable(false);
				this.movementEnabled = true;
				this.player.movementEnabled = false;
				this.scene.cameras.main.startFollow(this);
				this.player.setVisible(false);
				//Disable physics with invisible player
				this.playerCarCollider.active = false;
			}
		}else{
			//Player gets off the vehicle
			this.body.setImmovable(true);
			this.movementEnabled = false;
			this.player.movementEnabled = true;
			this.player.setX(this.x);
			this.player.setY(this.getTopCenter().y);
			this.scene.cameras.main.startFollow(this.player);
			this.player.setVisible(true);
			this.playerCarCollider.active = true;
		}
		*/
		let distance = this.player.getCenter().distance(this.getCenter());
		if(this.movementEnabled || distance <= this.acceptableDistanceToPlayer){
			this.movementEnabled = !this.movementEnabled;
			this.body.setImmovable(!this.movementEnabled); //if car is moving immovable = false, not moving = true
			this.player.movementEnabled = !this.movementEnabled;
			this.player.setVisible(!this.movementEnabled);
			this.playerCarCollider.active = !this.movementEnabled;
			if(!this.movementEnabled){ //Player gets off the vehicle
				this.player.setX(this.x);
				this.player.setY(this.getTopCenter().y);
				this.scene.cameras.main.startFollow(this.player);
				console.log("car: ", this.inventory.tinkies);
				console.log("player: ", this.player.inventory.tinkies);
			}
			else{ //Player gets in the vehicle
				this.scene.cameras.main.startFollow(this);
				this.inventory.transferInventory(this.player.inventory);
			}
		}

	}

	setCollider(collider){
		this.playerCarCollider = collider;
	}
}