import Player from './Player.js'
import Crater from './Crater.js'

export default class Planet extends Phaser.Scene{
    constructor(){
        super({key: 'Planet'})
    }
    create(){
        this.player = new Player(this, 200, 300);
        this.crater1 = new Crater(this, 100, 100,6);
	}
}