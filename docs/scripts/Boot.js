export default class Boot extends Phaser.Scene{
	constructor(){
		super({key:'Boot'});
	}
	preload(){
		this.load.image('inventory','resources/Inventory3.png');
        this.load.image('starsBackground','resources/stars.png');
		this.load.image('sellStation', 'resources/estacionCarga.png');
		this.load.image('playerBase', 'resources/baseJugador.png');
		this.load.image('car','resources/Car.png');
		this.load.image('UIWindow', 'resources/BaseWindow.png');
		this.load.image('EnabledButton', 'resources/ButtonEnabled.png');
		this.load.image('DisabledButton', 'resources/ButtonDisabled.png');
		this.load.image('ApplyButton', 'resources/ButtonApply.png');
		this.load.image('SellButton', 'resources/SellButton.png')
		this.load.spritesheet('craters','resources/CratersGrey.png',{frameWidth:64,frameHeight:39});
		this.load.spritesheet('player','resources/Player-sheet.png',{frameWidth: 20, frameHeight: 32});
		this.load.audio('backgroundMusic', 'resources/audio/backgroundMusic.mp3');
		this.load.audio('minigameMusic', 'resources/audio/minigameMusic.mp3');
		this.load.audio('carSound', 'resources/audio/carSound.mp3');
		this.load.audio('mainMenuMusic', 'resources/audio/mainMenuTheme.mp3');
		this.load.image('logo', 'resources/TinkyTycoonLogo.png');
	}
	create(){
		this.scene.start('MainMenu');
	}
}