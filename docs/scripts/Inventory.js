import Tinky from './Tinky.js'

export default class Inventory extends Tinky{
    constructor(tinkyValue, tinkyCapacity){

        super(tinkyValue, tinkyCapacity);

        this.money = 0;
    }
    addMoney(newMoney){
        this.money = this.money + newMoney;
    }
    getMoney(){
        return this.money;
    }
}