export class GameScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;
    plataformas = [];

    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.image("paisagem", "./assets/paisagem.png");
        this.load.image("plataforma", "./assets/plataforma.png");
        this.load.spritesheet("grace_sprite", "./assets/spritesheetGrace.png", { frameWidth: 64, frameHeight: 64 })
        this.load.image("bug", "./assets/bug.png");
        this.load.audio("musicaFundo", "./assets/musica.mp3");
    }

    create() {

        this.pontuacao = 0;

        this.musica = this.sound.add("musicaFundo");
        this.musica.play({
            loop: true,  
            volume: 0.05 
        });

        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "paisagem").setScale(0.6);

        this.player = this.physics.add.sprite(this.larguraJogo/2, 100, 'grace_sprite').setScale(1.3);
        this.player.setCollideWorldBounds(true);

        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        this.plataformas[0].body.setSize(148, 44, true);
        this.plataformas[0].setScale(0.3);

        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(0.3);

        for (let i = 0; i < this.plataformas.length; i++){
            this.physics.add.collider(this.player, this.plataformas[i]);
        }
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.placar = this.add.text(50, 50, 'Pontuacao:' + this.pontuacao, {fontSize:'45px', fill:'#495613'});

        this.bug = this.physics.add.sprite(this.larguraJogo/3, 0, 'bug');
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

        });

        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('grace_sprite', { start: 5, end: 8 }),
            frameRate: 10,
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
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
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

        if (this.cursors.up.isDown) { 
            this.player.setVelocityY(-400);
        }

        if (this.cursors.down.isDown) {
            this.player.setVelocityY(400);
        }

        if (this.pontuacao >= 5){
            this.scene.stop('MainScene');
            this.scene.start('EndScene', "ganhou");
        }
    }
}
