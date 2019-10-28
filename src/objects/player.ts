export class Player extends Phaser.GameObjects.Image {
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);
        this.init();
    }

    init() {
        this.scene.physics.world.enable(this);
    }

    move() {

    }
}