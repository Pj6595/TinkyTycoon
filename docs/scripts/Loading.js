export default class Loading extends Phaser.Scene{
	constructor(){
		super({key:'Loading'})
	}
	create(){
		this.currentLevel = 0
		this.scene.launch('Planet',[this.currentLevel,this]);
	}

	nextLevel(){
		this.scene.remove('Planet');
		this.currentLevel++;
		this.scene.launch('Planet',[this.currentLevel,this]);
	}
}