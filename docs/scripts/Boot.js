export default class Boot extends Phaser.Scene{
	constructor(){
		super({key:'Boot'});
	}
	preload(){
		this.load.image('player','resources/tinky.png');
		this.load.image('crater','resources/crater.png');
		this.load.image('SellStation', 'resources/estacionCarga.png');
		this.load.image('background','resources/Mapa.png');
        this.load.image('starsBackground','resources/stars.png');
		this.load.image('loadingStation', 'resources/estacionCarga.png');
		this.load.image('playerBase', 'resources/baseJugador.png');
		this.load.image('car','resources/car.png');
		this.load.image('UIWindow', 'resources/BaseWindow.png');
		this.load.image('EnabledButton', 'resources/ButtonEnabled.png');
		this.load.image('DisabledButton', 'resources/ButtonDisabled.png')
	}
	create(){
		this.scene.start('MainMenu');
	}
}