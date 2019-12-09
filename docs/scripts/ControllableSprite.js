export default class ControllableSprite extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, spriteName, speed, movementEnabled){
		super(scene,x,y,spriteName);
		this.scene.add.existing(this);
		//Physics
		this.scene.physics.add.existing(this);
		this.body.setCollideWorldBounds();

		//Character control
		this.movementEnabled = movementEnabled;
		this.cursors = this.scene.input.keyboard.createCursorKeys();
		this.speed = speed;
		this.movement = {vertical:0,sideways:0};
		this.up = scene.input.keyboard.addKey('W');
		this.down = scene.input.keyboard.addKey('S');
		this.left = scene.input.keyboard.addKey('A');
		this.right = scene.input.keyboard.addKey('D');
		
		this.up.on('down', event => {if(this.movementEnabled)this.movement.vertical = -1});
		this.up.on('up', event => {if(this.movementEnabled)this.movement.vertical = 0});
		this.down.on('down', event => {if(this.movementEnabled)this.movement.vertical = 1});
		this.down.on('up', event => {if(this.movementEnabled)this.movement.vertical = 0});
		this.left.on('down', event => {if(this.movementEnabled)this.movement.sideways = -1});
		this.left.on('up', event => {if(this.movementEnabled)this.movement.sideways = 0});
		this.right.on('down', event => {if(this.movementEnabled)this.movement.sideways = 1});
		this.right.on('up', event => {if(this.movementEnabled)this.movement.sideways = 0});
	}

	preUpdate(){
		this.body.setVelocity(this.speed*this.movement.sideways,this.speed*this.movement.vertical);

	}

	resetMovement(){
		this.movement.vertical = 0;
		this.movement.sideways = 0;
	}
}