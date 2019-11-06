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

    private isSpawning: boolean = false;

    private state: State = new State();

    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.pack("preload", "./src/assets/pack.json", "preload");
    }

    init() {
        this.stars = this.physics.add.group({ runChildUpdate: true });
        this.bombs = this.physics.add.group({ runChildUpdate: true });

        this.state.init();
    }

    create() {
        this.createBackground();
        this.createPit();
        this.createPlayer();

        this.physics.add.overlap(this.stars, this.pit, this.starFall, null, this);
        this.physics.add.overlap(this.stars, this.player, this.starCollect, null, this);

        this.physics.add.overlap(this.bombs, this.pit, this.bombFall, null, this);
        this.physics.add.overlap(this.bombs, this.player, this.bombCollect, null, this);

        this.setHUD();
        this.setLevel();
        this.setHighScore();
    }

    update() {
        if (this.state.gameOver) {
            this.physics.pause();
            this.setHighScore();
            this.scene.start("GameOverScene");
            return;
        }

        this.startSpawn();
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
        const x = Phaser.Math.Between(20, gameconfig.width as number - 20);

        const vars = {
            scene: this,
            x: x,
            y: 0,
            asset: "star"
        };

        const config = {
            dropSpeed: this.state.get('dropSpeed')
        };

        const star = new Star(vars, config);
        this.stars.add(star);
        star.setPhysics();
    }

    createBombs() {
        const x = Phaser.Math.Between(20, gameconfig.width as number - 20);

        const vars = {
            scene: this,
            x: x,
            y: 0,
            asset: "bomb"
        };

        const config = {
            dropSpeed: this.state.get('dropSpeed')
        };

        const bomb = new Bomb(vars, config);
        this.bombs.add(bomb);
        bomb.setPhysics();
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
    startSpawn() {
        if (this.isSpawning == false) {
            this.isSpawning = true;

            setTimeout(() => {
                this.spawnObject();
                this.isSpawning = false;
            }, this.state.get('spawnRate'));
        }
    }

    spawnObject() {
        const randomizer = Phaser.Math.Between(1, 100);
        if (randomizer > 75) this.createBombs();
        else this.createStars();
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
        const spawnRate = this.state.get('originalSpawnRate');
        const dropSpeed = this.state.get('originalDropSpeed');

        const newSpawnRate = spawnRate - ((level - 1) * this.state.get('spawnRateChg'));
        const newDropSpeed = dropSpeed + ((level - 1) * this.state.get('dropRateChg'));
        this.state.set('spawnRate', newSpawnRate);
        this.state.set('dropSpeed', newDropSpeed);

        this.hud.setText('level', level);
    }

    setHighScore() {
        const score = this.state.get('score');
        const highscore = localStorage.HIGH_SCORE;
        let newhighscore = score;

        if (highscore) newhighscore = score > highscore ? score : highscore;

        localStorage.LAST_SCORE = score;
        localStorage.HIGH_SCORE = newhighscore;
        this.state.set('highscore', newhighscore);
        this.hud.setText('highscore', newhighscore);
    }

    //interaction methods
    reduceLife(n: number) {
        const life = this.state.get('life') - n;
        this.state.set('life', life);
        this.hud.setText('life', life);

        if (life == 0) {
            this.state.set('gameOver', true);
        }
    }

    starFall(pit, star) {
        star.destroy();
    }

    starCollect(pit, star) {
        star.destroy();

        const score = this.state.get('score') + 1;
        this.state.set('score', score);
        this.hud.setText('score', score);

        this.setLevel();
    }

    bombFall(pit, bomb) {
        bomb.destroy();
    }

    bombCollect(player, bomb) {
        bomb.destroy();
        this.reduceLife(1);

        player.setTint("0xff0000");
        setTimeout(() => player.clearTint(), 1000);
    }
}