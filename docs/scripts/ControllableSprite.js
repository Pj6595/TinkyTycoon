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
		this.up = scene.input.keyboard.addKey('W');
		this.down = scene.input.keyboard.addKey('S');
		this.left = scene.input.keyboard.addKey('A');
		this.right = scene.input.keyboard.addKey('D');
		
	}

	preUpdate(){
		if((this.cursors.down.isDown || this.down.isDown) && this.movementEnabled){
			this.body.setVelocityY(this.speed);
		}
		else if((this.cursors.up.isDown || this.up.isDown) && this.movementEnabled){
			this.body.setVelocityY(-this.speed);
		}else{
			this.body.setVelocityY(0);
		}
			

		if((this.cursors.left.isDown || this.left.isDown) && this.movementEnabled){
			this.body.setVelocityX(-this.speed);
		}
		else if((this.cursors.right.isDown || this.right.isDown) && this.movementEnabled){
			this.body.setVelocityX(this.speed);
		}else{
			this.body.setVelocityX(0);
		}	

		//console.log(this.getCenter());

	}
}