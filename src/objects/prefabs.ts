export class Star extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body;

    private props: any = {
        type: "regular",
        dropSpeed: 0,

        regular: {

        }
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
        const dropSpeed = Phaser.Math.Between(this.props.dropSpeed * 0.9, this.props.dropSpeed);
        this.body.setVelocityY(dropSpeed);
        this.body.allowGravity = false;
    }
}

export class Life extends Phaser.GameObjects.Image {
    body!: Phaser.Physics.Arcade.Body;
}

export class Bomb extends Phaser.GameObjects.Image {
    body!: Phaser.Physics.Arcade.Body;

    constructor(params, config = {}) {
        super(params.scene, params.x, params.y, params.asset);
        //this.init(config);
    }
}

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