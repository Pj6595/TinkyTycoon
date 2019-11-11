export default class Boot extends Phaser.Scene{
	constructor(){
		super({key:'Boot'});
	}
	preload(){
		this.load.image('player','resources/tinky.png');
		this.load.image('crater','resources/crater.png');
		
	}
	create(){
		this.scene.start('MainMenu');
	}
}