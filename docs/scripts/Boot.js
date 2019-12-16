export default class Boot extends Phaser.Scene{
	constructor(){
		super({key:'Boot'});
	}
	preload(){
		this.load.image('inventory','resources/Inventory3.png');
        this.load.image('starsBackground','resources/stars.png');
		this.load.image('sellStation', 'resources/estacionCarga.png');
		this.load.image('playerBase', 'resources/baseJugador.png');
		this.load.image('UIWindow', 'resources/BaseWindow.png');
		this.load.image('EnabledButton', 'resources/ButtonEnabled.png');
		this.load.image('DisabledButton', 'resources/ButtonDisabled.png');
		this.load.image('ApplyButton', 'resources/ButtonApply.png');
		this.load.image('SellButton', 'resources/SellButton.png')
		this.load.image('minigameBackground', 'resources/MinigameBackground.png');
		this.load.spritesheet('tinkies','resources/Tinkies2.png',{frameWidth:44,frameHeight:64});
		this.load.spritesheet('arrows','resources/Arrows.png',{frameWidth:32,frameHeight:32});
		this.load.spritesheet('craters','resources/CratersGrey.png',{frameWidth:64,frameHeight:39});
		this.load.spritesheet('player','resources/Player-sheet.png',{frameWidth: 20, frameHeight: 32});
		this.load.spritesheet('car','resources/CarSprite.png',{frameWidth:64,frameHeight:64});

		this.load.audio('backgroundMusic', 'resources/backgroundMusic.ogg');
		this.load.audio('minigameMusic', 'resources/minigameMusic.ogg');
		this.load.audio('carSound', 'resources/carSound.ogg');
		this.load.audio('mainMenuMusic', 'resources/mainMenuTheme.ogg');
		this.load.image('logo', 'resources/TinkyTycoonLogo.png');
	}
	create(){
		this.scene.start('MainMenu');
	}
}