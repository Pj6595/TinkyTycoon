import Inventory from './Inventory.js'
import ControllableSprite from './ControllableSprite.js'

export default class Player extends ControllableSprite{
	constructor(scene, x, y, inventoryCapacity, speed){
		super(scene,x,y,'player',speed, true);
		this.scale = 2;

		this.money = 0;

		this.inventory = new Inventory(inventoryCapacity);

		this.toolTier = 1;

		this.setUpAnimations();

	}

	setUpAnimations(){
		//Animations
		this.scene.anims.create({
			key: 'PlayerIdle',
			frames: [ { key: 'player', frame: 0 } ],
			frameRate: 20,
			repeat: -1
		})
		this.scene.anims.create({
    	key: 'PlayerDown',
    	frames: this.scene.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
    	frameRate: 5,
    	repeat: -1
		});

		this.scene.anims.create({
    	key: 'PlayerUp',
    	frames: this.scene.anims.generateFrameNumbers('player', {frames:[3,4]}),
    	frameRate: 5,
    	repeat: -1
		});

		this.scene.anims.create({
    	key: 'PlayerRight',
    	frames: this.scene.anims.generateFrameNumbers('player', { start: 5, end: 6 }),
    	frameRate: 5,
    	repeat: -1
		});

		this.scene.anims.create({
    	key: 'PlayerLeft',
    	frames: this.scene.anims.generateFrameNumbers('player', { start: 7, end: 8 }),
    	frameRate: 5,
    	repeat: -1
		});
	}

	addMoney(newMoney){
		this.money += newMoney;
	}

	returnMoney(){
        return this.money;
    }

	upgradeTool(levels){
		this.toolTier += levels;
	}

	returnToolTier(){
		return this.toolTier;
	}

	sellTinkies(tinkyContainer){
		this.money += tinkyContainer.returnTotalValue();
		tinkyContainer.empty();
	}

	updateAnims(){
		if(this.movement.vertical == -1)
			this.scene.player.anims.play('PlayerUp',true);
		else if(this.movement.vertical == 1)
			this.scene.player.anims.play('PlayerDown',true);
		else if(this.movement.sideways == -1)
			this.scene.player.anims.play('PlayerLeft',true);
		else if(this.movement.sideways == 1)
			this.scene.player.anims.play('PlayerRight',true);
		else
			this.scene.player.anims.play('PlayerIdle',true);
	}
}