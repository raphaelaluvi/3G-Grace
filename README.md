# 3G - Grace Hopper and Game Lab for Girls 2026

# Aula 1

> **📝 Nota:** Nesta aula você trabalhará com o arquivo `scenes/game_aula1.js`. No `main.js`, altere o import para:
> ```javascript
> import { GameScene } from "./scenes/game_aula1.js";
> ```

## O que é Phaser?

Phaser é uma biblioteca JavaScript para criar jogos 2D que rodam no navegador. Com ela, você pode:
- Criar jogos com física realista
- Adicionar animações e sons
- Detectar colisões entre objetos
- E muito mais!

## Criando a Base do Jogo

- Criar uma pasta e os arquivos necessários.
    - Instalar a extensão Live Server;
    - Criar pasta assets;
    - Criar pasta scenes;
    - Criar arquivo index.html;
    - Criar arquivo main.js;
    - Criar arquivo game_aula1.js na pasta scenes;

- Linkar o Phaser no HTML.
    - Adicionar a versão minificada do phaser:
    ```html
    <!-- Arquivo: index.html -->
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script> 
    ```

- Criar configurações do Phaser
    ```javascript
    // Arquivo: main.js
    import { GameScene } from "./scenes/game_aula1.js";

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
    ```
- Criar a estrutura de uma cena.
    ```javascript
    // Arquivo: scenes/game_aula1.js
    export class GameScene extends Phaser.Scene {

        constructor() {

        }
        preload() {

        }
        create() {

        }
        update() {

        }
    }
    ```
    
## Adicionando elementos visuais:
- Criar um cenário.
     ```javascript
     // Arquivo: scenes/game_aula1.js
     export class GameScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.image("paisagem", "../assets/paisagem.png");
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "paisagem").setScale(0.6);
    }
     ```
- Inserir um personagem.
    ```javascript
    // Arquivo: scenes/game_aula1.js
    
    preload() {
        this.load.spritesheet("grace_sprite", "../assets/spritesheetGrace.png", { frameWidth: 64, frameHeight: 64 })
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "paisagem").setScale(0.6);

        this.player = this.physics.add.sprite(this.larguraJogo/2, 100, 'grace_sprite').setScale(1.3);
        this.player.setCollideWorldBounds(true);
    }
    ```
- Criar plataformas.
    ```javascript
    // Arquivo: scenes/game_aula1.js
    preload() {
        this.load.image("plataforma", "../assets/plataforma.png");
    }

    create() {
        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        this.plataformas[0].body.setSize(148, 44, true);
        this.plataformas[0].setScale(0.3);

        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(0.3);
    }
    ```
## Introdução à física no Phaser:
- Aplicação de gravidade no config
    ```javascript
    // Arquivo: main.js
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 400 },
            debug: true
        }
    }
    ```
- Configuração de colisões entre personagem e plataformas.
    ```javascript
    // Arquivo: scenes/game_aula1.js
    create() {
        for (let i = 0; i < this.plataformas.length; i++){
            this.physics.add.collider(this.player, this.plataformas[i]);
        }
    }
    ```

## Implementação de Movimentação e Controles

- Capturar entrada do usuário.
    ```javascript
    // Arquivo: scenes/game_aula1.js
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    ```
- Aplicar movimentação ao personagem.
    ```javascript
    // Arquivo: scenes/game_aula1.js
    update() {
        // Frente e trás (horizontal)

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        // Pulo (vertical) 

        if (this.cursors.up.isDown)
            this.player.setVelocityY(-400);
        }
        if (this.cursors.down.isDown) {
            this.player.setVelocityY(400);
        }
    }
    ```
- Ajustando animações ao movimento.
    ```javascript
    // Arquivo: scenes/game_aula1.js
    create() {
        // Animações da personagem
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
    ```

    ```javascript
    // Arquivo: scenes/game_aula1.js
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
    }
    ```

## Criando Estrutura de Cenas

- Introdução ao conceito de **Scenes** no Phaser.
- Criar uma cena de tela inicial e uma cena de fase jogável.
    - Criar o arquivo welcome.js na pasta scenes
    ```javascript
    // Arquivo: scenes/welcome.js
    export class WelcomeScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("WelcomeScene");
    }

    preload() {
        this.load.image("paisagem", "../assets/paisagem.png");
        this.load.image("computador", "../assets/computador_paisagem.png");
        this.load.image("grace", "../assets/grace.png");
        this.load.image("descricao", "../assets/decricao.png");
        this.load.image("titulo", "../assets/grace_quest.png");
        this.load.image("play", "../assets/botao_play.png");
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
    }

    update() {

    }
    }
    ```
- Adicionar a lógica de transição entre cenas.
    - Adicionar ao fim do create() na WelcomeScene
    ```javascript
    // Arquivo: scenes/welcome.js
    this.botaoJogar.on("pointerdown", () => {
            this.scene.start("MainScene")
        })
    ```
    - Adicionar a cena no main.js
    ```javascript
    // Arquivo: main.js
    import { WelcomeScene } from "./scenes/welcome.js";

    scene: [WelcomeScene, GameScene]
    ```

# Aula 2

> **📝 Nota:** A partir desta aula, você utilizará o arquivo completo `scenes/game_final.js`. No `main.js`, altere o import para:
> ```javascript
> import { GameScene } from "./scenes/game_final.js";
> ```
> Este arquivo já contém todo o código da Aula 1, e você adicionará as novas funcionalidades.

## Criando um Sistema de Pontuação

- Criar e exibir um placar na tela.
    ```javascript
    // Arquivo: scenes/game_final.js
    create() {
        this.placar = this.add.text(50, 50, 'Pontuacao:' + this.pontuacao, {fontSize:'45px', fill:'#495613'});
    }
    ```
- Implementar itens para coleta.
    ```javascript
    // Arquivo: scenes/game_final.js
    preload() {
        this.load.image("bug", "../assets/bug.png");
    }
    create() {
        this.bug = this.physics.add.sprite(this.larguraJogo/3, 0, 'bug');
        this.bug.setCollideWorldBounds(true);
        this.bug.setScale(0.3);
        this.physics.add.collider(this.bug, this.plataformas[0]); 
        this.physics.add.collider(this.bug, this.plataformas[1]);
    }
    ```
- Atualizar a pontuação sempre que um item for coletado.
    ```javascript
    // Arquivo: scenes/game_final.js
    create() {
        this.physics.add.overlap(this.player, this.bug, () => { 

            this.bug.setVisible(false);

            var posicaoBug_Y = Phaser.Math.RND.between(50, 650);

            this.bug.setPosition(posicaoBug_Y, 100); 

            this.pontuacao += 1;
            this.placar.setText('Pontuacao: ' + this.pontuacao);

            this.bug.setVisible(true);

        })
    }
    ```

## Animações e Efeitos Visuais

- Adicionando efeitos sonoros.
    ```javascript
    // Arquivo: scenes/game_final.js
    preload() {
        this.load.audio("musicaFundo", "../assets/musica.mp3");
    }
    ```
    ```javascript
    // Arquivo: scenes/game_final.js
    create() {
                this.musica = this.sound.add("musicaFundo");
        this.musica.play({
            loop: true,  
            volume: 0.05 
        });
    }
    ```

## Refinando a Estrutura e Testando o Jogo

- Adicionar tela de fim de jogo
    ```javascript
    // Arquivo: scenes/end.js
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
        this.load.image("paisagem", "../assets/paisagem.png");
        this.load.image("computador", "../assets/computador_paisagem.png");
        this.load.image("grace", "../assets/grace.png");
        this.load.image("perdeu", "../assets/perdeu.png");
        this.load.image("ganhou", "../assets/ganhou.png");
        this.load.image("menu", "../assets/botao_menu.png");
        this.load.image("restart", "../assets/botao_restart.png");
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

    }}
    ```
- Criar condições de vitória ou fim de jogo.
    ```javascript
    // Arquivo: scenes/game_final.js
    update() {
        if (this.pontuacao >= 5){
            this.scene.stop('MainScene');
            this.scene.start('EndScene', "ganhou");
        }
    }
    ```

## Publicação e Compartilhamento

- Como organizar os arquivos do projeto.
- Criando um repositório no GitHub e subindo os arquivos.
- Publicação do jogo no GitHub Pages.
- Compartilhamento dos links entre as participantes.

