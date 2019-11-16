export default class SellStation extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'SellStation');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setImmovable();
    }
    create(){
        this.sellButton = this.scene.add.text(75, 200, 'VENDE', { fontSize: 200 });
        this.scene.add.existing(this.sellButton);
        this.sellButton.setInteractive();
        this.sellButton.setScrollFactor(0);
        this.sellButton.setFontSize(200);

        this.sellButton.on('pointerdown', ()=> {
                this.player.sellTinkies(this.player.inventory);
                console.log("vendido");
        })
    }
    show(option){
        if(option) this.sellButton.setVisible(true);
        else this.sellButton.setVisible(false);
    }
}