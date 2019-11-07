export class Star extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body;

    private props: any = {
        type: "regular",
        dropSpeed: 0,
    };

    constructor(params, props = {}) {
        super(params.scene, params.x, params.y, params.asset);
        this.init(params, props);
    }

    init(params, props) {
        this.props.dropSpeed = props.dropSpeed || this.props.dropSpeed;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
    }

    setPhysics() {
        const dropSpeed = Phaser.Math.Between(this.props.dropSpeed * 0.75, this.props.dropSpeed);
        this.body.setVelocityY(dropSpeed);
        this.body.allowGravity = false;
    }
}