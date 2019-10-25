import Player from './Player.js'

export default class Planet extends Phaser.Scene{
    constructor(){
        super({key: 'Planet'})
    }
    create(){
		this.player = new Player(this, 200, 300);
	}
}