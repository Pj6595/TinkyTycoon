export default class Minigame extends Phaser.Scene{
	constructor(){
		super({key:'Minigame'})
    }
    init(numerito){
        let playButton = this.add.text(100, 100, numerito, {fill:'#0f0'}).setFontSize(100);
    }
}