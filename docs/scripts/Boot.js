export default class Boot extends Phaser.Scene{
	constructor(){
		super({key:'Boot'});
	}
	preload(){
		this.load.image('player','resources/tinky.png');
		this.load.image('crater','resources/crater.png');
        this.load.image('starsBackground','resources/stars.png');
        this.load.image('loadingStation', 'resources/estacionCarga.png');
        this.load.image('car','resources/car.png');
	}
	create(){
		this.scene.start('MainMenu');
	}
}