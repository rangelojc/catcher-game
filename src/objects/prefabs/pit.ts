

export class Pit extends Phaser.GameObjects.Rectangle {
    body!: Phaser.Physics.Arcade.Body;

    constructor(params) {
        super(params.scene,
            params.x,
            params.y,
            params.width,
            10,
            0xfff);

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.allowGravity = false;
    }
}
