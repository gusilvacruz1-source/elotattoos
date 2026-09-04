/* =====================================================================
   GALLERY.JS · filtros com transição FLIP + lightbox por peça
   Cada cartão da grade é uma TATUAGEM, não uma foto. Abrindo, as setas
   passam pelos ângulos daquela mesma peça — como numa ficha de imóvel,
   em que se navega pelos cômodos da mesma casa.
   ===================================================================== */

(function () {
  'use strict';

  var grid = document.getElementById('galeria-grid');
  if (!grid) return;

  var fotos = Array.prototype.slice.call(grid.querySelectorAll('.shot'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.filtros .chip'));
  var vazio = document.getElementById('galeria-vazio');
  var temGsap = typeof window.gsap !== 'undefined';
  var reduzido = (window.EB && window.EB.reduzido) || false;

  fotos.forEach(function (shot) {
    var r = shot.getAttribute('data-ratio');
    var media = shot.querySelector('.media');
    if (r && media) media.style.aspectRatio = r;
  });

  /* -------------------------------------------------------------
     1. FILTROS
     ------------------------------------------------------------- */
  function medir() {
    var mapa = new Map();
    fotos.forEach(function (f) { if (!f.hidden) mapa.set(f, f.getBoundingClientRect()); });
    return mapa;
  }

  function filtrar(categoria) {
    var antes = medir();

    /* data-cat aceita mais de uma categoria, separadas por espaco.
       "cicatrizadas" e um estado, nao um estilo: uma manga floral ja
       curada e as duas coisas ao mesmo tempo. */
    fotos.forEach(function (f) {
      var cats = (f.getAttribute('data-cat') || '').split(/\s+/);
      f.hidden = !(categoria === 'todas' || cats.indexOf(categoria) !== -1);
    });

    /* Categoria ainda sem foto: diz isso, em vez de deixar um vão mudo. */
    var visiveis = fotos.filter(function (f) { return !f.hidden; });
    if (vazio) vazio.hidden = visiveis.length > 0;
    grid.hidden = visiveis.length === 0;

    if (!temGsap || reduzido) return;
    var depois = medir();
    depois.forEach(function (novo, el) {
      var velho = antes.get(el);
      if (velho) {
        var dx = velho.left - novo.left, dy = velho.top - novo.top;
        if (dx || dy) gsap.fromTo(el, { x: dx, y: dy }, { x: 0, y: 0, duration: 0.65, ease: 'power3.inOut' });
      } else {
        gsap.fromTo(el, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' });
      }
    });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) {
        var ativo = c === chip;
        c.classList.toggle('is-active', ativo);
        c.setAttribute('aria-pressed', ativo ? 'true' : 'false');
      });
      filtrar(chip.getAttribute('data-filter'));
    });
  });

  /* -------------------------------------------------------------
     2. LIGHTBOX — navega pelos ângulos da peça aberta
     ------------------------------------------------------------- */
  var lb = document.getElementById('lightbox');
  var holder = document.getElementById('lb-holder');
  var cap = document.getElementById('lb-cap');
  var titulo = document.getElementById('lb-titulo');
  var pontos = document.getElementById('lb-pontos');
  var btnFechar = document.getElementById('lb-close');
  var btnAnt = document.getElementById('lb-prev');
  var btnProx = document.getElementById('lb-next');

  var angulos = [];          /* ângulos da peça aberta */
  var i = 0;                 /* ângulo atual */
  var focoAnterior = null;

  function preparar(shot) {
    try { return JSON.parse(shot.getAttribute('data-angulos')); }
    catch (e) { return []; }
  }

  function montar() {
    var a = angulos[i];
    if (!a) return;

    var peca;
    if (a.tipo === 'video') {
      peca = document.createElement('video');
      peca.src = a.src;
      peca.poster = a.poster;
      peca.width = a.w; peca.height = a.h;
      peca.controls = true;
      peca.loop = true;
      peca.muted = true;              /* os vídeos já vão sem áudio */
      peca.playsInline = true;
      peca.setAttribute('aria-label', a.alt);
      /* Movimento reduzido: fica no poster, com o controle à mão. */
      if (!reduzido) {
        peca.autoplay = true;
        peca.addEventListener('canplay', function () {
          var t = peca.play();
          if (t && t.catch) t.catch(function () {});
        }, { once: true });
      }
    } else {
      peca = new Image();
      peca.src = a.src;
      peca.alt = a.alt;
      peca.width = a.w; peca.height = a.h;
    }
    holder.innerHTML = '';
    holder.appendChild(peca);
    var img = peca;

    cap.textContent = angulos.length > 1
      ? (i + 1) + ' de ' + angulos.length
      : '';
    lb.setAttribute('aria-label', titulo.textContent + ' — ' + a.alt);

    /* pontos, um por ângulo */
    pontos.innerHTML = '';
    if (angulos.length > 1) {
      angulos.forEach(function (_, k) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'lightbox__ponto' + (k === i ? ' is-atual' : '');
        b.setAttribute('aria-label', 'Ângulo ' + (k + 1));
        b.setAttribute('aria-current', k === i ? 'true' : 'false');
        b.addEventListener('click', function () { i = k; montar(); });
        pontos.appendChild(b);
      });
    }

    /* o próximo já vai baixando, para a seta responder na hora */
    if (angulos.length > 1) {
      var seguinte = angulos[(i + 1) % angulos.length];
      if (seguinte.tipo !== 'video') {            /* vídeo não se pré-carrega */
        var prox = new Image();
        prox.src = seguinte.src;
      }
    }

    if (temGsap && !reduzido) {
      gsap.fromTo(img, { opacity: 0, scale: 0.985 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' });
    }
  }

  function abrir(shot) {
    angulos = preparar(shot);
    if (!angulos.length) return;
    i = 0;
    titulo.textContent = shot.getAttribute('data-titulo') || '';

    var sozinha = angulos.length < 2;
    btnAnt.hidden = sozinha;
    btnProx.hidden = sozinha;

    focoAnterior = document.activeElement;
    lb.hidden = false;
    montar();
    if (window.EB) window.EB.travarScroll();
    btnFechar.focus();
  }

  function fechar() {
    lb.hidden = true;
    holder.innerHTML = '';
    pontos.innerHTML = '';
    if (window.EB) window.EB.soltarScroll();
    if (focoAnterior) focoAnterior.focus();
  }

  function andar(passo) {
    if (angulos.length < 2) return;
    i = (i + passo + angulos.length) % angulos.length;
    montar();
  }

  fotos.forEach(function (shot) {
    shot.addEventListener('click', function () { abrir(shot); });
  });

  btnFechar.addEventListener('click', fechar);
  btnAnt.addEventListener('click', function () { andar(-1); });
  btnProx.addEventListener('click', function () { andar(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) fechar(); });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); fechar(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); andar(1); return; }
    if (e.key === 'ArrowLeft') { e.preventDefault(); andar(-1); return; }

    if (e.key === 'Tab') {
      var focaveis = [btnFechar];
      if (angulos.length > 1) focaveis = focaveis.concat([btnAnt, btnProx],
        Array.prototype.slice.call(pontos.querySelectorAll('button')));
      var atual = focaveis.indexOf(document.activeElement);
      e.preventDefault();
      var prox = e.shiftKey ? atual - 1 : atual + 1;
      if (prox < 0) prox = focaveis.length - 1;
      if (prox >= focaveis.length) prox = 0;
      focaveis[prox].focus();
    }
  });
})();
