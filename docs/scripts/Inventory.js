import Tinky from './Tinky.js'

export default class Inventory{
    constructor(capacity){
        this.capacity = capacity;
        this.numTinkies = 0;

        this.tinkies = [this.capacity];
    }

    //Devuelve el valor total de los tinkies
    returnTotalValue(){
        let value = 0;
        for(let i=0; i<this.capacity; i++){
            value += tinkies[i].returnTinkyValue();
        }

        return value;
    }

    //Añade un tinky al inventario
    addTinky(type){
        if(this.numTinkies < this.capacity){
            this.tinkies[this.numTinkies] = new Tinky(type);
            this.numTinkies++;
        }else
            console.log("No cabe we");
    }

    //Aumenta la capacidad del inventario de tinkies
    addCapacity(MoreTinkies){
        this.capacity = this.capacity + MoreTinkies;
    }
}

//inventario con array de tinkies, tiene una capacidad con metodos para cambiarla.