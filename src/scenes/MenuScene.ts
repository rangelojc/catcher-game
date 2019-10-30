import { config as gameconfig } from "../config"

export class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
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
        this.add.text(w / 2, 100, "Catcher Game",
            { fontSize: "50px", color: "#111" }
        ).setOrigin(0.5);

        this.add.text(w / 2, h - 100, "Press F to Start",
            { fontSize: "30px", color: "#111" }
        ).setOrigin(0.5);
    }

    setKey() {
        this.input.keyboard.on('keydown-F', function () {
            this.scene.start("GameScene");
        }, this);
    }
}