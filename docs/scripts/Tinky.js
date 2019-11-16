export default class Tinky{
    constructor(tinkyType){
        this.tinkyStates = {
            normal : 0,
            clean : 1,
            polished: 2,
            hormonated: 3,
        }

        this.tinkyType = tinkyType;

        //El estado de los tinkies comienza siendo 'normal'
        this.status = this.tinkyStates.normal;

        this.valueIndex = 1; //Preguntar al planeta cual es su value index
        
        //Determinamos el dinero que vale cada tipo de Tinky
        this.tinkyValue = [];
            this.tinkyValue.push(1 * this.valueIndex);
            this.tinkyValue.push(2 * this.valueIndex);
            this.tinkyValue.push(3 * this.valueIndex);
            this.tinkyValue.push(5 * this.valueIndex);
            this.tinkyValue.push(10 * this.valueIndex);
            this.tinkyValue.push(15 * this.valueIndex);
            this.tinkyValue.push(20 * this.valueIndex);
    }

    upgradeTinky(){
        this.status = this.status+1;
    }

    returnTinkyValue(){
        let value = this.tinkyValue[this.tinkyType];
        switch(this.status){
                case(this.tinkyStates.clean):
                    value = value * 2;
                    break;
                case(this.tinkyStates.polished):
                    value = value * 10;
                    break;
                case(this.tinkyStates.hormonated):
                    value = value * 20;
                    break;
            }
        return value;
    }

    
}