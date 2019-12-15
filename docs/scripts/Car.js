import Inventory from './Inventory.js'
import ControllableSprite from './ControllableSprite.js'

export default class Car extends ControllableSprite{
	constructor(scene, x, y, inventoryCapacity, speed, player){
		super(scene,x,y,'car',speed, false);

		this.tier = 0;

		this.player = player;

		this.inventory = new Inventory(inventoryCapacity);

		this.acceptableDistanceToPlayer = 150;
		this.setInteractive();
		this.on('pointerdown',this.boardVehicle);
	}


	boardVehicle(){
		let distance = this.player.getCenter().distance(this.getCenter());
		if(this.movementEnabled || distance <= this.acceptableDistanceToPlayer){
			this.resetMovement();
			this.player.resetMovement();
			this.player.playerInCar = !this.player.playerInCar;
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
				this.scene.updateInventoryText();
			}
		}else{
			this.scene.displayNotification("Car is too far away",'#cc0000');
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