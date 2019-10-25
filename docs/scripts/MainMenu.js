export default class MainMenu extends Phaser.Scene{
	constructor(){
		super({key:'MainMenu'})
	}
	create(){
		const playButton = this.add.text(100, 100, 'Comenzar', {fill:'#0f0'});
		playButton.setInteractive();

		playButton.on('pointerdown', ()=> {this.scene.start('Planet')})
	}
}