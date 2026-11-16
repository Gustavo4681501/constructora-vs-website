/* Constructora VS · comportamiento del sitio
   1. Vista previa sin servidor   2. Menú móvil   3. Galería: filtros y visor
   4. Formulario de presupuesto (WhatsApp y, si se configura, correo)        */
(function () {
  'use strict';

  var WHATSAPP = '50686661519';
  var doc = document.documentElement;
  doc.classList.add('js');

  /* 1. Vista previa sin servidor ------------------------------------------
     Los enlaces internos van sin ".html" (así los sirve Cloudflare Pages).
     Si el sitio se abre con doble clic (file://), se les agrega la extensión. */
  if (location.protocol === 'file:') {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (h === './') { a.setAttribute('href', 'index.html'); return; }
      var m = /^([a-z0-9-]+)(#[\w-]*)?$/.exec(h);
      if (m) { a.setAttribute('href', m[1] + '.html' + (m[2] || '')); }
    });
  }

  /* 2. Menú móvil ---------------------------------------------------------- */
  var boton = document.querySelector('.menu-boton');
  var nav = document.getElementById('menu');
  if (boton && nav) {
    var cerrarMenu = function () {
      nav.classList.remove('nav--abierta');
      boton.setAttribute('aria-expanded', 'false');
    };
    boton.addEventListener('click', function () {
      var abierto = nav.classList.toggle('nav--abierta');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav--abierta')) { cerrarMenu(); boton.focus(); }
    });
  }

  /* 3. Galería -------------------------------------------------------------- */
  var galeria = document.querySelector('[data-galeria]');
  if (galeria) {
    var obras = Array.prototype.slice.call(galeria.querySelectorAll('.obra'));
    var filtros = Array.prototype.slice.call(document.querySelectorAll('.filtro'));
    var conteo = document.querySelector('.conteo');

    var filtrar = function (cat, tocarUrl) {
      var visibles = 0;
      obras.forEach(function (o) {
        var ver = cat === 'todas' || o.getAttribute('data-cat') === cat;
        o.hidden = !ver;
        if (ver) { visibles += 1; }
      });
      filtros.forEach(function (f) {
        f.setAttribute('aria-pressed', f.getAttribute('data-filtro') === cat ? 'true' : 'false');
      });
      if (conteo) { conteo.textContent = visibles === 1 ? '1 foto' : visibles + ' fotos'; }
      if (tocarUrl && window.history && history.replaceState) {
        history.replaceState(null, '', cat === 'todas' ? location.pathname + location.search : '#' + cat);
      }
    };

    filtros.forEach(function (f) {
      f.addEventListener('click', function () { filtrar(f.getAttribute('data-filtro'), true); });
    });
    var inicial = location.hash.replace('#', '');
    var existe = filtros.some(function (f) { return f.getAttribute('data-filtro') === inicial; });
    filtrar(existe ? inicial : 'todas', false);

    /* Visor de fotos */
    var visor = document.getElementById('visor');
    if (visor && typeof visor.showModal === 'function') {
      var img = visor.querySelector('.visor__escena img');
      var pie = visor.querySelector('.visor__pie');
      var cuenta = visor.querySelector('.visor__cuenta');
      var lista = [];
      var actual = 0;
      var origen = null;

      var mostrar = function (i) {
        actual = (i + lista.length) % lista.length;
        var enlace = lista[actual].querySelector('a');
        var mini = enlace.querySelector('img');
        img.src = enlace.getAttribute('href');
        img.alt = mini.getAttribute('alt');
        pie.textContent = lista[actual].querySelector('figcaption').textContent;
        cuenta.textContent = (actual + 1) + ' de ' + lista.length;
      };

      galeria.addEventListener('click', function (e) {
        var enlace = e.target.closest ? e.target.closest('.obra a') : null;
        if (!enlace || e.ctrlKey || e.metaKey || e.shiftKey) { return; }
        e.preventDefault();
        origen = enlace;
        lista = obras.filter(function (o) { return !o.hidden; });
        mostrar(lista.indexOf(enlace.closest('.obra')));
        visor.showModal();
      });
      visor.querySelector('.visor__ant').addEventListener('click', function () { mostrar(actual - 1); });
      visor.querySelector('.visor__sig').addEventListener('click', function () { mostrar(actual + 1); });
      visor.querySelector('.visor__boton--cerrar').addEventListener('click', function () { visor.close(); });
      visor.addEventListener('click', function (e) { if (e.target === visor) { visor.close(); } });
      visor.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { mostrar(actual - 1); }
        if (e.key === 'ArrowRight') { mostrar(actual + 1); }
      });
      visor.addEventListener('close', function () {
        img.removeAttribute('src');
        if (origen) { origen.focus(); }
      });
    }
  }

  /* 4. Formulario de presupuesto ------------------------------------------- */
  var form = document.querySelector('[data-presupuesto]');
  if (form) {
    var estado = form.querySelector('.estado');
    var porCorreo = form.querySelector('[data-enviar="correo"]');
    var clave = (form.getAttribute('data-web3forms-key') || '').trim();
    if (porCorreo && clave) { porCorreo.hidden = false; }

    var decir = function (texto, error) {
      estado.textContent = texto;
      estado.classList.toggle('estado--error', !!error);
      estado.hidden = false;
    };
    var valor = function (nombre) {
      var c = form.elements[nombre];
      return c ? String(c.value || '').trim() : '';
    };
    var mensaje = function () {
      var lineas = ['Hola, soy ' + valor('nombre') + '. Quiero pedir un presupuesto.'];
      if (valor('tipo')) { lineas.push('Tipo de proyecto: ' + valor('tipo')); }
      if (valor('lugar')) { lineas.push('Lugar: ' + valor('lugar')); }
      if (valor('detalles')) { lineas.push('Detalles: ' + valor('detalles')); }
      if (valor('telefono')) { lineas.push('Mi teléfono: ' + valor('telefono')); }
      return lineas.join('\n');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) { return; }
      var modo = (e.submitter && e.submitter.getAttribute('data-enviar')) || 'whatsapp';

      if (modo === 'correo' && clave) {
        decir('Enviando su solicitud…');
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: clave,
            subject: 'Solicitud de presupuesto desde constructoravs.com',
            from_name: 'Sitio web Constructora VS',
            nombre: valor('nombre'), telefono: valor('telefono'), lugar: valor('lugar'),
            tipo: valor('tipo'), detalles: valor('detalles'),
            botcheck: valor('botcheck')
          })
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (d && d.success) { form.reset(); decir('Solicitud enviada. Le respondemos por teléfono o WhatsApp.'); }
          else { decir('La solicitud no se envió. Escríbanos por WhatsApp al 8666 1519.', true); }
        }).catch(function () {
          decir('No hay conexión con el servicio de correo. Escríbanos por WhatsApp al 8666 1519.', true);
        });
        return;
      }

      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje());
      var ventana = window.open(url, '_blank');
      if (ventana) { try { ventana.opener = null; } catch (err) { /* sin acceso: no pasa nada */ } }
      else { location.href = url; }
      decir('Se abrió WhatsApp con su mensaje listo. Toque enviar para que nos llegue.');
    });
  }
})();
