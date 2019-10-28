export class Star extends Phaser.Physics.Arcade.Sprite {
    private dropSpeed: number = 200;

    constructor(params, config = {}) {
        super(params.scene, params.x, params.y, params.asset);
        this.init(config);
        this.scene.add.existing(this);
    }

    init(config) {
        this.dropSpeed = config.dropSpeed || this.dropSpeed;

        this.initPhysics();
    }

    initPhysics() {
        this.scene.physics.world.enable(this);
        this.setVelocity(0, this.dropSpeed);
        //this.allowGravity = false;
    }
}

export class Life extends Phaser.GameObjects.Image {

}

export class Bomb extends Phaser.GameObjects.Image {
    constructor(params, config = {}) {
        super(params.scene, params.x, params.y, params.asset);
        //this.init(config);
    }
}