import { config as gameconfig } from "../config"

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    preload() {
        this.load.pack("preload", "./src/assets/pack.json", "preload");
    }

    create() {
        const w: number = gameconfig.width as number;
        const h: number = gameconfig.height as number;
        this.add.image(w / 2, h / 2, 'sky').setScale(2.1);
        this.add.image(w / 2, h / 2, 'player');

        this.createText();
        this.setKey();
    }

    createText() {
        const w: number = gameconfig.width as number;
        const h: number = gameconfig.height as number;
        this.add.text(w / 2, 100, "You lost all your lives!",
            { fontSize: "30px", color: "#111" }
        ).setOrigin(0.5);

        this.add.text(w / 2, 150, "Score: " + localStorage.LAST_SCORE,
            { fontSize: "30px", color: "#111" }
        ).setOrigin(0.5);

        this.add.text(w / 2, 200, "High Score: " + localStorage.HIGH_SCORE,
            { fontSize: "30px", color: "#111" }
        ).setOrigin(0.5);

        this.add.text(w / 2, h - 100, "Press F to Restart",
            { fontSize: "30px", color: "#111" }
        ).setOrigin(0.5);
    }

    setKey() {
        this.input.keyboard.on('keydown-F', function () {
            location.reload();
        }, this);
    }
}