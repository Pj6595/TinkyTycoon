import Player from './Player.js'

export default class MainMenu extends Phaser.Scene{
	constructor(){
		super({key:'MainMenu'})
	}
	create(){
		this.player = new Player(this, 200, 300);
	}
}