export class WelcomeScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("WelcomeScene");
    }

    preload() {
        this.load.image("paisagem", "./assets/paisagem.png");
        this.load.image("computador", "./assets/computador_paisagem.png");
        this.load.image("grace", "./assets/grace.png");
        this.load.image("descricao", "./assets/decricao.png");
        this.load.image("titulo", "./assets/grace_quest.png");
        this.load.image("play", "./assets/botao_play.png");
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "computador");
        this.add.image(this.larguraJogo/2, 130, "titulo").setScale(0.25);
        this.add.image(this.larguraJogo/2, 205, "grace").setScale(0.15);
        this.add.image(this.larguraJogo/2, 350, "descricao").setScale(0.4);
        this.botaoJogar = this.add.image(this.larguraJogo/2, 290, "play").setScale(0.2).setInteractive();

        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("MainScene")
        })
    }

    update() {

    }
}