import Inventory from './Inventory.js'
import ControllableSprite from './ControllableSprite.js'

export default class Player extends ControllableSprite{
	constructor(scene, x, y, w, h, inventoryCapacity){
		super(scene,x,y,'player',100, true);
		this.scale = 1;

		this.money = 0;

		this.inventory = new Inventory(inventoryCapacity);

		this.toolTier = 1;

		//Animations
		this.scene.anims.create({
    	key: 'PlayerUp',
    	frames: this.scene.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
    	frameRate: 10,
    	repeat: -1
		});

		this.scene.anims.create({
    	key: 'PlayerDown',
    	frames: this.scene.anims.generateFrameNumbers('player', { start: 3, end: 4 }),
    	frameRate: 10,
    	repeat: -1
		});

		this.scene.anims.create({
    	key: 'PlayerRight',
    	frames: this.scene.anims.generateFrameNumbers('player', { start: 5, end: 6 }),
    	frameRate: 10,
    	repeat: -1
		});

		this.scene.anims.create({
    	key: 'PlayerLeft',
    	frames: this.scene.anims.generateFrameNumbers('player', { start: 7, end: 8 }),
    	frameRate: 10,
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
}