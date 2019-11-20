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
		this.movementEnabled = false;
		this.speed = 200;
		this.scale = 1;
		this.cursors = this.scene.input.keyboard.createCursorKeys();
		this.w = scene.input.keyboard.addKey('W');
		this.s = scene.input.keyboard.addKey('S');
		this.a = scene.input.keyboard.addKey('A');
		this.d = scene.input.keyboard.addKey('D');

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
		this.movementEnabled = !this.movementEnabled;
		this.player.movementEnabled = !this.movementEnabled;
	}
}