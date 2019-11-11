import Tinky from './Tinky.js'

export default class Inventory{
    constructor(capacity){
        this.capacity = capacity;
        this.numTinkies = 0;

        this.tinkies = [];
    }

    //Devuelve el valor total de los tinkies
    returnTotalValue(){
        let value = 0;
        for(let i=0; i<this.numTinkies; i++){
            value += this.tinkies[i].returnTinkyValue();
        }

        return value;
    }

    //Añade un tinky al inventario
    addTinky(type){
        if(this.numTinkies < this.capacity){
            this.tinkies.push(new Tinky(type));
            this.numTinkies++;
        }
        else{
            console.log("No cabe we");
        }
        for(let i=0; i<this.numTinkies; i++){
            console.log(this.tinkies[i]);
        }
    }

    //Aumenta la capacidad del inventario de tinkies
    addCapacity(MoreTinkies){
        this.capacity = this.capacity + MoreTinkies;
    }

    empty(){
        this.numTinkies = 0;
        this.tinkies.length=0;
    }
}

//inventario con array de tinkies, tiene una capacidad con metodos para cambiarla.