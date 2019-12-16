export default class SellStation extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'sellStation');
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.body.setImmovable();

        this.sellStationGroup = this.scene.add.group();

        let sellStationWindow = this.scene.add.image(400, 300, 'UIWindow');
        sellStationWindow.setScale(0.5);
        sellStationWindow.setScrollFactor(0);
        this.sellStationGroup.add(sellStationWindow);

        this.createSellText();
        this.createSellButton();
    }
    createSellText(){
        this.sellText = this.scene.add.text(175, 160, 'a').setAlign('center').setFontSize(30).setColor('black').setFontFamily('raleway').setFontStyle('bold');
        this.sellText.setScrollFactor(0);
        this.sellStationGroup.add(this.sellText);
    }
    createSellButton(){
        let sellButton = this.scene.add.image(400, 350, 'SellButton');
        sellButton.setScale(0.5);
        sellButton.setScrollFactor(0);
        sellButton.setInteractive();
        sellButton.on('pointerdown', ()=> {
            let value = 0;
            value += this.scene.player.sellTinkies(this.scene.player.inventory);
            value += this.scene.player.sellTinkies(this.scene.car.inventory);
            this.scene.updateInventoryText();
            let text = "Sold for: " + value;
            this.scene.displayNotification(text,'#d9e800');
        });
        this.sellStationGroup.add(sellButton);
    }
    update(){
        if(this.scene.physics.overlap(this.scene.player, this)){
            let totalValue = this.scene.player.inventory.returnTotalValue() + this.scene.car.inventory.returnTotalValue();
            this.sellText.setText(['Valor del inventario (jugador): ' + this.scene.player.inventory.returnTotalValue(), 
            'Valor del inventario (coche): ' + this.scene.car.inventory.returnTotalValue(),
            'TOTAL: ' + totalValue]);

            this.sellStationGroup.setVisible(true);
        } else this.sellStationGroup.setVisible(false);
    }
}