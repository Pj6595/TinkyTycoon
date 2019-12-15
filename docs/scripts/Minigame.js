export default class Minigame extends Phaser.Scene{
	constructor(){
		super({key:'Minigame'})
    }
    init(numerito){
        let playButton = this.add.text(100, 100, numerito, {fill:'#0f0'}).setFontSize(100);
    }
    create(){
    	this.background = this.add.image(this.cameras.main.width/2,this.cameras.main.height*2/3,'minigameBackground');
    }
}