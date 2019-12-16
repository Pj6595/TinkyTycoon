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
		if(this.movementEnabled || this.playerInRange()){
			this.resetMovement();
			this.player.resetMovement();
			this.player.playerInCar = !this.player.playerInCar;
			this.movementEnabled = !this.movementEnabled;
			this.body.setImmovable(!this.movementEnabled); //if car is moving immovable = false, not moving = true
			this.player.movementEnabled = !this.movementEnabled;
			this.player.setVisible(!this.movementEnabled);
			this.playerCarCollider.active = !this.movementEnabled;
			if(!this.movementEnabled){ //Player gets off the vehicle
				this.scene.carSound.stop();
				this.player.setX(this.x);
				this.player.setY(this.getTopCenter().y);
				this.scene.cameras.main.startFollow(this.player);
				console.log("car: ", this.inventory.tinkies);
				console.log("player: ", this.player.inventory.tinkies);
			}
			else{ //Player gets in the vehicle
				if(this.scene.walkingSound.isPlaying) this.scene.walkingSound.stop();
				this.scene.carSound.play();
				this.scene.cameras.main.startFollow(this);
				if(this.player.inventory.numTinkies > 0){
					this.inventory.transferInventory(this.player.inventory);
					this.scene.displayNotification("Inventario enviado a coche",'#d9e800');
					this.scene.updateInventoryText();
				}
			}
		}else{
			this.scene.displayNotification("Coche demasiado lejos",'#cc0000');
		}

	}

	setCollider(collider){
		this.playerCarCollider = collider;
	}

	upgrade(){
		this.tier += 1;
		this.speed *= 2;
		this.inventory.addCapacity(this.inventory.capacity);
	}

	playerInRange(){
		let distance = this.player.getCenter().distance(this.getCenter());
		return (distance <= this.acceptableDistanceToPlayer);
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