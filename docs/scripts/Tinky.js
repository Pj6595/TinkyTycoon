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
        this.tinkyValue = [7];
            this.tinkyValue[0] = 1 * this.valueIndex;
            this.tinkyValue[1] = 2 * this.valueIndex;
            this.tinkyValue[2] = 3 * this.valueIndex;
            this.tinkyValue[3] = 5 * this.valueIndex;
            this.tinkyValue[4] = 10 * this.valueIndex;
            this.tinkyValue[5] = 15 * this.valueIndex;
            this.tinkyValue[6] = 20 * this.valueIndexx;
    }

    upgradeTinky(){
        this.status = this.status+1;
    }

    returnTinkyValue(){
        let value = this.value[tinkyType];
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