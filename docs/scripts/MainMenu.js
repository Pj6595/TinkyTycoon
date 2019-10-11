export default class MainMenu extends Phaser.Scene{
	constructor(){
		super({key:'MainMenu'})
	}
	create(){
		this.add.sprite(100,200,'player')
	}
}