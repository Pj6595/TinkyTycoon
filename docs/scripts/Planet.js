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
        this.load.tilemapTiledJSON('planetTilemap', 'resources/Planet.json');
        this.load.image('Planet', 'resources/PlanetGrey.png');
        this.load.image('CliffGrey', 'resources/CliffGrey.png');
    }
    create(){
        this.createWorld();
        //Craters set-up
        this.createCraters(70);
        
        this.createPlayerAndBases();

        //UI
        this.createUI();

        this.cameras.main.setZoom(0.2);

        this.debugKey = this.input.keyboard.addKey('P');
        this.inventoryKey = this.input.keyboard.addKey('I');

        this.debugKey.on('down', event =>{
            console.log(this.player.inventory.returnTotalValue());
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
        this.station.update();
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
        this.worldPadding= 97;
        //Background creation

        this.spaceBackground = this.add.sprite(1920/2, 1080/2, 'starsBackground');
        this.spaceBackground.setScale(5);

        this.map = this.make.tilemap({
            key:'planetTilemap',
            tileWidth: 32,
            tileHeight: 32
        });
    
        this.tileset1 = this.map.addTilesetImage('PlanetGrey', 'Planet');
        this.tileset2 = this.map.addTilesetImage('CliffGrey', 'CliffGrey');
        this.map.createStaticLayer('PlanetSurface', [this.tileset1, this.tileset2]);
        console.log(this.map.heightInPixels);

        //Physics initialization and world bounds
        this.physics.world.setBounds(this.worldPadding, this.worldPadding, 4930, 4965);
    }

    createPlayerAndBases(){
        let mapWidth = this.map.widthInPixels;
        let mapHeight = this.map.heightInPixels;
        this.player = new Player(this, mapWidth/2, mapHeight/2, 10, 200);
        this.car = new Car(this, mapWidth/2+100, mapHeight/2-this.player.displayHeight/2, 10, 500, this.player);
        //Loading station set-up
        this.station = new SellStation(this, this.map.widthInPixels/2+300, this.map.heightInPixels/2);
        //Player Base set-up
        this.base = new PlayerBase(this, mapWidth/2-250, mapHeight/2, 1);

        this.physics.add.collider(this.station,this.car);
        this.physics.add.collider(this.base,this.car);
        this.physics.add.collider(this.player, this.crateres);
        this.physics.add.collider(this.car, this.crateres);
        this.car.setCollider(this.physics.add.collider(this.player, this.car));
    }


    createCraters(amount){
        this.crateres = this.add.group();

        let craterSizeX = 100;
        let craterSizeY = 100;
        let mapWidth = this.map.widthInPixels;
        let mapHeight = this.map.heightInPixels;
        let worldPadding = this.worldPadding
        let crateres = this.crateres;
        //this.crateres.add(new Crater(this, 430, 200, Math.floor(Math.random()*7)));
        for(let i = 0; i < amount; i++){
            let position = randomizePosition();
            //Check if the position would intersect with player starting area
            crateres.add(new Crater(this, position[0], position[1], Math.floor(Math.random()*7)));
        }

        function randomizePosition(){
            let posX = Math.floor(Math.random()*(mapWidth-worldPadding-craterSizeX))+worldPadding;
            let posY = Math.floor(Math.random()*(mapHeight-worldPadding-craterSizeY))+worldPadding;
            while(posX > 2200 && posX < 2700 && posY > 2400 && posY < 2750 && !collidesExistingCraters(posX,posY)){
                posX = Math.floor(Math.random()*(mapWidth-worldPadding-craterSizeX))+worldPadding;
                posY = Math.floor(Math.random()*(mapHeight-worldPadding-craterSizeY))+worldPadding;
                }
            return [posX,posY];
        }

        function collidesExistingCraters(posX,posY){
            let j = 0;
            let maxCraters = craters.children.size;
            let collided = false;
            while(j < maxCraters && !collided){
                if(posX > (craters.children.entries[j].x-craters.children.entries[j].width) && posX < (craters.children.entries[j].x+craters.children.entries[j].width) 
                && posY > (craters.children.entries[j].y-craters.children.entries[j].height) && posY < (craters.children.entries[j].y+craters.children.entries[j].height))
                    collided = true;
                j++;
            }
        }
        
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