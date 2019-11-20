import Player from './Player.js'
import Crater from './Crater.js'
import Inventory from './Inventory.js'
import Car from './Car.js'

export default class Planet extends Phaser.Scene{
    constructor(){
        super({key: 'Planet'})
    }
    preload(){
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
        this.car = new Car(this, 800, 500, 10, this.player);

        this.car.setCollider(this.physics.add.collider(this.player, this.car));
        //Craters set-up

        this.crateres = this.add.group();


        this.crateres.add(new Crater(this, 430, 200, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 400, 400, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 180, 520, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 240, 840, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 690, 990, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 1040, 890, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 1360, 800, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 1320, 520, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 755, 320, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 1040, 270, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 1330, 240, 6, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 980, 600, 6, Math.floor(Math.random()*7)));

        this.physics.add.collider(this.player, this.crateres);
        this.physics.add.collider(this.car, this.crateres);

        //Loading station set-up

        this.estacion = this.add.sprite(1622, 527, 'loadingStation');
        this.physics.add.existing(this.estacion);
        this.estacion.body.setImmovable();
       
        //Selling Tinkies

        this.sellButton = this.add.text(75, 200, 'VENDE');
        this.sellButton.setInteractive();
        this.sellButton.setScrollFactor(0);
        this.sellButton.setFontSize(200);

        this.sellButton.on('pointerdown', ()=> {
                this.player.sellTinkies(this.player.inventory);
                console.log("vendido");
        })

        //This camera shows the inventory
        this.UICamera = this.cameras.add(0,0,800,600);
        this.UICamera.ignore([spaceBackground, background, this.crateres, this.player, this.sellButton, this.car]);
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
            if(this.cameraZoom > 0.7){
                this.cameraZoom = this.cameraZoom * 0.8;
            }
            
            this.player.inventory.addTinky(3);
        });

        this.debugKey = this.input.keyboard.addKey('P');

        this.debugKey.on('down', event =>{
            console.log(this.player.inventory.returnTotalValue());
        })
    }
    update(){
        //console.log(this.player.getCenter());
        this.cameras.main.setZoom(this.cameraZoom);

        this.updateInventoryText();

        if (this.physics.overlap(this.player, this.estacion)){
            this.sellButton.setVisible(true);
        } else this.sellButton.setVisible(false);
    }
    updateInventoryText(){
        this.inventoryText.setText(this.player.money + " dineros");
    }
}