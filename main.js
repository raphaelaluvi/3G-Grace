import { GameScene } from "./scenes/game.js";
import { WelcomeScene } from "./scenes/welcome.js";
import { EndScene } from "./scenes/end.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#c1a0e0",
    pixelArt: true,
    roundPixel: false,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 400 },
            debug: true
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);
