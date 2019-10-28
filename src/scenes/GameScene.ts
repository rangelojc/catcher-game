import { config as gameconfig } from "../config"
import { Star, Bomb, Pit } from "../objects/prefabs";

import { State } from "../states/GameState"

export class GameScene extends Phaser.Scene {
    private stars: Phaser.GameObjects.Group;
    private bombs: Phaser.GameObjects.Group;
    private pit: Pit;

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
        this.createPit();
        this.createStars(5);

        this.setColliders();
    }

    update() {
        if (this.state.gameOver) {
            this.physics.pause();
            return;
        }
    }

    //create methods
    createBackground() {
        const w: number = gameconfig.width as number;
        const h: number = gameconfig.height as number;
        this.add.image(w / 2, h / 2, 'sky').setScale(2.1);
    }

    createPit() {
        this.pit = new Pit({
            x: gameconfig.width as number / 2,
            y: gameconfig.height as number - 0,
            width: gameconfig.width,
            scene: this
        });
    }

    createStars(n: number = 20, dropSpeed?) {
        for (let i = 0; i < n; i++) {
            const vars = {
                scene: this,
                x: Phaser.Math.Between(10, gameconfig.width as number - 10),
                y: 0,
                asset: "star"
            };

            const config = {
                dropSpeed
            };

            const star = new Star(vars, config);
            this.stars.add(star);
            star.setPhysics();
        }
    }

    createBombs(n: number = 1) {
        for (let i = 0; i < n; i++) {
            this.stars.add(
                new Bomb({
                    scene: this,
                    x: Phaser.Math.Between(0, 590),
                    y: -20,
                    asset: "bomb"
                })
            );
        }
    }

    //set methods
    setColliders() {
        this.physics.add.overlap(this.stars, this.pit, this.starFall, null, this);
    }

    //interaction methods
    starFall(pit, star) {
        star.destroy();

        console.log("star to pit collision detected!");
    }
}