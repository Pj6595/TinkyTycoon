import Player from './Player.js'
import Crater from './Crater.js'
import Car from './Car.js'
import PlayerBase from './PlayerBase.js'
import SellStation from './SellStation.js'

export default class Planet extends Phaser.Scene{
    constructor(){
        super({key: 'Planet'})
    }
    preload(){
    }
    create(){
        this.createWorld();
        //Craters set-up
        this.createCraters();
        //UI
        this.createUI();

        //Loading station set-up
        this.estacion = new SellStation(this, 1622, 527);

        //Player Base set-up
        this.base = new PlayerBase(this, 578, 638, 1);
       
        //Camera control
        this.cameras.main.startFollow(this.player);
        
        this.debugKey = this.input.keyboard.addKey('P');

        this.debugKey.on('down', event =>{
            console.log(this.player.inventory.returnTotalValue());
        })
    }
    update(){
        this.updateInventoryText();

        /*if (this.physics.overlap(this.player, this.estacion)){
            this.sellButton.setVisible(true);
        } else this.sellButton.setVisible(false);*/
        
        this.estacion.update();
        this.base.update();
    }
    updateInventoryText(){
        this.inventoryText.setText(this.player.money + " dineros");
    }

    createWorld(){
        //Background creation

        this.spaceBackground = this.add.sprite(1920/2, 1080/2, 'starsBackground');
        this.spaceBackground.scale = 1;

        this.background = this.add.sprite(1920/2, 1080/2, 'background');
        this.background.scale = 0.5;


        //Physics initialization and world bounds

        this.physics.world.setBounds(0, 0, 1920, 1080);
        this.player = new Player(this, 0, 0, 50, 50, 10);
        this.car = new Car(this, 800, 500, 10, this.player);

        this.car.setCollider(this.physics.add.collider(this.player, this.car));
    }

    createSellStation(){
        /*
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
                this.player.sellTinkies(this.car.inventory);
                console.log("vendido");
        })*/
    }


    createCraters(){
        this.crateres = this.add.group();

        this.crateres.add(new Crater(this, 430, 200, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 400, 400, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 180, 520, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 240, 840, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 690, 990, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 1040, 890, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 1360, 800, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 1320, 520, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 755, 320, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 1040, 270, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 1330, 240, Math.floor(Math.random()*7)));
        this.crateres.add(new Crater(this, 980, 600, Math.floor(Math.random()*7)));

        this.physics.add.collider(this.player, this.crateres);
        this.physics.add.collider(this.car, this.crateres);
    }

    createUI(){
        //Inventory
        this.inventoryText = this.add.text(10, 10, 0 + " dineros");
        this.inventoryText.setFontSize(50);
        this.inventoryText.setScrollFactor(0);
    }
}