export default class Loading extends Phaser.Scene{
	constructor(){
		super({key:'Loading'})
	}
	create(){
		const loadingText = this.add.text(100, 100, 'cargando...', {fill:'#0f0'});

        this.scene.remove('Planet');
        this.scene.start('Planet');
	}
}