export class EndScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("EndScene");
    }

    init(data) {
        this.resultado = data.resultado;
    }

    preload() {
        this.load.image("paisagem", "./assets/paisagem.png");
        this.load.image("computador", "./assets/computador_paisagem.png");
        this.load.image("grace", "./assets/grace.png");
        this.load.image("perdeu", "./assets/perdeu.png");
        this.load.image("ganhou", "./assets/ganhou.png");
        this.load.image("menu", "./assets/botao_menu.png");
        this.load.image("restart", "./assets/botao_restart.png");
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "computador");
        this.add.image(this.larguraJogo/2, 205, "grace").setScale(0.15);
        this.botaoMenu = this.add.image(this.larguraJogo/2 - 100, 320, "menu").setScale(0.2).setInteractive();
        this.botaoRestart = this.add.image(this.larguraJogo/2 + 100, 320, "restart").setScale(0.2).setInteractive();

        this.botaoMenu.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoMenu.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoMenu.on("pointerdown", () => {
            this.scene.start("WelcomeScene")
        })

        this.botaoRestart.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoRestart.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoRestart.on("pointerdown", () => {
            this.scene.stop("EndScene");
            this.scene.start("MainScene");
        })

        if (this.resultado === "ganhou"){
            this.add.image(this.larguraJogo/2, 130, "ganhou").setScale(0.25);
        }
        if (this.resultado === "perdeu"){
            this.add.image(this.larguraJogo/2, 130, "perdeu").setScale(0.25);
        }
    }

    update() {

    }
}