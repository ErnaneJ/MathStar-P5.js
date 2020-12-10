let cvn;
var pf = 0;
var s = 1,
  p = 0;
//variáveis para o MENU
var tela = 0;
var largura = 200;
var altura = 50;
var xMenu = 305;
var yMenu1 = 265;
var yMenu2 = 340;
var yMenu3 = 415;
let info;
let gameover;
var seta;
//Variáveis do game
var x = 350;
var y = 345;
var life = 500;
var pontos = 0;
var score = 0;
var Mscore = 0;
var cont = 0;
var larguraN = 150,
  alturaN = 200,
  xN = 350,
  yN = 120,
  niv = 1;
//informaações
var play = true;
var up, down, right, left, mobile = false,
  bang = false;
//Disparo
var x_disp = [];
var y_disp = [];
var disparou = [false, false, false, false, false];
var tempo = 0;
//audio
var laser = [];
var explosao = [];
let selecionou = [0, 1, 2, 3, 4];
let somfundo;
let som = [];
//inimigos
var xi = [];
var yi = [];
var qti = 5;
let v = [];
var Vmax = 0;
//bum
var xbum, ybum, bum;
//equações
let n = [],
  res = 0;
var n1 = 0,
  n2 = 0;
var errada = [];
//espaço em movimento
let xestrela = [];
let yestrela = [];
let vestrela = [];
let cor = "#FFFFFF";
var delay = 300;
var teste = 0;
var nivel = [];
//design
var logo;
var jogador;
var col = 0,
  col2 = 0,
  col3 = 0;
col4 = 0;
var l = 800,
  a = 490,
  xlo = 0,
  ylo = 0,
  xini = -100,
  xcre = 900,
  xinfo = -100;
var t = 0;
var cont = false;
var xc = [],
  yc = [];
//desafio
let meteoro = [];
var xp = [];
var yp = [];
var qtp = 10;
let vp = [];
let tam = [];
//-----------------------------------------------------------

function preload() {
  pedra = loadImage('imagens/meteoro.png')
  fundo2 = loadImage("imagens/stars.png");
  logo = loadImage("imagens/MS.png");
  jogador = loadImage("imagens/milenium.gif");
  tiro = loadImage("imagens/tiro.png");
  contra = loadImage("imagens/atacante.gif");
  bum = loadImage("imagens/cabum.gif");
  gameover = loadImage("imagens/gameover.png");
  lindo = loadImage("imagens/lindo.jpeg")
  loading = loadImage('imagens/carregando.gif');
  fundogame = loadImage('imagens/fundogame.jpg');
  seta = loadImage('imagens/seta.png');
  somfundo = createAudio('audios/somdefundo.mp3');
  nivel[1] = loadImage('imagens/um.png');
  nivel[2] = loadImage('imagens/dois.png');
  nivel[3] = loadImage('imagens/tres.png');
  nivel[4] = loadImage('imagens/quatro.png');
  nivel[5] = loadImage('imagens/cinco.png');
  for (i = 0; i < 5; i++) {
    selecionou[i] = createAudio('audios/selecionar.mp3');
  }
  fundogame = createAudio('audios/somgame.mp3');
  som[0] = loadImage('imagens/comsom.png');
  som[1] = loadImage('imagens/semsom.png');
  up = loadImage('imagens/cima.png');
  down = loadImage('imagens/baixo.png');
  left = loadImage('imagens/esquerda.png');
  right = loadImage('imagens/direita.png');
}

function setup() {
  cvn = createCanvas(800, 490);
  cvn.parent('game');
  info = createVideo(['videos/SW.mp4']);
  info.hide();
  for (i = 0; i < qtp; i++) {
    xp[i] = random(30, 740);
    tam[i] = random(60, 100);
    yp[i] = random(-1000, -tam[i]);
  }
  for (i = 0; i < qti; i++) {
    xi[i] = random(55, 745);
    yi[i] = -50;
    v[i] = random(1, 1 / 2);
    explosao[i] = createAudio('audios/explosao.mp3');

  }
  //equações
  for (i = 0; i < 11; i++) {
    n[i] = i;
  }
  for (z = 0; z < 4; z++) {
    errada[z] = parseInt(random(1, 10)) * parseInt(random(1, 10));
  }
  n1 = parseInt(random(0, 10));
  n2 = parseInt(random(0, 10));
  res = n[n1] * n[n2];
  //fundo
  for (i = 0; i < 200; i++) {
    xestrela[i] = random(10, 800);
    yestrela[i] = random(10, 490);
    vestrela[i] = random(2, 3);
  }

  for (i = 0; i < 5; i++) {
    laser[i] = createAudio('audios/tirolaser.mp3');
  }
}

function draw() {
  textStyle(NORMAL);
  inicio();
  menu();
  game();
  informacao();
  perdeu();
  voltar();
  creditos();
}

function menu() {
  //Tela de Menu
  if (tela == 1) {
    background("#000000");

    fill("#f1f1f1");
    rect(760, 6, 30, 30);
    image(som[s], 765, 10, 20, 20);
    score = 0;
    if (s === 1) {
      somfundo.loop();
    } else {
      somfundo.stop();
    }

    image(logo, xlo, ylo, l, a);
    if (l >= 300) {
      l -= 6 * 2.5;
    }
    if (a >= 150) {
      a -= 4 * 2.5;
    }
    if (xlo <= 260) {
      xlo += 3 * 2.5;
    }
    if (ylo <= 90) {
      ylo += (3 / 2) * 2.5;
    }

    for (i = 0; i < 200; i++) {
      fill(cor);
      ellipse(xestrela[i], yestrela[i], 2, 7);
      if (yestrela[i] > 490) {
        yestrela[i] = -10;
      }
      yestrela[i] = yestrela[i] + random(1, 2);
    }
    //Menu com três opções
    textSize(15);
    text("MAIOR PONTUAÇÃO: " + Mscore, 90, 20);
    noFill();
    stroke(255, 255, 0);
    rect(-5, -5, 220, 35);
    //Iniciar Jogo
    textAlign(CENTER);
    textSize(26);
    noStroke();

    if (mouseX > xMenu && mouseX < xMenu + largura && mouseY > yMenu1 && mouseY < yMenu1 + altura) {
      fill(col);
      selecionou[0].play();
      if (col <= 255) {
        col += 5;
      }
      stroke(col, col, 0);
      noFill();
      rect(xMenu, yMenu1, largura, altura, 15);
      fill(col, col, 0);
      text("Iniciar", 410, 300);
      if (mouseIsPressed || touches.length == 1) {
        tela = 2;
      }
    } else {
      selecionou[0].stop();
      col = 0;
      fill(255, 255, 255);
      if (xini < 410) {
        xini += 10;
      }
      text("Iniciar", xini, 300);
    }
    fill(255);
    noStroke();

    //Créditos
    if (mouseX > xMenu && mouseX < xMenu + largura && mouseY > yMenu2 && mouseY < yMenu2 + altura) {
      fill(col2);
      selecionou[1].play();
      if (col2 <= 255) {
        col2 += 5;
      }
      stroke(col2, col2, 0);
      noFill();
      rect(xMenu, yMenu2, largura, altura, 15);
      fill(col2, col2, 0);
      text("Créditos", 410, 375);
      if (mouseIsPressed || touches.length == 1) {
        tela = 3;
      }
    } else {
      col2 = 0;
      selecionou[1].stop();
      fill(255, 255, 255);
      if (xcre > 410) {
        xcre -= 10;
      }
      text("Créditos", xcre, 375);
    }
    fill(255);
    noStroke();

    //Informações
    textAlign(CENTER);
    textSize(26);

    if (mouseX > xMenu && mouseX < xMenu + largura && mouseY > yMenu3 && mouseY < yMenu3 + altura) {
      fill(col3);
      selecionou[2].play();
      if (col3 <= 255) {
        col3 += 5;
      }
      stroke(col3, col3, 0);
      noFill();
      rect(xMenu, yMenu3, largura, altura, 15);
      fill(col3, col3, 0);
      text("Informações", 410, 450);
      if (mouseIsPressed || touches.length == 1) {
        tela = 4;
      }
    } else {
      col3 = 2;
      selecionou[2].stop();
      fill(255, 255, 255);
      if (xinfo < 410) {
        xinfo += 10;
      }
      text("Informações", xinfo, 450);
    }
    fill(255);
    noStroke();
  }
  if (keyIsDown(ESCAPE)) {
    tela = 0;
  }
}

function game() {
  //Jogo em ação
  if (tela == 2) {
    //fundo
    somfundo.stop();
    if (s === 1) {
      fundogame.loop();
    } else {
      fundogame.stop();
    }

    background('#000000');

    desafio();
    estagios();
    textSize(15);

    if (mouseX > 720 && mouseX < 720 + 80 && mouseY > -10 && mouseY < -10 + 60) {
      fill(col4);
      selecionou[4].play();
      if (col4 <= 255) {
        col4 += 5;
      }
      stroke(col4, col4, 0);
      noFill();
      rect(720, -10, 80, 60, 5);
      fill(col4, col4, 0);
      text("ESC", 750, 20);
      image(seta, 725, 18, 80, 20);
      if (mouseIsPressed || touches.length == 1) {
        tela = 1;
        info.stop();
        somfundo.stop();
        fundogame.stop();
        for (i = 0; i < qti; i++) {
          xi[i] = random(55, 745);
          yi[i] = -50;
          v[i] = random(0, 3 / 2);
        }
        x = 350;
        y = 345;
        life = 500;
        l = 800;
        a = 490;
        xlo = 0;
        ylo = 0;
        xini = -100;
        xcre = 900;
        xinfo = -100;
        niv = 1;
        larguraN = 150;
        alturaN = 200;
        xN = 350;
        yN = 120;
      }
    } else {
      selecionou[4].stop();
      col4 = 0;
      fill(255, 255, 255);
      textSize(15);
      text("ESC", 750, 20);
      image(seta, 720, 15, 80, 20);
    }
    fill(255);
    noStroke();

    noStroke();
    for (i = 0; i < 200; i++) {
      fill(cor);
      ellipse(xestrela[i], yestrela[i], 2, 7);
      if (yestrela[i] > 490) {
        yestrela[i] = -10;
      }
      yestrela[i] = yestrela[i] + vestrela[i];
    }
    image(jogador, x, y, 100, 120);
    fill("#363636");
    noStroke();
    rect(155, 455, 500, 10, 20);
    fill("#042f66");
    stroke(19, 19, t);
    rect(155, 455, life, 10, 20);
    textSize(15);
    text(life + " / 500", 400, 480);
    disparo();
    movimentação();
    inimigo();
    equacoes();
    fill(240);
    noStroke();
    textSize(12);
    text("SCORE: " + score, 40, 20);
  }
}

function informacao() {
  //Informações sobre o jogo
  if (tela == 4) {
    somfundo.stop();
    fundogame.stop();
    image(info, 0, 0, 800, 490);
    if (play == true) {
      info.play();
    }

    if (mouseX > 720 && mouseX < 720 + 80 && mouseY > -10 && mouseY < -10 + 60) {
      fill(col4);
      selecionou[4].play();
      if (col4 <= 255) {
        col4 += 5;
      }
      stroke(col4, col4, 0);
      noFill();
      rect(720, -10, 80, 60, 5);
      fill(col4, col4, 0);
      text("ESC", 750, 20);
      image(seta, 725, 18, 80, 20);
      if (mouseIsPressed || touches.length == 1) {
        tela = 1;
        info.stop();
        somfundo.stop();
        for (i = 0; i < qti; i++) {
          xi[i] = random(55, 745);
          yi[i] = -50;
          v[i] = random(0, 3 / 2);
        }
        x = 350;
        y = 345;
        life = 500;
        l = 800;
        a = 490;
        xlo = 0;
        ylo = 0;
        xini = -100;
        xcre = 900;
        xinfo = -100;
      }
    } else {
      selecionou[4].stop();
      col4 = 0;
      fill(255, 255, 255);
      textSize(15);
      text("ESC", 750, 20);
      image(seta, 720, 15, 80, 20);
    }
    fill(255);
    noStroke();

  }
}

function voltar() {
  //voltar;
  if (keyIsDown(ESCAPE)) {
    selecionou[3].play();
    tela = 1;
    info.stop();
    somfundo.stop();
    fundogame.stop();
    for (i = 0; i < qti; i++) {
      xi[i] = random(55, 745);
      yi[i] = -50;
      v[i] = random(0, 3 / 2);
    }
    x = 350;
    y = 345;
    life = 500;
    l = 800;
    a = 490;
    xlo = 0;
    ylo = 0;
    xini = -100;
    xcre = 900;
    xinfo = -100;
    larguraN = 150;
    alturaN = 200;
    xN = 350;
    yN = 120;
    niv = 1;
  }



}

function movimentação() {
  if (mobile) {
    image(up, 98, 287, 60, 60);
    image(down, 98, 373, 60, 60);
    image(left, 143, 330, 60, 60);
    image(right, 50, 330, 60, 60);

    noFill(140, 99, 255);
    strokeWeight(2)
    ellipse(700, 370, 60, 60);
    image(tiro, 677, 342, 50, 50);
    //strokeWeight(1)
    //PowPow
    if (mouseX > 670 && mouseX < 670 + 60 && mouseY > 340 && mouseY < 340 + 60) {
      if (mouseIsPressed || touches.length == 1) {
        bang = true;
      } else {
        bang = false;
      }
    }

    //cima
    if (mouseX > 98 && mouseX < 98 + 60 && mouseY > 287 && mouseY < 287 + 60) {
      if (mouseIsPressed || touches.length == 1) {
        if (y > -20) {
          y = y - 5;
        }
      }
    }
    //baixo
    if (mouseX > 98 && mouseX < 98 + 60 && mouseY > 373 && mouseY < 373 + 60) {
      if (mouseIsPressed || touches.length == 1) {
        if (y < 375) {
          y = y + 5;
        }
      }
    }
    //direita
    if (mouseX > 143 && mouseX < 143 + 60 && mouseY > 330 && mouseY < 330 + 60) {
      if (mouseIsPressed || touches.length == 1) {
        if (x < 700) {
          x = x + 5;
        }
      }
    }
    //esquerda
    if (mouseX > 50 && mouseX < 50 + 60 && mouseY > 330 && mouseY < 330 + 60) {
      if (mouseIsPressed || touches.length == 1) {
        if (x > -20) {
          x = x - 5;
        }
      }
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (x > -20) {
      x = x - 5;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (x < 700) {
      x = x + 5;
    }
  }
  if (keyIsDown(UP_ARROW)) {

    if (y > -20) {
      y = y - 5;
    }
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (y < 375) {
      y = y + 5;
    }
  }

  //W,A,S,D;
  if (keyIsDown(65)) {
    if (x > -20) {
      x = x - 5;
    }
  }
  if (keyIsDown(68)) {
    if (x < 700) {
      x = x + 5;
    }
  }
  if (keyIsDown(87)) {
    if (y > -20) {
      y = y - 5;
    }
  }

  if (keyIsDown(83)) {
    if (y < 375) {
      y = y + 5;
    }
  }
}

function inimigo() {
  for (i = 0; i < 2; i++) {
    image(contra, xi[i], yi[i], 60, 60);
    fill("#FFFFFF");
    text(errada[i], xi[i], yi[i]);
    yi[i] = yi[i] + (v[i] + Vmax);
    xi[i] = xi[i] + (v[i] + Vmax) / 2;
    if (yi[i] > 500) {
      yi[i] = -50;
      xi[i] = random(55, 745)
      explosao[i].play();

      //life
      if (life >= 50) {
        life = life - 50;
      } else {
        tela = 5;
        life = 500;
        score = 0;
        for (i = 0; i < qti; i++) {
          xi[i] = random(55, 745);
          yi[i] = -50;
          v[i] = random(0, 3 / 2);
        }
        x = 350;
        y = 345;
      }
    }
    if (xi[i] > 800) {
      yi[i] = -50;
      xi[i] = random(55, 745)
    }
  }
  for (i = 2; i < 4; i++) {
    image(contra, xi[i], yi[i], 60, 60);
    fill("#FFFFFF");

    if (i == 2) {
      text(res, xi[2], yi[2]);
    } else {
      text(errada[i], xi[i], yi[i]);
    }
    yi[i] = yi[i] + (v[i] + Vmax);
    xi[i] = xi[i] - (v[i] + Vmax) / 2;
    if (yi[i] > 500) {
      explosao[i].play();
      //life
      if (life > 20) {
        life = life - 50;
      } else {
        tela = 5;
        life = 500;
        score = 0;
        for (i = 0; i < qti; i++) {
          xi[i] = random(55, 745);
          yi[i] = -50;
          v[i] = random(0, 3 / 2);
        }
        x = 350;
        y = 345;
      }

      yi[i] = -50;
      xi[i] = random(55, 745)
    }
    if (xi[i] < (-60)) {
      yi[i] = -50;
      xi[i] = random(55, 745)
    }
  }
}

function creditos() {
  if (tela == 3) {
    background('#000000');
    somfundo.stop();
    fundogame.stop();

    if (mouseX > 720 && mouseX < 720 + 80 && mouseY > -10 && mouseY < -10 + 60) {
      fill(col4);
      selecionou[4].play();
      if (col4 <= 255) {
        col4 += 5;
      }
      stroke(col4, col4, 0);
      noFill();
      rect(720, -10, 80, 60, 5);
      fill(col4, col4, 0);
      text("ESC", 750, 20);
      image(seta, 725, 18, 80, 20);
      if (mouseIsPressed || touches.length == 1) {
        tela = 1;
        info.stop();
        somfundo.stop();
        for (i = 0; i < qti; i++) {
          xi[i] = random(55, 745);
          yi[i] = -50;
          v[i] = random(0, 3 / 2);
        }
        x = 350;
        y = 345;
        life = 500;
        l = 800;
        a = 490;
        xlo = 0;
        ylo = 0;
        xini = -100;
        xcre = 900;
        xinfo = -100;
        if (s === 1) {
          somfundo.loop();
        } else {
          somfundo.stop();
        }
      }
    } else {
      selecionou[4].stop();
      col4 = 0;
      fill(255, 255, 255);
      textSize(15);
      text("ESC", 750, 20);
      image(seta, 720, 15, 80, 20);
    }
    fill(255);
    noStroke();

    for (i = 0; i < 200; i++) {
      fill(cor);
      ellipse(xestrela[i], yestrela[i], 2, 7);
      if (yestrela[i] > 490) {
        yestrela[i] = -random(0, 10);
      }
      yestrela[i] = yestrela[i] + random(1, 2);
    }

    noFill();
    stroke(19, 19, t);
    if (t <= 255 && cont == false) {
      t += 5;
    } else {
      cont = true;
    }
    if (cont == true) {
      t -= 5;
      if (t == 0) {
        cont = false;
      }
    }

    image(lindo, 150, 150, 150, 125);
    rect(145, 145, 160, 135);
    stroke('#ff1919');
    stroke(t, 19, 19);
    image(loading, 525, 180, 100, 75);
    rect(495, 150, 160, 135);
    fill("#FFFFFF");
    noStroke();
    textSize(20);
    text("Programador ", 230, 130);
    text("Orientador ", 585, 130);
    textSize(15);
    text("Ernane Ferreira Rocha Júnior ", 225, 305);
    text("E-mail: ernane.junior25@gmail.com ", 225, 325);
    text("                                - ", 510, 305);
  }
}

function disparo() {
  if (tempo == 0) {
    for (i = 0; i < 5; i++) {
      if ((keyIsDown(32) && disparou[i] == false) || (bang == true && disparou[i] == false)) {

        if (!disparou[i]) {
          x_disp[i] = x + 35;
        }
        disparou[i] = true;
        laser[i].play();
        break;
      }
    }
    tempo = 5;
  }
  tempo--;
  for (i = 0; i < 5; i++) {
    if (disparou[i] == true) {
      fill("#00FFFF")
      image(tiro, x_disp[i], y_disp[i], 30, 30);
      if (y_disp[i] > 0) {
        y_disp[i] -= 10;
      } else {
        disparou[i] = false;
        y_disp[i] = y + 30;
      }
    }
    for (j = 0; j < 5; j++) {
      for (k = 0; k < 5; k++) {
        if (dist(xi[k] + 30, yi[k] + 30, x_disp[j], y_disp[j]) <= 15 + 30) {
          disparou[j] = false;
          x_disp[j] = x + 60;
          y_disp[j] = y + 30;
          xbum = xi[k];
          ybum = yi[k];
          image(bum, xbum, ybum, 55, 55);

          explosao[k].play();
          if (k == 2) {
            pf = pf + 1;
            if (pf == 10) {
              if (niv < 5) {
                niv += 1;
                larguraN = 150;
                alturaN = 200;
                xN = 350;
                yN = 120;
                estagios();
              } else {
                desafio();
              }

              if (Vmax <= 5) {
                Vmax += 1 / 2;
              }
              if (life < 450) {
                life = life + 10;
              }
              pf = 0;
            }


            cor = "#008000";
            setTimeout(() => {
              cor = "#FFFFFF";
            }, delay);
            for (q = 0; q < 4; q++) {
              yi[q] = -50;
              xi[q] = random(55, 745)
            }
            score = score + 50;
            if (score > Mscore) {
              Mscore = score;
            }
            n1 = parseInt(random(0, 10));
            n2 = parseInt(random(0, 10));
            res = n[n1] * n[n2];
            for (z = 0; z < 4; z++) {
              errada[z] = parseInt(random(1, 10)) * parseInt(random(1, 10));
              while (errada[z] == res) {
                errada[z] = parseInt(random(1, 10)) * parseInt(random(1, 10));
              }
            }
          } else {
            cor = "#FF0000";
            setTimeout(() => {
              cor = "#FFFFFF";
            }, delay);

            if (score >= 5) {
              score = score - 5;
            }
            if (life >= 10) {
              life = life - 10;
            } else {
              tela = 5;
            }
          }
          yi[k] = -50;
          xi[k] = random(55, 745)
        }
        if (dist(xi[k] + 30, yi[k] + 30, x + 50, y + 60) <= 30 + 10) {
          xbum = xi[k];
          ybum = yi[k];
          x = 350;
          y = 345;
          image(bum, xbum, ybum, 55, 55);
          explosao[k].play(300);

          if (score >= 10) {
            score = score - 10;
          }
          if (life >= 10) {
            life = life - 10;
          } else {
            tela = 5;
          }
          yi[k] = -50;
          xi[k] = random(55, 745)
        }
      }
    }
  }
}

function perdeu() {
  if (tela == 5) {
    background("#000000");
    image(seta, 700, 15, 100, 30);
    fundogame.stop();
    for (i = 0; i < 200; i++) {
      fill(cor);
      ellipse(xestrela[i], yestrela[i], 2, 7);
      if (yestrela[i] > 490) {
        yestrela[i] = -random(0, 10);
      }
      yestrela[i] = yestrela[i] + random(1, 2);
    }
    image(gameover, -90, -60, 1000, 600);
    Vmax = 0;
    xini = -100;
    xcre = 900;
    xinfo = -100;
    l = 800;
    a = 490;
    xlo = 0;
    ylo = 0;
    larguraN = 150;
    alturaN = 200;
    xN = 350;
    yN = 120;

    if (mouseX > 720 && mouseX < 720 + 80 && mouseY > -10 && mouseY < -10 + 60) {
      fill(col4);
      selecionou[4].play();
      if (col4 <= 255) {
        col4 += 5;
      }
      stroke(col4, col4, 0);
      noFill();
      rect(720, -10, 80, 60, 5);
      image(seta, 60, 5, 10, 10);
      fill(col4, col4, 0);
      text("ESC", 750, 20);
      image(seta, 725, 18, 80, 20);
      if (mouseIsPressed || touches.length == 1) {
        tela = 1;
        info.stop();
        somfundo.stop();
        for (i = 0; i < qti; i++) {
          xi[i] = random(55, 745);
          yi[i] = -50;
          v[i] = random(0, 3 / 2);
        }
        x = 350;
        y = 345;
        life = 500;
        l = 800;
        a = 490;
        xlo = 0;
        ylo = 0;
        xini = -100;
        xcre = 900;
        xinfo = -100;
      }
    } else {
      selecionou[4].stop();
      col4 = 0;
      fill(255, 255, 255);
      textSize(15);
      text("ESC", 750, 20);
      image(seta, 720, 15, 80, 20);
    }
    fill(255);
    noStroke();
  }
}

function equacoes() {
  fill("#363636");
  if (t <= 255 && cont == false) {
    t += 5;
  } else {
    cont = true;
  }
  if (cont == true) {
    t -= 5;
    if (t == 0) {
      cont = false;
    }
  }
  stroke(19, 19, t);
  rect(320, -10, 150, 40, 5, 5, 15, 15);
  fill("#FFFFFF");
  text(n1 + "  ×  " + n2 + "  =  ???", 395, 20);
}

function estagios() {
  image(nivel[niv], xN, yN, larguraN, alturaN);
  setTimeout(redimencionar, 1000);

}

function redimencionar() {
  if (larguraN >= 50) {
    larguraN -= 3 / 2;
  }
  if (alturaN >= 50) {
    alturaN -= 3 / 2;
  }
  if (xN <= 760) {
    xN += 4;
  }
  if (yN <= 430) {
    yN += (3);
  }
}

function desafio() {
  for (i = 0; i < qtp; i++) {
    image(pedra, xp[i], yp[i], tam[i], tam[i]);
    yp[i] = yp[i] + random(1, 2);
    if (yp[i] > 500) {
      yp[i] = random(-1000, -50);
      xp[i] = random(30, 740);
      tam[i] = random(60, 100);
    }
  }
}

function inicio() {
  if (tela == 0) {
    background("#000000");
    image(logo, 140, 120, 500, 250);
    for (i = 0; i < 200; i++) {
      fill(cor);
      noStroke();
      ellipse(xestrela[i], yestrela[i], 2, 7);
      if (yestrela[i] > 490) {
        yestrela[i] = -10;
      }
      yestrela[i] = yestrela[i] + random(1, 2);
    }

    //PC
    if (mouseX > 155 && mouseX < 155 + largura && mouseY > 380 && mouseY < 380 + altura) {
      noFill();
      if (col <= 255) {
        col += 5;
      }
      stroke(col, col, 0);
      noFill();
      rect(155, 380, largura, altura, 15);
      fill(col, col, 0);
      textSize(20);
      text("Computador", 204, 412);
      if (mouseIsPressed || touches.length == 1) {
        mobile = false;
        tela = 1;
      }
    } else {
      col = 0;
      fill(255, 255, 255);
      textSize(20);
      text("Computador", 204, 412);
    }
    fill(255);
    noStroke();

    //Celular
    if (mouseX > 455 && mouseX < 455 + largura && mouseY > 380 && mouseY < 380 + altura) {
      noFill(col2);
      if (col2 <= 255) {
        col2 += 5;
      }
      stroke(col2, col2, 0);
      noFill();
      rect(455, 380, largura, altura, 15);
      fill(col2, col2, 0);
      textSize(20);
      text("Celular", 527, 412);
      if (mouseIsPressed || touches.length == 1) {
        mobile = true;
        tela = 1;
      }
    } else {
      col2 = 0;
      fill(255, 255, 255);
      textSize(20);
      text("Celular", 527, 412);
    }
    fill(255);
    noStroke();
    textSize(15);
    text("Qual o tipo de dispositivo que você está utilizando?", 228, 465);
  }

}

function mouseClicked() {
  if (tela == 1) {
    if (mouseX > 760 & mouseX < 760 + 30 && mouseY > 6 && mouseY < 10 + 30) {
      if (s === 0) {
        s = 1;
      } else {
        s = 0;
      }
    }
  }
  if (tela == 3) {
    if (mouseX > 760 & mouseX < 760 + 30 && mouseY > 6 && mouseY < 10 + 30) {
      if (s === 0) {
        s = 1;
      } else {
        s = 0;
      }
    }
  }
}