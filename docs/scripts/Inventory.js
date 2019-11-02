export default class Inventory{
    constructor(){
        this.money = 0;

        this.tinkies = [7];
        this.tinkies[0]=0;
        this.tinkies[1]=0;
        this.tinkies[2]=0;
        this.tinkies[3]=0;
        this.tinkies[4]=0;
        this.tinkies[5]=0;
        this.tinkies[6]=0;
    }
    getMoney(){
        return this.money;
    }
    addMoney(newMoney){
        this.money = this.money + newMoney;
    }
}