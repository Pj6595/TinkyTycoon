export default class Tinky{
    constructor(value, capacity){
        this.tinkyStates = {
            normal : 0,
            clean : 1,
            polished: 2,
            hormonated: 3,
        }

        this.occupied = 0;
        this.capacity = capacity;

        //El estado de los tinkies comienza siendo 'normal'
        this.status = this.tinkyStates.normal;

        //Inicializamos el inventario de tinkies de cada tipo
        this.tinkyInventory = [7]; 
        for(let i=0; i<7; i++){
            this.tinkyInventory[i]=0;
        }

        //Determinamos el dinero que vale cada tipo de Tinky
        this.tinkyValue = [7];
            this.tinkyValue[0] = 1 * this.valueIndex;
            this.tinkyValue[1] = 2 * this.valueIndex;
            this.tinkyValue[2] = 3 * this.valueIndex;
            this.tinkyValue[3] = 5 * this.valueIndex;
            this.tinkyValue[4] = 10 * this.valueIndex;
            this.tinkyValue[5] = 15 * this.valueIndex;
            this.tinkyValue[6] = 20 * this.valueIndex;

        /*Value es el índice del valor de cada Tinky
        (crece al cambiar de planeta, comienza siendo 1)*/
        this.valueIndex = value;
    }

    //Devuelve el valor total de los tinkies
    getTotalValue(){
        let value = 0;
        for(let i=0; i<7; i++){
            switch(this.status){
                case(this.tinkyStates.normal):
                    value = value + this.tinkyInventory[i] * this.tinkyValue[i];
                    break;
                case(this.tinkyStates.clean):
                    value = value + this.tinkyInventory[i] * this.tinkyValue[i] * 2;
                    break;
                case(this.tinkyStates.polished):
                    value = value + this.tinkyInventory[i] * this.tinkyValue[i] * 10;
                    break;
                case(this.tinkyStates.hormonated):
                    value = value + this.tinkyInventory[i] * this.tinkyValue[i] * 20;
                    break;
            }
        }

        return value;
    }

    //Añade un tinky al inventario
    addTinky(type){
        if(occupied < capacity){
            occupied++;
            this.tinkyInventory[type]++;
        }
        this.status = this.tinkyStates.normal; 
        /*Por razones de simplicidad del código, cada vez que conseguimos un Tinky todos los que tenemos
        volverán a estar en estado normal, por lo que si queremos mejorarlos tendrá que ser justo antes de ir a venderlos*/
    }

    //Aumenta la capacidad del inventario de tinkies
    addCapacity(MoreTinkies){
        this.capacity = this.capacity + MoreTinkies;
    }
}