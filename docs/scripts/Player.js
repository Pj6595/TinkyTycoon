import Inventory from './Inventory.js'
import ControllableSprite from './ControllableSprite.js'

export default class Player extends ControllableSprite{
	constructor(scene, x, y, inventoryCapacity){
		super(scene,x,y,'player',100, true);
		this.scale = 0.2;

		this.money = 0;

		this.inventory = new Inventory(inventoryCapacity);

		this.toolTier = 1;
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