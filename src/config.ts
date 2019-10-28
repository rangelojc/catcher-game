import "phaser";

// main game configuration
export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: "game",
    width: 600,
    height: 850,
    scene: [],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 100 }
        }
    }
};