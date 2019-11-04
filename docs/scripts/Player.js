import Inventory from './Inventory.js'

export default class Player extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, w, h, tinkyValue, inventoryCapacity){
		super(scene,x,y,'player');
		this.scene.add.existing(this);
		//Physics
		this.scene.physics.add.existing(this);
		this.body.setCollideWorldBounds();

		this.inventory = new Inventory(tinkyValue, inventoryCapacity);

		this.toolTier = 1;

		//Character control
		this.cursors = this.scene.input.keyboard.createCursorKeys();
		this.speed = 100;
		this.scale = 0.1;
		this.w = scene.input.keyboard.addKey('W');
		this.s = scene.input.keyboard.addKey('S');
		this.a = scene.input.keyboard.addKey('A');
		this.d = scene.input.keyboard.addKey('D');
		
	}

	preUpdate(){
		if(this.cursors.down.isDown || this.s.isDown){
			this.body.setVelocityY(this.speed);
		}
		else if(this.cursors.up.isDown || this.w.isDown){
			this.body.setVelocityY(-this.speed);
		}else{
			this.body.setVelocityY(0);
		}
			

		if(this.cursors.left.isDown || this.a.isDown){
			this.body.setVelocityX(-this.speed);
		}
		else if(this.cursors.right.isDown || this.d.isDown){
			this.body.setVelocityX(this.speed);
		}else{
			this.body.setVelocityX(0);
		}	

		//console.log(this.getCenter());

	}

	addMoney(money){
		this.inventory.addMoney(money);
		this.scene.updateInventoryText(this.inventory.getMoney());
	}
}