export default class Minigame extends Phaser.Scene{
	constructor(){
		super({key:'Minigame'})
    }
    init(parameters){
    	this.tinkyType = parameters[0]-1; //Offsetting by one due to an unkown engine bug
    	this.planetScene = parameters[1];
    }
    create(){
    	this.background = this.add.image(this.cameras.main.width/2,this.cameras.main.height*3/4,'minigameBackground');
    	this.tinkyImage = this.add.image(this.background.x-this.background.width/2+30,this.background.y,'tinkies',this.tinkyType);
        this.tinkyHitbox = {xMax:this.tinkyImage.x+this.tinkyImage.width/2,xMin:this.tinkyImage.x-this.tinkyImage.width/2};
        this.stage = 1;

        this.speed = 0.3;

        this.spawnKey();

        this.cursors = this.input.keyboard.createCursorKeys();
        /*this.cursors.up.on('down', event=>{this.checkCollision(0);});
        this.cursors.down.on('down', event=>{this.checkCollision(1);});
        this.cursors.left.on('down', event=>{this.checkCollision(2);});
        this.cursors.right.on('down', event=>{this.checkCollision(3);});*/
    }

    spawnKey(){
        let arrowKey = Math.floor(Math.random()*4);
        this.key = this.add.sprite(this.background.x+this.background.width/2-40,this.background.y,'arrows',arrowKey);
        this.key.setScale(2);
        this.key.keyNum = arrowKey;

        this.calculateSpeed();
    }

    update(t,dt){
        this.key.x -= this.speed*dt;
        if(this.key.x+this.key.displayWidth < this.background.x-this.background.width/2)
            this.loseGame("Game Over");
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) this.checkCollision(0);
        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.checkCollision(1);
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.checkCollision(2);
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.checkCollision(3);
    }

    checkCollision(keyNumber){
        let collision = false;
        //AABB collision, actually more like AA because it's in one dimension only lol
        if((this.key.x-this.key.displayWidth/2 < this.tinkyHitbox.xMax && this.key.x+this.key.displayWidth/2 > this.tinkyHitbox.xMin))
            collision = true;
        this.key.destroy();
        if(collision){
            if(this.planetScene.player.inventory.numTinkies < this.planetScene.player.inventory.capacity){
                this.planetScene.player.inventory.addTinky(this.tinkyType);
                this.planetScene.updateInventoryText();
                this.planetScene.displayNotification("Obtained a Tinky!",'#03ff52');
                this.stage+=1;
                //this.time.delayedCall(200, func=>{this.spawnKey();});
                this.spawnKey();
            }else
            this.loseGame("Inventory is full");
        }else{
            this.loseGame("Game Over");
        }
    }

    calculateSpeed(){
        let tierDifference =this.tinkyType - this.planetScene.player.toolTier;
        if(this.stage > 2)
            this.speed *= this.stage/3;
        if(tierDifference > 1)
            this.speed *= tierDifference;
    }

    loseGame(message){
        this.planetScene.displayNotification(message,'#cc0000');
        this.planetScene.closeMinigame();
    }
}