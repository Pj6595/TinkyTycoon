export default class ControllableSprite extends Phaser.GameObjects.Text{
	constructor(scene,x,y,text,color){
		super(scene,x,y,text);
		this.scene.add.existing(this);
		this.setScrollFactor(0);
		this.setAlign('center');
		this.setFontSize(40);
		this.setColor(color);
		this.x = this.scene.cameras.main.width/2-this.width/2;
		this.setStyle({stroke:'#000',strokeThickness:'2'});
		
		this.notificationTween = this.scene.tweens.add({
                targets: this,
                y: { from: y, to: this.scene.cameras.main.height/2},
                alpha: { from: 1.0, to: 0.0},
                ease: 'linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 2000,
                repeat: 0,            // -1: infinity
                paused: false,
                yoyo: false
            });
	}

	preUpdate(t,dt){
	}
}