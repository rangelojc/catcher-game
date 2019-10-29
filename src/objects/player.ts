export class Player extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body;

    private moveSpeed: number = 1000;

    constructor(params) {
        super(params.scene, params.x, params.y, params.asset);
        this.init();
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.allowGravity = false;

        this.setScale(0.5);

        this.setPhysics();
        this.setControl();
    }

    setPhysics() {
        this.body.setCollideWorldBounds(true);
    }

    setControl() {
        this.scene.input.keyboard.on('keydown-A', () => this.setMovement("left-down"), this.scene);
        this.scene.input.keyboard.on('keyup-A', () => this.setMovement("left-up"), this.scene);
        this.scene.input.keyboard.on('keydown-D', () => this.setMovement("right-down"), this.scene);
        this.scene.input.keyboard.on('keyup-D', () => this.setMovement("right-up"), this.scene);
    }

    setMovement(type) {
        switch (type) {
            case "left-down":
                this.body.setVelocityX(-this.moveSpeed);
                break;
            case "right-down":
                this.body.setVelocityX(this.moveSpeed);
                break;
            default:
                this.body.setVelocityX(0);
        }
    }
}