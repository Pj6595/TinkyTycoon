import Inventory from './Inventory.js'
import ControllableSprite from './ControllableSprite.js'

export default class Car extends ControllableSprite{
	constructor(scene, x, y, inventoryCapacity, speed, player){
		super(scene,x,y,'car',speed, false);

		this.tier = 0;
		this.scale = 2;

		this.player = player;

		this.inventory = new Inventory(inventoryCapacity);

		this.acceptableDistanceToPlayer = 150;
		this.setInteractive();
		this.on('pointerdown',this.boardVehicle);

		this.setUpAnimations();
	}

	setUpAnimations(){
		//Animations
		this.scene.anims.create({
			key: 'CarIdle',
			frames: [ { key: 'car', frame: 0 } ],
			frameRate: 20,
			repeat: -1
		})
		this.scene.anims.create({
    	key: 'CarDown',
    	frames: this.scene.anims.generateFrameNumbers('car', { start: 1, end: 4 }),
    	frameRate: 5,
    	repeat: -1
		});

		this.scene.anims.create({
    	key: 'CarUp',
    	frames: this.scene.anims.generateFrameNumbers('car', {start:5, end:8}),
    	frameRate: 5,
    	repeat: -1
		});

		this.scene.anims.create({
    	key: 'CarRight',
    	frames: this.scene.anims.generateFrameNumbers('car', { start: 9, end: 12 }),
    	frameRate: 5,
    	repeat: -1
		});

		this.scene.anims.create({
    	key: 'CarLeft',
    	frames: this.scene.anims.generateFrameNumbers('car', { start: 13, end: 16 }),
    	frameRate: 5,
    	repeat: -1
		});
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

	updateAnims(){
		if(this.movement.vertical != 0 || this.movement.sideways != 0){

			if(this.movement.vertical == -1)
			this.scene.car.anims.play('CarUp',true);

			else if(this.movement.vertical == 1)
			this.scene.car.anims.play('CarDown',true);

			else if(this.movement.sideways == -1)
			this.scene.car.anims.play('CarLeft',true);

			else if(this.movement.sideways == 1)
			this.scene.car.anims.play('CarRight',true);
		}
		else{
			this.scene.car.anims.play('CarIdle',true);
		}
	}
}