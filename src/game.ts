import "phaser";
import { GameScene } from "./scenes/GameScene";
import { MenuScene } from "./scenes/MenuScene";
import { GameOverScene } from "./scenes/GameOverScene";

import { config } from "./config"

// game class
class PhaserGame extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        config.scene = [
            MenuScene,
            GameScene,
            GameOverScene
        ];

        super(config);
    }
}

var Game: Phaser.Game = null;

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    Game = new PhaserGame(config);
});
