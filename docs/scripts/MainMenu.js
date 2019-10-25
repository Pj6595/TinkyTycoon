import Player from './Player.js'
import Crater from './Crater.js'

export default class MainMenu extends Phaser.Scene{
	constructor(){
		super({key:'MainMenu'})
	}
	create(){
		this.player = new Player(this, 400, 300);
		this.crater1 = new Crater(this, 100, 100,6);
	}
}