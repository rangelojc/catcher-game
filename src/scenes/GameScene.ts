import { config as gameconfig } from "../config";

import { Star, Bomb, Heart, Pit } from "../objects/_prefabs";
import { Player } from "../objects/player";
import { HUD } from "../objects/hud";

import { State } from "../states/GameState"

export class GameScene extends Phaser.Scene {
    private stars: Phaser.GameObjects.Group;
    private bombs: Phaser.GameObjects.Group;
    private hearts: Phaser.GameObjects.Group;
    private pit: Pit;
    private player: Player

    private hud: HUD;

    private isSpawning: any = {
        star: false,
        bomb: false,
        heart: false
    };

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
        this.hearts = this.physics.add.group({ runChildUpdate: true });

        this.state.init();
    }

    create() {
        this.createBackground();
        this.createPit();
        this.createPlayer();

        this.physics.add.overlap(this.stars, this.pit, this.destroyFallenObject, null, this);
        this.physics.add.overlap(this.stars, this.player, this.starCollect, null, this);

        this.physics.add.overlap(this.bombs, this.pit, this.destroyFallenObject, null, this);
        this.physics.add.overlap(this.bombs, this.player, this.bombCollect, null, this);

        this.physics.add.overlap(this.hearts, this.pit, this.destroyFallenObject, null, this);
        this.physics.add.overlap(this.hearts, this.player, this.heartCollect, null, this);

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
            dropSpeed: this.state.get('level').dropSpeed
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
            dropSpeed: this.state.get('level').dropSpeed
        };

        const bomb = new Bomb(vars, config);
        this.bombs.add(bomb);
        bomb.setPhysics();
    }

    createHeart() {
        const x = Phaser.Math.Between(20, gameconfig.width as number - 20);

        const vars = {
            scene: this,
            x: x,
            y: 0,
            asset: "heart"
        };

        const config = {
            dropSpeed: this.state.get('level').dropSpeed
        };

        const heart = new Heart(vars, config);
        this.hearts.add(heart);
        heart.setPhysics();
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
        Object.keys(this.isSpawning).forEach(key => {
            if (this.isSpawning[key] == false) {
                this.isSpawning[key] = true;

                setTimeout(() => {
                    this.spawnObject(key);
                    this.isSpawning[key] = false;
                }, this.state.get('level').spawnRate);
            }
        });
    }

    spawnObject(type) {
        const chance = Phaser.Math.Between(1, 100);
        const level = this.state.get('level');

        if (type == "star") {
            this.createStars();
        }
        else if (type == "bomb") {
            if (chance > (100 - level.bombSpawnChance))
                this.createBombs();
        }
        else if (type == "heart") {
            if (chance > (100 - level.lifeSpawnChance))
                this.createHeart();
        }
    }

    setLevel() {
        const score = this.state.get('score');
        const levelTiers = this.state.levelTiers;

        const currentLevel = levelTiers.find((item, idx) => {
            if (levelTiers[idx + 1]) {
                return score >= item.scoreNeeded && score < levelTiers[idx + 1].scoreNeeded;
            }
            else return score >= item.scoreNeeded
        });

        if (this.state.get('level').level == currentLevel.level) return;

        this.state.set('level', currentLevel);
        this.hud.setText('level', currentLevel.level);
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
    modifyLife(n: number) {
        const life = this.state.get('life') + n;
        this.state.set('life', life);
        this.hud.setText('life', life);

        if (life == 0) {
            this.state.set('gameOver', true);
        }
    }

    destroyFallenObject(pit, obj) {
        obj.destroy();
    }

    starCollect(pit, star) {
        star.destroy();

        const score = this.state.get('score') + 1;
        this.state.set('score', score);
        this.hud.setText('score', score);

        this.setLevel();
    }

    bombCollect(player, bomb) {
        if (this.player.stats.immune === false) {
            bomb.destroy();
            this.modifyLife(-1);

            this.player.stats.immune = true;
            player.setTint("0xff0000");
            setTimeout(() => {
                this.player.stats.immune = false;
                player.clearTint()
            }, 500);
        }
    }

    heartCollect(player, heart) {
        heart.destroy();
        this.modifyLife(1);

        player.setTint("0xff80b0");
        setTimeout(() => {
            player.clearTint()
        }, 1000);
    }
}