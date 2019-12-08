import Inventory from './Inventory.js'
import ControllableSprite from './ControllableSprite.js'

export default class Car extends ControllableSprite{
	constructor(scene, x, y, inventoryCapacity, player){
		super(scene,x,y,'car',500, false);

		this.tier = 0;

		this.player = player;

		this.inventory = new Inventory(inventoryCapacity);

		this.acceptableDistanceToPlayer = 150;
		this.setInteractive();
		this.on('pointerdown',this.boardVehicle);
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

	upgrade(){
		this.tier += 1;
		this.speed += 100;
		this.inventory.addCapacity(10);
	}
}