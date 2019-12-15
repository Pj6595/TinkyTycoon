import Player from './Player.js'
import Crater from './Crater.js'
import Car from './Car.js'
import PlayerBase from './PlayerBase.js'
import SellStation from './SellStation.js'

export default class Planet extends Phaser.Scene{
    constructor(){
        super({key: 'Planet'})
    }
    init(lvl){
        this.level = lvl;
        this.planetTilesets = ['resources/PlanetGrey.png', 'resources/PlanetBlue.png', 'resources/PlanetGreen.png', 
        'resources/PlanetRed.png', 'resources/PlanetBrown.png', 'resources/PlanetPurple.png'];
        this.cliffTilesets = ['resources/CliffGrey.png', 'resources/CliffBlue.png', 'resources/CliffGreen.png',
        'resources/CliffRed.png', 'resources/CliffBrown.png', 'resources/CliffPurple.png'];
    }
    preload(){
        this.load.tilemapTiledJSON('planetTilemap', 'resources/Planet.json');
        this.load.image('Planet', this.planetTilesets[this.level]);
        this.load.image('Cliff', this.cliffTilesets[this.level]);
    }
    create(){
        this.createWorld();
        //Craters set-up
        this.createCraters();

        //Loading station set-up
        this.estacion = new SellStation(this, 1622, 527);

        //Player Base set-up
        this.base = new PlayerBase(this, 578, 638, 1);
       
        //UI
        this.createUI();

        this.debugKey = this.input.keyboard.addKey('P');
        this.inventoryKey = this.input.keyboard.addKey('I');

        this.debugKey.on('down', event =>{
            this.scene.restart();
        })

        this.inventoryKey.on('down', event =>{
            if(this.tinkyInventoryIsOpen)
                this.inventoryCloseTween.play();
            else
                this.inventoryOpenTween.play();

            this.tinkyInventoryIsOpen = !this.tinkyInventoryIsOpen;
        })
    }

    update(){ 
        this.estacion.update();
        this.base.update();
    }

    updateInventoryText(){
        this.moneyText.setText(this.player.money + " dineros");

        let numberOfTinkiesPlayer = [0,0,0,0,0,0,0];
        let numberOfTinkiesCar = [0,0,0,0,0,0,0];
        //Update player inventory
        //Get number of tinkies in each category
        //Player
        for(let i = 0; i < this.player.inventory.numTinkies; i++){
            numberOfTinkiesPlayer[this.player.inventory.tinkies[i].tinkyType] += 1;
        }
        //Car
        for(let i = 0; i < this.car.inventory.numTinkies; i++){
            numberOfTinkiesCar[this.car.inventory.tinkies[i].tinkyType] += 1;
        }
        //Update inventory text
        for(let i = 0; i < 7; i++){
            let currentInventoryTxtPlayer = this.tinkyInventoryContainer.list[i+1];
            let currentInventoryTxtCar = this.tinkyInventoryContainer.list[i+8];
            currentInventoryTxtPlayer.setText(numberOfTinkiesPlayer[i]);
            currentInventoryTxtCar.setText(numberOfTinkiesCar[i]);
            console.log("Updated for tinkyType", i);
        }
    }

    createWorld(){
        //Background creation

        this.spaceBackground = this.add.sprite(1920/2, 1080/2, 'starsBackground');
        this.spaceBackground.setScale(5);

        this.map = this.make.tilemap({
            key:'planetTilemap',
            tileWidth: 32,
            tileHeight: 32
        });
    
        this.tileset1 = this.map.addTilesetImage('Planet', 'Planet');
        this.tileset2 = this.map.addTilesetImage('Cliff', 'Cliff');
        this.map.createStaticLayer('PlanetSurface', [this.tileset1, this.tileset2]);


        //Physics initialization and world bounds

        this.physics.world.setBounds(97, 97, 4930, 4965);
        this.player = new Player(this, 800, 500, 10);
        this.car = new Car(this, 864, 564, 10, this.player);

        this.car.setCollider(this.physics.add.collider(this.player, this.car));
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
        let elementPadding = 5; //pixels
        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;

        this.cameras.main.startFollow(this.player);
        //Selling Tinkies
      
        //Inventory
        this.moneyText = this.add.text(10, 10, 0 + " dineros");
        this.moneyText.setFontSize(50);
        this.moneyText.setScrollFactor(0);

        this.tinkyInventory = this.add.image(0, 0, 'inventory');
        this.tinkyInventory.x = gameWidth + this.tinkyInventory.displayWidth/2;
        this.tinkyInventory.y = elementPadding + this.tinkyInventory.displayHeight/2;
        this.tinkyInventory.setScrollFactor(0);
        this.tinkyInventoryIsOpen = false;

        this.tinkyInventoryContainer = this.add.container(0,0,[this.tinkyInventory]);
        let xOffset = this.tinkyInventory.x-this.tinkyInventory.width/2+this.tinkyInventory.width/3;
        for(let i = 0; i < 14; i++){
            if(i == 7) xOffset += this.tinkyInventory.width/3;
            this.tinkyInventoryContainer.add(new Phaser.GameObjects.Text(this,xOffset,elementPadding+64+2+16+(65*(i%7)),0));
            this.tinkyInventoryContainer.last.setScrollFactor(0);
            this.tinkyInventoryContainer.last.setFontSize(50);
        }

        this.inventoryOpenTween = this.tweens.add({
                targets: this.tinkyInventoryContainer,
                x: { from: 0, to: 0 - this.tinkyInventory.displayWidth - elementPadding},
                ease: 'Quad.easeOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0,            // -1: infinity
                paused: true,
                yoyo: false
            });

        this.inventoryCloseTween = this.tweens.add({
                targets: this.tinkyInventoryContainer,
                x: { from: 0 - this.tinkyInventory.displayWidth - elementPadding, to: 0},
                ease: 'Quad.easeOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0,            // -1: infinity
                paused: true,
                yoyo: false
            });
    }
}