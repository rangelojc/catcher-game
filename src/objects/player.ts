export class Player extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body;

    constructor(params) {
        super(params.scene, params.x, params.y, params.asset);
        this.init();
    }

    init() {
        this.scene.physics.world.enable(this);
    }

    setPhysics() {
        this.body.setCollideWorldBounds(true);
    }

    setAnimation(scene) {
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        scene.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 20,
            repeat: -1
        });
    }

    move() {

    }
}