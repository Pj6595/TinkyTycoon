import Player from './Player.js'
import Crater from './Crater.js'
import Inventory from './Inventory.js'

export default class Planet extends Phaser.Scene{
    constructor(){
        super({key: 'Planet'})
    }
    preload(){
        this.load.image('background','resources/Mapa.png');
        this.load.image('starsBackground','resources/stars.png');
    }
    create(){

        //Background creation

        let spaceBackground = this.add.sprite(1920/2, 1080/2, 'starsBackground');
        spaceBackground.scale = 1;

        let background = this.add.sprite(1920/2, 1080/2, 'background');
        background.scale = 0.5;


        //Physics initialization and world bounds

        this.physics.world.setBounds(0, 0, 1920, 1080);
        this.player = new Player(this, 0, 0, 50, 50, 10);


        //Craters set-up

      //  this.crateres = []; //[12];

        this.crateres.push(new Crater(this, 430, 200, 6));
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


        //This camera shows the inventory
        this.UICamera = this.cameras.add(0,0,800,600);
        this.UICamera.ignore([spaceBackground, background, this.crateres, this.player]);
        this.inventoryText = this.add.text(10, 10, 0 + " dineros");
        this.inventoryText.setFontSize(50);
        this.inventoryText.setScrollFactor(0);
        this.cameras.main.ignore(this.inventoryText);

        //Camera control

        this.cameras.main.startFollow(this.player);
        this.cameraZoom = 1;

        //Input set-up

        this.ZoomInKey = this.input.keyboard.addKey('Z');

        this.ZoomInKey.on('down', event => {
            if(this.cameraZoom < 4){
                this.cameraZoom = this.cameraZoom * 1.2;
            }
            
            this.player.addMoney(10);
        });

        this.ZoomOutKey = this.input.keyboard.addKey('X');

        this.ZoomOutKey.on('down', event => {
            if(this.cameraZoom > 0.7)
                this.cameraZoom = this.cameraZoom * 0.8;
        });
    }
    update(){
        //console.log(this.player.getCenter());
        this.cameras.main.setZoom(this.cameraZoom);
    }
    updateInventoryText(money){
        this.inventoryText.setText(money + " dineros");
    }
}