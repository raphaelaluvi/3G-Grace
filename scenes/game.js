// Arquivo: scenes/game.js
export class GameScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;
    plataformas = [];

    constructor() {
        super("MainScene");
    }
    preload() {
        this.load.image("paisagem", "./assets/paisagem.png");
        this.load.spritesheet("grace_sprite", "./assets/spritesheetGrace.png", { frameWidth: 64, frameHeight: 64 });
        this.load.image("plataforma", "./assets/plataforma.png");
        this.load.image("bug", "./assets/bug.png");
    }
    create() {

        this.pontuacao = 0;

        //coordenada horizontal, vertical e dps o 'caminho'
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagem").setScale(0.6);

        this.player = this.physics.add.sprite(this.larguraJogo / 2, 100, 'grace_sprite').setScale(1.3);
        //não vai passar o limite da tela
        this.player.setCollideWorldBounds(true);

        //posicao 1 da lista
        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        //tamanho e dps 'zoom'
        this.plataformas[0].body.setSize(148, 44, true);
        this.plataformas[0].setScale(0.3);

        // posicao 2 
        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(0.3);

        for (let i = 0; i < this.plataformas.length; i++) {
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        //captura qual seta entrou
        this.cursors = this.input.keyboard.createCursorKeys();

        // placar
        this.placar = this.add.text(50, 50, 'Pontuacao:' + this.pontuacao, { fontSize: '45px', fill: '#495613' });

        this.bug = this.physics.add.sprite(this.larguraJogo / 3, 0, 'bug');
        this.bug.setCollideWorldBounds(true);
        this.bug.setScale(0.3);
        this.physics.add.collider(this.bug, this.plataformas[0]);
        this.physics.add.collider(this.bug, this.plataformas[1]);

        this.physics.add.overlap(this.player, this.bug, () => {
            
            this.bug.setVisible(false);

            var posicaoBug_Y = Phaser.Math.RND.between(50, 650);
            this.bug.setPosition(posicaoBug_Y, 100);

            this.pontuacao += 1;
            this.placar.setText('Pontuacao: ' + this.pontuacao);

            this.bug.setVisible(true);
        })


        // animações da personagem

        //cria animacao
        this.anims.create({
            //apelido pra animacao
            key: 'direita',
            //gerar os numeros de acordo com os frames do sprite
            frames: this.anims.generateFrameNumbers('grace_sprite', { start: 5, end: 8 }),
            frameRate: 10,
            //em loop enquanto estiver pressionada
            repeat: -1
        });

        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('grace_sprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'parada',
            frames: [{ key: 'grace_sprite', frame: 4 }],
            frameRate: 20
        });
    }
    update() {
        // Frente e trás (horizontal)

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            // se nao tiver a da img esquerda, puxa a img certa
            if (this.player.anims.currentAnim?.key !== 'esquerda') {
                this.player.anims.play('esquerda', true);
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            if (this.player.anims.currentAnim?.key !== 'direita') {
                this.player.anims.play('direita', true);
            }
        } else {
            this.player.setVelocityX(0);
            if (this.player.anims.currentAnim?.key !== 'parada') {
                this.player.anims.play('parada', true);
            }
        }

        // Pulo (vertical) 
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-400);
        }
        if (this.cursors.down.isDown) {
            this.player.setVelocityY(400);
        }

        // verifica a pontuacao
        if (this.pontuacao >= 5) {
            this.scene.stop('MainScene');
            // comeca a cena endscene e passa o data
            this.scene.start('EndScene', "ganhou");
        }
    }
}