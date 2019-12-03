import Player from './Player.js'
import Crater from './Crater.js'
import Car from './Car.js'

export default class Planet extends Phaser.Scene{
    constructor(){
        super({key: 'Planet'})
    }
    preload(){
    }
    create(){
        this.carPrice = 10;
        this.toolPrice = 15;
        this.cleanerPrice = 

        this.createWorld();
        //Craters set-up
        this.createCraters();
        //UI
        this.createUI();

        //Loading station set-up
        this.createSellStation();
        
        //Player Base set-up
        this.createPlayerBase();
       
        //Camera control

        this.cameras.main.startFollow(this.player);
        
        this.debugKey = this.input.keyboard.addKey('P');

        this.debugKey.on('down', event =>{
            console.log(this.player.inventory.returnTotalValue());
        })
    }
    update(){
        this.updateInventoryText();

        if (this.physics.overlap(this.player, this.estacion)){
            this.sellButton.setVisible(true);
        } else this.sellButton.setVisible(false);

        if(this.physics.overlap(this.player, this.base)){
            this.playerBaseGroup.setVisible(true);
            if(this.player.money < this.toolPrice) this.ToolButton.setVisible(false);
            if(this.player.money < this.carPrice) this.vehicleButton.setVisible(false);
        } else this.playerBaseGroup.setVisible(false);
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
        })
    }

    createPlayerBase(){
        this.base = this.add.sprite(578, 638, 'playerBase');
        this.physics.add.existing(this.base);
        this.base.body.setImmovable();

        this.playerBaseContainer = this.add.container(400, 300);
        this.playerBaseGroup = this.add.group();

        let playerBaseWindow = this.add.image(400, 300, 'UIWindow');
        playerBaseWindow.setScale(0.5);
        playerBaseWindow.setScrollFactor(0);
        this.playerBaseGroup.add(playerBaseWindow);

        let DisabledToolButton = this.add.image(245, 225, 'DisabledButton');
        DisabledToolButton.setScale(0.4);
        DisabledToolButton.setScrollFactor(0);
        this.playerBaseGroup.add(DisabledToolButton);

        let ToolButtonText = this.add.text(80, 120, ['Actualizar herramienta', this.toolPrice + ' dineros']).setAlign('center').setFontSize(25).setColor('black');
        ToolButtonText.setScrollFactor(0);
        this.playerBaseGroup.add(ToolButtonText);

        this.ToolButton = this.add.image(245, 225, 'EnabledButton');
        this.ToolButton.setScale(0.4);
        this.ToolButton.setInteractive();
        this.ToolButton.on('pointerdown', ()=> {this.buyToolUpdate(ToolButtonText, this.ToolButton, DisabledToolButton)});
        this.ToolButton.setScrollFactor(0);
        this.playerBaseGroup.add(this.ToolButton);

        let DisabledVehicleButton = this.add.image(245, 395, 'DisabledButton');
        DisabledVehicleButton.setScale(0.4);
        DisabledVehicleButton.setScrollFactor(0);
        this.playerBaseGroup.add(DisabledVehicleButton);

        let vehicleButtonText = this.add.text(130, 290, ['Actualizar coche', this.carPrice + ' dineros']).setAlign('center').setFontSize(25).setColor('black');
        vehicleButtonText.setScrollFactor(0);
        this.playerBaseGroup.add(vehicleButtonText);

        this.vehicleButton = this.add.image(245, 395, 'EnabledButton');
        this.vehicleButton.setScale(0.4);
        this.vehicleButton.setInteractive();
        this.vehicleButton.on('pointerdown', ()=> {this.buyCarUpdate(vehicleButtonText)});
        this.vehicleButton.setScrollFactor(0);
        this.playerBaseGroup.add(this.vehicleButton);

        this.buyCleanerButton = this.add.image(590, 200, 'EnabledButton');
        this.buyCleanerButton.setScale(0.3);
        this.buyCleanerButton.setScrollFactor(0);
        this.buyCleanerButton.setInteractive();
        this.buyCleanerButton.on('pointerdown', ()=> {this.buyCleaner()})
        this.playerBaseGroup.add(this.buyCleanerButton);

        let DisabledCleanerButton = this.add.image(590, 200, 'DisabledButton');
        DisabledCleanerButton.setScale(0.3);
        DisabledCleanerButton.setScrollFactor(0);
        this.playerBaseGroup.add(DisabledCleanerButton);

        let cleanerText = this.add.text(530, 120, ['Comprar', 'Limpiadora']).setAlign('center').setFontSize(20).setColor('black');
        cleanerText.setScrollFactor(0);
        this.playerBaseGroup.add(cleanerText);

        

        this.playerBaseGroup.toggleVisible();
    }

    buyToolUpdate(text, buyToolButton, buyToolButtonDisabled){
        this.player.upgradeTool(1);
        this.player.money -= this.toolPrice;
        this.toolPrice *= 20;
        if(this.player.toolTier < 7){
            text.setText(['Actualizar herramienta', this.toolPrice + ' dineros']);
        }
        else{
            text.setText(['Herramienta', 'al máximo']);
            text.setX(text.x + 80); text.setY(text.y + 70);
            buyToolButton.destroy();
            buyToolButtonDisabled.destroy();
        }
        
    }

    buyCarUpdate(text){
        this.car.inventory.addCapacity(20);
        this.car.speed +=100;
        this.player.money -= this.carPrice;
        this.carPrice*=20;
        text.setText(['Actualizar coche', this.carPrice + ' dineros']);
    }

    buyCleaner(disabledCleanerButton, buyCleanerButton){

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