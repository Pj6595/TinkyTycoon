export default class MainMenu extends Phaser.Scene{
	constructor(){
		super({key:'MainMenu'})
	}
	create(){
		this.cameras.main.setBackgroundColor('#808080');
		this.music = this.sound.add('mainMenuMusic', {loop:true});

		this.actionKey = this.input.keyboard.addKey('space');
		this.logo = this.add.image(400, 200, 'logo').setScale(0).setVisible(false);

		this.music.play();

		this.logoAppearTween = this.tweens.add({
			targets: this.logo,
			scaleX: { from: 0, to: 0.4},
			scaleY: {from: 0, to: 0.4},
			ease: 'Quad.easeOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
			duration: 500,
			repeat: 0,            // -1: infinity
			paused: true,
			yoyo: false
		});

		this.logoTween = this.tweens.add({
			targets: this.logo,
			scaleX: { from: 0.4, to: 0.6},
			scaleY: {from: 0.4, to: 0.6},
			ease: 'Quad.easeOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
			duration: 1000,
			repeat: -1,            // -1: infinity
			paused: true,
			yoyo: true
		});

		this.time.delayedCall(2500, ()=>{
			this.logo.setVisible(true);
			this.logoAppearTween.play();
		});

		this.time.delayedCall(3500, ()=>{
			let prompt = this.add.text(170, 350, 'Pulsa espacio para jugar').setFontSize(30);
		})

		this.logoAppearTween.on('complete', ()=>{this.logoTween.play();});
		this.actionKey.on('down', ()=>{
			this.music.stop();
			this.scene.start('Planet');
		});
	}
}