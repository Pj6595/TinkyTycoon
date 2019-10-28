import Player from './Player.js'
import Crater from './Crater.js'

export default class Planet extends Phaser.Scene{
    constructor(){
        super({key: 'Planet'})
    }
    preload(){
        this.load.image('background','resources/Mapa.png');
        this.load.image('starsBackground','resources/stars.png');
    }
    create(){
        let spaceBackground = this.add.sprite(1920/2, 1080/2, 'starsBackground');
        spaceBackground.scale = 1;

        let background = this.add.sprite(1920/2, 1080/2, 'background');
        background.scale = 0.5;

        this.physics.world.setBounds(0, 0, 1920, 1080);
        this.player = new Player(this, 0, 0, 50, 50);

        

        this.crateres = [12];

        this.crateres[0] =  new Crater(this, 430, 200, 6);
        this.crateres[1] = new Crater(this, 400, 400, 6);
        this.crateres[2] = new Crater(this, 180, 520, 6);
        this.crateres[3] = new Crater(this, 240, 840, 6);
        this.crateres[4] = new Crater(this, 690, 990, 6);
        this.crateres[5] = new Crater(this, 1040, 890, 6);
        this.crateres[6] = new Crater(this, 1360, 800, 6);
        this.crateres[7] = new Crater(this, 1320, 520, 6);
        this.crateres[8] = new Crater(this, 755, 320, 6);
        this.crateres[9] = new Crater(this, 1040, 270, 6);
        this.crateres[10] = new Crater(this, 1330, 240, 6);
        this.crateres[11] = new Crater(this, 980, 600, 6);


        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.5);
    }
}