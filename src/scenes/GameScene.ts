import { config as gameconfig } from "../config"
import { Star, Bomb } from "../objects/prefabs";

import { State } from "../states/GameState"

export class GameScene extends Phaser.Scene {
    private stars: Phaser.GameObjects.Group;
    private bombs: Phaser.GameObjects.Group;

    private state: State = new State();

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload() {
        this.load.pack("preload", "./src/assets/pack.json", "preload");
    }

    init() {
        this.stars = this.physics.add.group({ runChildUpdate: true });
        this.bombs = this.physics.add.group({ runChildUpdate: true });
    }

    create() {
        this.createBackground();
        this.createStars(5);
    }

    update() {
        if (this.state.gameOver) {
            return;
        }


    }

    //methods
    createBackground() {
        const w: number = gameconfig.width as number;
        const h: number = gameconfig.height as number;
        this.add.image(w / 2, h / 2, 'sky').setScale(2.1);

        // var star = this.physics.add.group({});
        // var s = star.create(w / 2, 0, 'star');
        // s.setVelocity(0, 200);
        // s.allowGravity = false;
    }

    createStars(n: number = 20) {
        for (let i = 0; i < n; i++) {
            this.stars.add(
                new Star({
                    scene: this,
                    x: Phaser.Math.Between(10, gameconfig.width as number - 10),
                    y: 0,
                    asset: "star"
                })
            );
        }
    }

    createBombs(n: number = 1) {
        for (let i = 0; i < n; i++) {
            this.stars.add(
                new Bomb({
                    scene: this,
                    x: Phaser.Math.Between(0, 590),
                    y: 0,
                    asset: "bomb"
                })
            );
        }
    }
}
