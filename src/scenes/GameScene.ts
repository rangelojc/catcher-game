import { config as gameconfig } from "../config"
import { Star, Bomb, Pit } from "../objects/prefabs";
import { Player } from "../objects/player";
import { HUD } from "../objects/hud";

import { State } from "../states/GameState"

export class GameScene extends Phaser.Scene {
    private stars: Phaser.GameObjects.Group;
    private bombs: Phaser.GameObjects.Group;
    private pit: Pit;
    private player: Player

    private hud: HUD;

    private isCreatingStar: boolean = false;

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
        this.createPlayer();

        this.physics.add.overlap(this.stars, this.pit, this.starFall, null, this);
        this.physics.add.overlap(this.stars, this.player, this.starCollect, null, this);

        this.setHUD();
        this.setLevel();
    }

    update() {
        if (this.state.gameOver) {
            this.physics.pause();
            return;
        }

        this.spawnStars();
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
            y: gameconfig.height as number + 10,
            width: gameconfig.width,
            scene: this
        });
    }

    createStars() {
        const w = gameconfig.width as number - 20;
        const lastStarX = this.stars.getLast(true) ?
            this.stars.getLast(true).x : Phaser.Math.Between(20, w);

        let x1 = Phaser.Math.Between(lastStarX, w + 100);
        let x2 = Phaser.Math.Between(20 - 100, lastStarX);
        let x = (x1 + x2) / 2;
        x = x < 20 ? 20 : x;
        x = x > w - 20 ? w : x;

        const vars = {
            scene: this,
            x: x,
            y: 0,
            asset: "star"
        };

        const config = {
            dropSpeed: this.state.get('starDropSpeed')
        };

        const star = new Star(vars, config);
        this.stars.add(star);
        star.setPhysics();
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

    createPlayer() {
        this.player = new Player({
            scene: this,
            x: gameconfig.width as number / 2,
            y: gameconfig.height as number - 50,
            asset: "player"
        });
    }

    setHUD() {
        this.hud = new HUD({ scene: this });
        this.hud.setText('life', this.state.get('life'));
        this.hud.setText('highscore', this.state.get('highscore'));
        this.hud.setText('score', this.state.get('score'));
        this.hud.setText('level', this.state.get('level'));
    }

    //behavior methods
    spawnStars() {
        if (this.isCreatingStar == false) {
            this.isCreatingStar = true;

            setTimeout(() => {
                this.createStars();
                this.isCreatingStar = false;
            }, this.state.get('starSpawnRate'));
        }
    }

    setLevel() {
        const score = this.state.get('score');
        const scoreTier = this.state.get('scoreTier');
        const currentLevel = scoreTier.findIndex((item, idx) => {
            if (scoreTier[idx + 1]) return score >= item && score < scoreTier[idx + 1];
            else return score >= item
        }) + 1;

        if (this.state.get('level') == currentLevel) return;

        this.state.set('level', currentLevel);

        const level = this.state.get('level');
        const spawnRate = this.state.get('originalStarSpawnRate');
        const dropSpeed = this.state.get('originalStarDropSpeed');

        const newSpawnRate = spawnRate - ((level - 1) * 77);
        const newDropSpeed = dropSpeed + ((level - 1) * 40);
        this.state.set('starSpawnRate', newSpawnRate);
        this.state.set('starDropSpeed', newDropSpeed);

        this.hud.setText('level', level);

        console.log(newSpawnRate, newDropSpeed);
    }

    //interaction methodsd
    starFall(pit, star) {
        star.destroy();

        const life = this.state.get('life') - 1;
        this.state.set('life', life);
        this.hud.setText('life', life);

        if (life == 0) {
            this.state.set('gameOver', true);
        }
    }

    starCollect(pit, star) {
        star.destroy();

        const score = this.state.get('score') + 1;
        this.state.set('score', score);
        this.hud.setText('score', score);

        this.setLevel();
    }
}