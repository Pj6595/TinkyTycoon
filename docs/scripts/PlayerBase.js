export default class PlayerBase extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, priceI){
        super(scene, x, y, 'playerBase')
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.body.setImmovable();

        //Prices and tier constants

        this.priceIndex = priceI;

        this.carPrice = 10 * this.priceIndex;
        this.toolPrice = 15 * this.priceIndex;
        this.cleanerPrice = 30 * this.priceIndex;
        this.polisherPrice = 200 * this.priceIndex;
        this.hormonatorPrice = 2000 * this.priceIndex;
        this.planetPrice = 10000 * this.priceIndex;
        this.maxtoolTier = 6;
        this.maxCarTier = 5;

        this.cleanerBought = false;
        this.polisherBought = false;
        this.hormonatorBought = false;

        //Window contaimer

        this.playerBaseGroup = this.scene.add.group();

        let playerBaseWindow = this.scene.add.image(400, 300, 'UIWindow');
        playerBaseWindow.setScale(0.5);
        playerBaseWindow.setScrollFactor(0);
        this.playerBaseGroup.add(playerBaseWindow);

        //Tool upgrade
        this.createToolUpgrade();
        
        //Vehicle upgrade
        this.createVehicleUpdgrade();

        //Create Cleaner
        this.createCleaner();

        //Create Polisher
        this.createPolisher();

        //Create Hormonator
        this.createHormonator();

        this.createNextPlanetText();
        

       this.playerBaseGroup.setDepth(this.scene.player.depth + 3);
    }

    createNextPlanetText(){
        let nextPlanetText = this.scene.add.text(120, 460, ['Pase al siguiente planeta', this.planetPrice]).setAlign('center').setFontSize(20).setColor('black').setFontFamily('raleway').setFontStyle('bold');
        nextPlanetText.setScrollFactor(0);
        this.playerBaseGroup.add(nextPlanetText);

        let DisabledPlanetButton = this.scene.add.image(420, 490, 'DisabledButton');
        DisabledPlanetButton.setScrollFactor(0);
        DisabledPlanetButton.setScale(0.3);
        this.playerBaseGroup.add(DisabledPlanetButton);

        this.PlanetButton = this.scene.add.image(420, 490, 'EnabledButton');
        this.PlanetButton.setScale(0.3);
        this.PlanetButton.setInteractive();
        this.PlanetButton.on('pointerdown', ()=> {
            if(this.scene.player.money >= this.planetPrice){
                this.scene.player.money -= this.scene.player.money;
                this.playerBaseGroup.setVisible(false); 
                this.scene.nextLevel()
            }
        });
        this.PlanetButton.setScrollFactor(0);
        this.playerBaseGroup.add(this.PlanetButton);
    }

    createToolUpgrade(){
        //Tool button

        let DisabledToolButton = this.scene.add.image(245, 225, 'DisabledButton');
        DisabledToolButton.setScale(0.4);
        DisabledToolButton.setScrollFactor(0);
        this.playerBaseGroup.add(DisabledToolButton);

        let ToolButtonText = this.scene.add.text(110, 120, ['Actualizar herramienta', this.toolPrice + ' dineros']).setAlign('center').setFontSize(25).setColor('black').setFontFamily('raleway').setFontStyle('bold');
        ToolButtonText.setScrollFactor(0);
        this.playerBaseGroup.add(ToolButtonText);

        this.ToolButton = this.scene.add.image(245, 225, 'EnabledButton');
        this.ToolButton.setScale(0.4);
        this.ToolButton.setInteractive();
        this.ToolButton.on('pointerdown', ()=> {this.buyToolUpdate(ToolButtonText, this.ToolButton, DisabledToolButton)});
        this.ToolButton.setScrollFactor(0);
        this.playerBaseGroup.add(this.ToolButton);
    }

    createVehicleUpdgrade(){
        //Vehicle button

        let DisabledVehicleButton = this.scene.add.image(245, 395, 'DisabledButton');
        DisabledVehicleButton.setScale(0.4);
        DisabledVehicleButton.setScrollFactor(0);
        this.playerBaseGroup.add(DisabledVehicleButton);

        let vehicleButtonText = this.scene.add.text(160, 290, ['Actualizar coche', this.carPrice + ' dineros']).setAlign('center').setFontSize(25).setColor('black').setFontFamily('raleway').setFontStyle('bold');
        vehicleButtonText.setScrollFactor(0);
        this.playerBaseGroup.add(vehicleButtonText);

        this.vehicleButton = this.scene.add.image(245, 395, 'EnabledButton');
        this.vehicleButton.setScale(0.4);
        this.vehicleButton.setInteractive();
        this.vehicleButton.on('pointerdown', ()=> {this.buyCarUpgrade(vehicleButtonText, this.vehicleButton, DisabledVehicleButton)});
        this.vehicleButton.setScrollFactor(0);
        this.playerBaseGroup.add(this.vehicleButton);
    }

    createCleaner(){
        //Cleaner Button

        this.cleanButton = this.scene.add.image(590, 200, 'ApplyButton');
        this.cleanButton.setScale(0.3);
        this.cleanButton.setScrollFactor(0);
        this.cleanButton.setInteractive();
        this.cleanButton.on('pointerdown', ()=> {
            if(this.cleanerBought){
                this.scene.powerUpSound.play();
                this.scene.player.inventory.cleanTinkies(); 
                this.scene.car.inventory.cleanTinkies(); this.scene.displayNotification("Tinkys limpiados",'#03ff52');
            }
        })
        this.playerBaseGroup.add(this.cleanButton);

        let DisabledCleanerButton = this.scene.add.image(590, 200, 'DisabledButton');
        DisabledCleanerButton.setScale(0.3);
        DisabledCleanerButton.setScrollFactor(0);
        this.playerBaseGroup.add(DisabledCleanerButton);

        let cleanerText = this.scene.add.text(490, 120, ['Comprar Limpiadora', this.cleanerPrice]).setAlign('center').setFontSize(20).setColor('black').setFontFamily('raleway').setFontStyle('bold');
        cleanerText.setScrollFactor(0);
        this.playerBaseGroup.add(cleanerText);

        this.buyCleanerButton = this.scene.add.image(590, 200, 'EnabledButton');
        this.buyCleanerButton.setScale(0.3);
        this.buyCleanerButton.setScrollFactor(0);
        this.buyCleanerButton.setInteractive();
        this.buyCleanerButton.on('pointerdown', ()=> {this.buyCleaner(cleanerText, DisabledCleanerButton, this.buyCleanerButton)})
        this.playerBaseGroup.add(this.buyCleanerButton);
    }

    createPolisher(){
        //Polisher button

        this.polishButton = this.scene.add.image(590, 330, 'ApplyButton');
        this.polishButton.setScale(0.3);
        this.polishButton.setScrollFactor(0);
        this.polishButton.setInteractive();
        this.polishButton.on('pointerdown', ()=> {
            if(this.polisherBought){
                this.scene.powerUpSound.play();
                this.scene.player.inventory.polishTinkies(); 
                this.scene.car.inventory.polishTinkies(); this.scene.displayNotification("Tinkys pulidos",'#03ff52');
            }
        })
        this.playerBaseGroup.add(this.polishButton);

        let DisabledPolisherButton = this.scene.add.image(590, 330, 'DisabledButton');
        DisabledPolisherButton.setScale(0.3);
        DisabledPolisherButton.setScrollFactor(0);
        this.playerBaseGroup.add(DisabledPolisherButton);

        let polisherText = this.scene.add.text(505, 250, ['Comprar Pulidora', this.polisherPrice]).setAlign('center').setFontSize(20).setColor('black').setFontFamily('raleway').setFontStyle('bold');
        polisherText.setScrollFactor(0);
        this.playerBaseGroup.add(polisherText);

        this.buyPolisherButton = this.scene.add.image(590, 330, 'EnabledButton');
        this.buyPolisherButton.setScale(0.3);
        this.buyPolisherButton.setScrollFactor(0);
        this.buyPolisherButton.setInteractive();
        this.buyPolisherButton.on('pointerdown', ()=> {this.buyPolisher(polisherText, DisabledPolisherButton, this.buyPolisherButton)})
        this.playerBaseGroup.add(this.buyPolisherButton);
    }

    createHormonator(){
        //Hormonator button

        this.HormonateButton = this.scene.add.image(590, 450, 'ApplyButton');
        this.HormonateButton.setScale(0.3);
        this.HormonateButton.setScrollFactor(0);
        this.HormonateButton.setInteractive();
        this.HormonateButton.on('pointerdown', ()=> {
            if(this.hormonatorBought){
                this.scene.powerUpSound.play();
                this.scene.player.inventory.hormonateTinkies(); 
                this.scene.car.inventory.hormonateTinkies(); this.scene.displayNotification("Tinkys hormonados",'#03ff52');
            }
        })
        this.playerBaseGroup.add(this.HormonateButton);

        let DisabledHormonatorButton = this.scene.add.image(590, 450, 'DisabledButton');
        DisabledHormonatorButton.setScale(0.3);
        DisabledHormonatorButton.setScrollFactor(0);
        this.playerBaseGroup.add(DisabledHormonatorButton);

        let hormonatorText = this.scene.add.text(485, 370, ['Comprar Hormonadora', this.hormonatorPrice]).setAlign('center').setFontSize(20).setColor('black').setFontFamily('raleway').setFontStyle('bold');
        hormonatorText.setScrollFactor(0);
        this.playerBaseGroup.add(hormonatorText);

        this.buyHormonatorButton = this.scene.add.image(590, 450, 'EnabledButton');
        this.buyHormonatorButton.setScale(0.3);
        this.buyHormonatorButton.setScrollFactor(0);
        this.buyHormonatorButton.setInteractive();
        this.buyHormonatorButton.on('pointerdown', ()=> {this.buyHormonator(hormonatorText, DisabledHormonatorButton, this.buyHormonatorButton)})
        this.playerBaseGroup.add(this.buyHormonatorButton);
    }

    buyToolUpdate(text, buyToolButton, buyToolButtonDisabled){
        if(this.scene.player.money >= this.toolPrice){
            this.scene.powerUpSound.play();
            this.scene.player.upgradeTool();
            this.scene.player.money -= this.toolPrice;
            let textString = "Herramienta mejorada! nivel: " + this.scene.player.toolTier;
            this.scene.displayNotification(textString,'#03ff52');
            this.scene.updateInventoryText();
            this.toolPrice *= 5;
            if(this.scene.player.toolTier < this.maxtoolTier){
                text.setText(['Actualizar herramienta', this.toolPrice + ' dineros']);
            }
            else{
                text.setText(['Herramienta', 'al máximo']);
                text.setX(text.x + 80); text.setY(text.y + 40);
                text.setColor('red');
                buyToolButton.destroy();
                buyToolButtonDisabled.destroy();
            }
        }
    }

    buyCarUpgrade(text, buyCarButton, buyCarButtonDisabled){
        if(this.scene.player.money >= this.carPrice){
            this.scene.powerUpSound.play();
            this.scene.car.upgrade();
            this.scene.player.money -= this.carPrice;
            let textString = "Coche mejorado! nivel: " + this.scene.car.tier;
            this.scene.displayNotification(textString,'#03ff52');
            this.scene.updateInventoryText();
            this.carPrice*=5;
            if(this.scene.car.tier < this.maxCarTier){
                text.setText(['Actualizar coche', this.carPrice + ' dineros']);
            }
            else{
                text.setText(['Vehículo', 'al máximo']);
                text.setX(text.x + 50); text.setY(text.y + 70);
                text.setColor('red');
                buyCarButton.destroy();
                buyCarButtonDisabled.destroy();
            }
        }
    }

    buyCleaner(text, disabledCleanerButton, buyCleanerButton){
        if(this.scene.player.money >= this.cleanerPrice){
            this.scene.powerUpSound.play();
            this.scene.displayNotification("Limpiadora obtenida!",'#03ff52');
            this.cleanerBought = true;
            this.scene.player.money -= this.cleanerPrice;
            this.scene.updateInventoryText();
            disabledCleanerButton.destroy();
            buyCleanerButton.destroy();
            text.setText(['Limpiar', 'Tinkies']);
            text.setX(text.x + 70);
        }
    }

    buyPolisher(text, disabledPolisherButton, buyPolisherButton){
        if(this.scene.player.money >= this.polisherPrice){
            this.scene.powerUpSound.play();
            this.scene.displayNotification("Pulidora obtenida!",'#03ff52');
            this.polisherBought = true;
            this.scene.player.money -= this.polisherPrice;
            this.scene.updateInventoryText();
            disabledPolisherButton.destroy();
            buyPolisherButton.destroy();
            text.setText(['Pulir', 'Tinkies']);
            text.setX(text.x + 50);
        }
    }

    buyHormonator(text, disabledHormonatorButton, buyHormonatorButton){
        if(this.scene.player.money >= this.hormonatorPrice){
            this.scene.powerUpSound.play();
            this.scene.displayNotification("Hormonadora obtenida!",'#03ff52');
            this.hormonatorBought = true;
            this.scene.player.money -= this.hormonatorPrice;
            this.scene.updateInventoryText();
            disabledHormonatorButton.destroy();
            buyHormonatorButton.destroy();
            text.setText(['Hormonar', 'Tinkies']);
            text.setX(text.x + 60);
        }
    }

    update(){
        if(this.scene.physics.overlap(this.scene.player, this)){
            this.playerBaseGroup.setVisible(true);
            if(this.scene.player.money < this.toolPrice) this.ToolButton.setVisible(false);
            if(this.scene.player.money < this.carPrice) this.vehicleButton.setVisible(false);
            if(this.scene.player.money < this.cleanerPrice) this.buyCleanerButton.setVisible(false);
            if(this.scene.player.money < this.polisherPrice) this.buyPolisherButton.setVisible(false);
            if(this.scene.player.money < this.hormonatorPrice) this.buyHormonatorButton.setVisible(false);
            if(this.scene.player.money < this.planetPrice) this.PlanetButton.setVisible(false);
        } else this.playerBaseGroup.setVisible(false);
    }
}