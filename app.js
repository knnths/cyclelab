(function(){
  'use strict';

  /* ---------- PÁGINAS ---------- */
  var PAGES = [
    {f:'index.html', k:'inicio', t:'Inicio'},
    {f:'antes-de-alquilar.html', k:'antes', t:'Antes de alquilar'},
    {f:'como-funciona.html', k:'flujo', t:'Cómo funciona'},
    {f:'clientes.html', k:'clientes', t:'Clientes'},
    {f:'catalogo.html', k:'catalogo', t:'Catálogo'},
    {f:'precios.html', k:'precios', t:'Precios'},
    {f:'multas.html', k:'multas', t:'Multas'},
    {f:'entrega.html', k:'entrega', t:'Entrega'},
    {f:'preguntas.html', k:'faq', t:'Preguntas'},
    {f:'panel.html', k:'panel', t:'Panel'}
  ];
  var CURRENT = document.body.getAttribute('data-page') || 'inicio';

  var nav = PAGES.slice(1).map(function(p){
    return '<li><a href="'+p.f+'"'+(p.k===CURRENT?' class="active" aria-current="page"':'')+'>'+p.t+'</a></li>';
  }).join('');
  var hd = document.getElementById('siteHeader');
  if(hd){
    hd.outerHTML = '<header class="site" id="siteHeaderEl"><div class="wrap nav">' +
      '<a class="brand" href="index.html"><img class="brand-logo" src="img/cyclelab-logo.png" alt="" aria-hidden="true">CycleLab</a>' +
      '<ul id="navList">'+nav+'</ul>' +
      '<div class="nav-right"><a class="navbtn" href="precios.html">Calcular mi alquiler</a>' +
      '<button class="burger" id="burger" aria-expanded="false" aria-controls="navList">Menú</button></div></div></header>';
    var h = document.getElementById('siteHeaderEl'), bg = document.getElementById('burger');
    bg.addEventListener('click',function(){ var o = h.classList.toggle('open'); bg.setAttribute('aria-expanded', o?'true':'false'); });
  }

  var ft = document.getElementById('siteFooter');
  if(ft){
    var idx = 0; PAGES.forEach(function(p,i){ if(p.k===CURRENT) idx = i; });
    var pager = '';
    if(CURRENT!=='inicio'){
      var pv = PAGES[idx-1], nx = PAGES[idx+1];
      pager = '<div class="pager">' +
        (pv ? '<a class="prev" href="'+pv.f+'"><small>Anterior</small><b>← '+pv.t+'</b></a>' : '') +
        (nx ? '<a class="next" href="'+nx.f+'"><small>Siguiente</small><b>'+nx.t+' →</b></a>' : '') + '</div>';
    }
    ft.outerHTML = pager +
    '<footer><div class="wrap"><div class="foot-top"><div>' +
    '<a class="brand" href="index.html"><img class="brand-logo" src="img/cyclelab-logo.png" alt="" aria-hidden="true">CycleLab</a>' +
    '<p class="foot-meta">Proyecto final del módulo 3.1, Bachillerato Técnico Vocacional en Desarrollo de Software: plataforma de alquiler de equipo con entrega a domicilio.</p>' +
    '<img class="logo-img" src="img/logo.png" alt="Logo del Instituto Nacional General Francisco Menéndez">></div>' +
    '<div class="foot-team">' +
    '<div><h5>Presentado por</h5><p>Kenneth Ubaldo Ramírez Osorio<br>Ricardo José Ortiz Sambrano</p></div>' +
    '<div><h5>Docente</h5><p>Karla Lissbeth Mendoza Echeverría</p></div>' +
    '<div><h5>Institución</h5><p>Instituto Nacional General<br>Francisco Menéndez</p></div></div></div>' +
    '<div class="foot-bottom"><span>CycleLab: solicitud, entrega, uso, recogida y cierre</span><span>San Salvador, 2026</span></div></div></footer>';
  }

  /* ---------- DATA ---------- */
  var EQUIPOS = [
    {id:'pon', n:'Ponchadora RJ-45', cat:'Redes y telecom', t:4, v:40},
    {id:'tes', n:'Tester de cable Cat6', cat:'Redes y telecom', t:3, v:30},
    {id:'rou', n:'Router / punto de acceso', cat:'Redes y telecom', t:6, v:70},
    {id:'mul', n:'Multímetro digital', cat:'Medición y electrónica', t:4, v:45},
    {id:'osc', n:'Osciloscopio', cat:'Medición y electrónica', t:30, v:900},
    {id:'tal', n:'Taladro inalámbrico', cat:'Herramientas', t:9, v:120},
    {id:'pro', n:'Proyector', cat:'Audiovisual', t:25, v:450},
    {id:'lap', n:'Laptop', cat:'Cómputo', t:15, v:600}
  ];
  var CATS = [
    {n:'Redes y telecom', r:'$3 a $8 por día', d:'Ponchadoras, testers de cable, routers, switches y puntos de acceso para instalaciones y pruebas.', h:'Foto de un kit de red con ponchadora y tester.'},
    {n:'Herramientas', r:'$5 a $15 por día', d:'Taladros, esmeriles y herramienta manual para obra, mantenimiento y montaje.', h:'Foto de un taladro y una caja de herramienta.'},
    {n:'Medición y electrónica', r:'$4 a $30 por día', d:'Multímetros, osciloscopios y fuentes de poder para diagnóstico y práctica técnica.', h:'Foto de un multímetro o un osciloscopio en uso.'},
    {n:'Audiovisual', r:'$18 a $35 por día', d:'Proyectores, pantallas y bocinas para presentaciones, clases y eventos.', h:'Foto de un proyector en una sala.'},
    {n:'Cómputo', r:'$12 a $20 por día', d:'Laptops y accesorios con el software básico ya instalado.', h:'Foto de una laptop con su cargador y estuche.'},
    {n:'Mantenimiento y componentes', r:'$2 a $10 por día', d:'Kits de limpieza, componentes de repuesto y herramientas de servicio técnico.', h:'Foto de un kit de mantenimiento abierto.'}
  ];
  var STEPS = [
    {t:'Solicitud', who:'Cliente o usuario autorizado de la empresa', time:'Unos 5 minutos',
     lead:'El cliente arma su pedido: elige equipos, fechas y dirección. El sistema revisa todo al instante y muestra el precio antes de confirmar.',
     does:['Elige equipos del catálogo y la cantidad','Indica fecha de inicio y de fin','Escribe la dirección y elige zona y ventana de entrega','Revisa la cotización y envía la solicitud'],
     sys:['Verifica que los equipos estén libres en esas fechas','Valida el límite de artículos y de días según el tipo de cliente','Calcula alquiler, envío y depósito','Crea el alquiler en estado Solicitado y pone los equipos en Reservado'],
     rules:['Un equipo no se puede reservar en fechas que se cruzan','Con una multa pendiente no se aceptan solicitudes nuevas','Se puede cancelar gratis hasta 24 horas antes'],
     st:[['Alquiler','Solicitado','mute'],['Equipo','Reservado','info']], hint:'Captura de la pantalla de carrito con fechas y cotización.'},
    {t:'Aprobación y pago', who:'Encargado de bodega y sistema', time:'Hasta 2 horas hábiles',
     lead:'Antes de enviar nada se confirma que el cliente es quien dice ser y que puede pagar. Aquí empieza la diferencia entre personas y empresas.',
     does:['Individual: paga alquiler, envío y depósito','Corporativo: se carga contra su línea de crédito','Recibe el comprobante y la hora estimada de entrega'],
     sys:['Individual: valida el DUI y registra el pago','Corporativo: valida el contrato y el crédito disponible','Asigna un repartidor y una ruta','Cambia el alquiler a Programado y genera la orden de entrega'],
     rules:['Si el pago falla, la reserva se libera a las 2 horas','Si el crédito no alcanza, se pide aprobación del administrador','El depósito de personas es el 30% del valor de reposición'],
     st:[['Alquiler','Programado','info'],['Equipo','Reservado','info']], hint:'Captura de la pantalla de pago y comprobante.'},
    {t:'Entrega', who:'Repartidor y cliente', time:'Ventana de 4 horas',
     lead:'El repartidor llama 30 minutos antes de llegar. Revisan juntos el equipo y el cliente firma. La firma es lo que inicia el conteo de días.',
     does:['Recibe el equipo y revisa código, estado y accesorios','Prueba que funcione','Firma en el teléfono del repartidor'],
     sys:['Guarda el checklist de entrega con fotos y hora','Registra la firma y el nombre de quien recibió','Cambia equipos a En alquiler y el alquiler a En curso','Calcula la fecha y hora exactas de vencimiento'],
     rules:['Sin firma no inicia el alquiler','Si no hay nadie para recibir, se reprograma y la segunda visita se cobra','Un daño visible al recibir se anota y no se cobra al cliente'],
     st:[['Alquiler','En curso','ok'],['Equipo','En alquiler','warn']], hint:'Foto o captura del checklist de entrega con firma.'},
    {t:'Uso', who:'Cliente', time:'Durante todo el plazo',
     lead:'Mientras el cliente usa el equipo, el sistema vigila las fechas y manda avisos para que nadie se atrase por descuido.',
     does:['Usa el equipo según las indicaciones','Reporta cualquier falla el mismo día','Puede pedir una extensión desde su cuenta'],
     sys:['Envía recordatorio 24 horas antes del vencimiento','Cambia a Por vencer cuando falta menos de un día','Si pasa la hora de gracia, cambia a Vencido y empieza el recargo','Atiende reportes de falla y programa reemplazo'],
     rules:['Se puede extender si nadie reservó el equipo después','Una falla reportada el mismo día y sin mal uso no genera multa','Pasados 7 días de retraso sin contacto, se declara extraviado'],
     st:[['Alquiler','Por vencer / Vencido','warn'],['Equipo','En alquiler','warn']], hint:'Captura del aviso de vencimiento en el celular.'},
    {t:'Recogida e inspección', who:'Repartidor y encargado de bodega', time:'Recogida en la ventana; inspección en 24 horas',
     lead:'El repartidor recoge el equipo en la misma dirección y compara con las fotos de entrega. Luego el encargado lo revisa a fondo en el taller.',
     does:['Entrega el equipo completo y con accesorios','Presencia la revisión rápida del repartidor','Recibe el aviso si se encuentra daño'],
     sys:['Registra estado: Bueno, Regular, Dañado o Faltante, con fotos','Cambia equipos a En revisión','El encargado clasifica el daño: leve, moderado, grave o pérdida','Genera la multa y la liga a las fotos de evidencia'],
     rules:['El daño se compara siempre contra la foto de entrega','La clasificación final es del encargado, no del repartidor','El cliente recibe el detalle con las fotos'],
     st:[['Alquiler','En revisión','warn'],['Equipo','En revisión','warn']], hint:'Foto del equipo en el taller y captura de la pantalla de inspección.'},
    {t:'Cierre y liquidación', who:'Sistema y administrador', time:'Depósito devuelto en 5 días hábiles',
     lead:'Se suma todo: alquiler, recargos y multas. Se descuenta el depósito y se muestra el resultado final al cliente, que tiene 48 horas para disputarlo.',
     does:['Recibe el resumen final con el detalle de cobros','Recibe el reembolso del depósito, o paga la diferencia','Puede disputar un cobro en 48 horas'],
     sys:['Calcula el total final y aplica el depósito','Empresas: agrega la multa a la siguiente factura','Equipo vuelve a Disponible, o pasa a Mantenimiento o Baja','Cierra el alquiler y bloquea su edición'],
     rules:['Una disputa pausa el cobro hasta que el administrador resuelva','Un alquiler cerrado no se puede modificar, solo consultar','Los equipos se limpian y prueban antes de volver a Disponible'],
     st:[['Alquiler','Cerrado','mute'],['Equipo','Disponible','ok']], hint:'Captura del resumen final con depósito devuelto.'}
  ];

  /* $ devuelve un div suelto si el elemento no existe en esta página, así el mismo script sirve para todas */
  function $(id){ return document.getElementById(id) || document.createElement('div'); }
  function money(n){ return '$' + (Math.round(n*100)/100).toFixed(2); }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

  /* ---------- CATALOGO ---------- */
  $('catGrid').innerHTML = CATS.map(function(c){
    return '<article class="cat"><div class="body"><h3>'+esc(c.n)+'</h3><p class="range">'+c.r+'</p><p>'+esc(c.d)+'</p></div></article>';
  }).join('');
  $('eqTable').innerHTML = EQUIPOS.map(function(e){
    return '<tr><td class="strong">'+e.n+'</td><td>'+e.cat+'</td><td>'+money(e.t)+'</td><td>'+money(e.v)+'</td></tr>';
  }).join('');

  /* ---------- FLUJO ---------- */
  var cur = 0;
  var tabs = $('flowTabs'), panel = $('flowPanel');
  tabs.innerHTML = STEPS.map(function(s,i){
    return '<button class="ftab" role="tab" data-i="'+i+'"><b>Paso '+(i+1)+'</b>'+s.t+'</button>';
  }).join('');
  function li(arr){ return arr.map(function(x){return '<li>'+x+'</li>';}).join(''); }
  function renderFlow(i){
    cur = i; var s = STEPS[i];
    Array.prototype.forEach.call(tabs.children,function(b,idx){ b.setAttribute('aria-selected', idx===i ? 'true':'false'); });
    panel.innerHTML =
      '<div><h3>'+(i+1)+'. '+s.t+'</h3><p class="who">Actúa: '+s.who+'. Tiempo: '+s.time+'.</p><p class="lead">'+s.lead+'</p>' +
      '<div class="fgrid"><div class="fbox"><h4>Lo que hace el cliente</h4><ul>'+li(s.does)+'</ul></div>' +
      '<div class="fbox sys"><h4>Lo que hace el sistema</h4><ul>'+li(s.sys)+'</ul></div></div>' +
      '<div class="rules"><h4>Reglas de este paso</h4><ul>'+li(s.rules)+'</ul></div></div>' +
      '<div class="fside">' +
      '<div class="state-chip">'+s.st.map(function(x){return x[0]+': <span class="pill '+x[2]+'">'+x[1]+'</span>';}).join(' ')+'</div></div>';
    $('flowPrev').disabled = (i===0); $('flowNext').disabled = (i===STEPS.length-1);
    $('flowPrev').style.opacity = i===0 ? .45 : 1; $('flowNext').style.opacity = i===STEPS.length-1 ? .45 : 1;
  }
  tabs.addEventListener('click',function(e){ var b = e.target.closest('.ftab'); if(b) renderFlow(+b.dataset.i); });
  $('flowPrev').addEventListener('click',function(){ if(cur>0) renderFlow(cur-1); });
  $('flowNext').addEventListener('click',function(){ if(cur<STEPS.length-1) renderFlow(cur+1); });

  /* ---------- CALCULADORA ---------- */
  $('cEq').innerHTML = EQUIPOS.map(function(e){ return '<option value="'+e.id+'">'+e.n+' ('+money(e.t)+'/día)</option>'; }).join('');
  function num(id,min){ var v = parseInt($(id).value,10); if(isNaN(v)||v<min) v=min; return v; }
  function calc(){
    var corp = $('cType').value==='corp';
    var eq = EQUIPOS.filter(function(e){return e.id===$('cEq').value;})[0];
    var q = num('cQty',1), d = num('cDays',1), late = num('cLate',0), du = Math.min(num('cDmgU',0), q);
    var zone = parseFloat($('cZone').value), dmg = parseFloat($('cDmg').value);
    var maxQ = corp?25:3, maxD = corp?30:7, warns = [];
    if(q>maxQ) warns.push('Una cuenta '+(corp?'corporativa':'individual')+' permite hasta '+maxQ+' artículos a la vez.');
    if(d>maxD) warns.push('El plazo máximo es de '+maxD+' días. Para más tiempo se necesita aprobación.');
    if($('cDmgU').value>q) warns.push('Las unidades afectadas no pueden superar las unidades alquiladas; se ajustó a '+q+'.');
    if(dmg>0 && du===0) warns.push('Indica cuántas unidades tienen daño para calcular la multa.');
    var w = $('cWarn'); w.textContent = warns.join(' '); w.classList.toggle('show', warns.length>0);

    var base = eq.t*q*d;
    var rate = corp ? (q>=15?0.15:(q>=6?0.10:0)) : 0;
    var disc = base*rate;
    var ship = (corp && q>=10) ? 0 : zone;
    var dep = corp ? 0 : 0.30*eq.v*q;
    var pay1 = base - disc + ship + dep;
    var lateFee = eq.t*q*1.5*late;
    var dmgFee = dmg*eq.v*du;
    var fines = lateFee + dmgFee;

    var h = '<div class="stage">Al confirmar el alquiler</div>';
    h += '<div class="line"><span>Alquiler: '+q+' × '+money(eq.t)+' × '+d+' días</span><b>'+money(base)+'</b></div>';
    if(disc>0) h += '<div class="line neg"><span>Descuento por volumen ('+Math.round(rate*100)+'%)</span><b>−'+money(disc)+'</b></div>';
    h += '<div class="line"><span>Envío ida y vuelta'+((corp&&q>=10)?' (incluido desde 10 artículos)':'')+'</span><b>'+money(ship)+'</b></div>';
    if(!corp) h += '<div class="line"><span>Depósito reembolsable (30% del valor)</span><b>'+money(dep)+'</b></div>';
    else h += '<div class="line"><span>Depósito</span><b>No aplica: usa crédito</b></div>';
    h += '<div class="line total"><span>'+(corp?'Se carga a la factura':'Pagas hoy')+'</span><b>'+money(pay1)+'</b></div>';
    if(fines>0){
      h += '<div class="stage">Al devolver</div>';
      if(lateFee>0) h += '<div class="line fine"><span>Retraso: '+late+' día(s) al 150% de la tarifa</span><b>'+money(lateFee)+'</b></div>';
      if(dmgFee>0) h += '<div class="line fine"><span>Daño en '+du+' unidad(es)</span><b>'+money(dmgFee)+'</b></div>';
      h += '<div class="line"><span>Total de multas</span><b>'+money(fines)+'</b></div>';
      if(!corp){
        var refund = Math.max(0, dep-fines), extra = Math.max(0, fines-dep);
        if(extra>0) h += '<div class="line total"><span>Pagas la diferencia después del depósito</span><b>'+money(extra)+'</b></div>';
        else h += '<div class="line neg total"><span>Depósito que te devolvemos</span><b>'+money(refund)+'</b></div>';
      } else {
        h += '<div class="line total"><span>Se agrega a la siguiente factura</span><b>'+money(fines)+'</b></div>';
      }
    }
    $('cResult').innerHTML = h;
  }
  ['cType','cEq','cQty','cDays','cZone','cLate','cDmg','cDmgU'].forEach(function(id){
    $(id).addEventListener('input',calc); $(id).addEventListener('change',calc);
  });
  var PRESETS = {
    a:{cType:'ind',cEq:'lap',cQty:1,cDays:3,cZone:'3',cLate:0,cDmg:'0',cDmgU:0},
    b:{cType:'corp',cEq:'rou',cQty:8,cDays:10,cZone:'5',cLate:0,cDmg:'0',cDmgU:0},
    c:{cType:'ind',cEq:'pro',cQty:1,cDays:2,cZone:'5',cLate:2,cDmg:'0.35',cDmgU:1}
  };
  document.querySelectorAll('[data-preset]').forEach(function(b){
    b.addEventListener('click',function(){
      var p = PRESETS[b.dataset.preset];
      Object.keys(p).forEach(function(k){ $(k).value = p[k]; });
      calc();
    });
  });
  if(document.getElementById('calc')) calc();

  /* ---------- CHECKLIST ---------- */
  var checks = document.querySelectorAll('#checkBox input[type=checkbox]');
  function updCheck(){
    var n = 0; checks.forEach(function(c){ if(c.checked) n++; });
    $('checkProg').textContent = n===checks.length
      ? 'Todo listo. La entrega firmada inicia el conteo del alquiler.'
      : n+' de '+checks.length+' pasos listos. La entrega firmada es lo que inicia el conteo del alquiler.';
  }
  checks.forEach(function(c){ c.addEventListener('change',updCheck); });

  /* ---------- PANEL ---------- */
  var ROWS = [
    {id:'AL-1051', cl:'Empresa', who:'Redes del Valle S.A.', eq:'8 × Router / punto de acceso', z:'Zona 2', st:'Entrega', lbl:'Entrega hoy', cls:'info', m:'$437.00', det:'Entrega 8:00 a 12:00 · Repartidor: M. Cruz · Contrato marco vigente · Se carga a crédito'},
    {id:'AL-1052', cl:'Persona', who:'S. Aguilar', eq:'1 × Laptop', z:'Zona 1', st:'Entrega', lbl:'Entrega hoy', cls:'info', m:'$228.00', det:'Entrega 13:00 a 17:00 · Repartidor: J. Mejía · Depósito de $180.00 pagado'},
    {id:'AL-1044', cl:'Persona', who:'K. Ramírez', eq:'1 × Tester de cable Cat6', z:'Zona 1', st:'Recogida', lbl:'Recogida hoy', cls:'warn', m:'$15.00', det:'Recogida 8:00 a 12:00 · Inspección programada para mañana'},
    {id:'AL-1039', cl:'Empresa', who:'Constructora Oriente', eq:'3 × Taladro inalámbrico', z:'Zona 3', st:'Recogida', lbl:'Recogida hoy', cls:'warn', m:'$278.00', det:'Recogida 13:00 a 17:00 · Pedido cerrado por 10 días de alquiler'},
    {id:'AL-1033', cl:'Persona', who:'R. Ortiz', eq:'1 × Proyector', z:'Zona 2', st:'Vencido', lbl:'Vencido hace 2 días', cls:'bad', m:'$75.00', det:'Venció el lunes · Recargo acumulado: $75.00 (2 días al 150%) · Se contactó por teléfono'},
    {id:'AL-1029', cl:'Empresa', who:'Eventos Cuscatlán', eq:'2 × Proyector', z:'Zona 1', st:'Multa', lbl:'Multa por daño', cls:'bad', m:'$157.50', det:'Daño moderado en 1 unidad (35% de $450 = $157.50) · En disputa, el cliente tiene 48 horas'},
    {id:'AL-1048', cl:'Persona', who:'J. Pérez', eq:'1 × Multímetro digital', z:'Zona 2', st:'Multa', lbl:'Multa por daño', cls:'warn', m:'$4.50', det:'Daño leve (10% de $45) · Se descuenta del depósito de $13.50'}
  ];
  var dFilter = 'all';
  function renderRows(){
    var b = $('dBody'); b.innerHTML = '';
    ROWS.forEach(function(r){
      if(dFilter!=='all' && r.st!==dFilter) return;
      var tr = document.createElement('tr');
      tr.innerHTML = '<td class="strong">'+r.id+'</td><td>'+r.who+' <span class="pill mute">'+r.cl+'</span></td><td>'+r.eq+'</td><td>'+r.z+'</td><td><span class="pill '+r.cls+'">'+r.lbl+'</span></td><td>'+r.m+'</td>';
      tr.addEventListener('click',function(){
        var nx = tr.nextElementSibling;
        if(nx && nx.classList.contains('detail')){ nx.remove(); return; }
        document.querySelectorAll('#dBody .detail').forEach(function(d){d.remove();});
        var d = document.createElement('tr'); d.className = 'detail';
        d.innerHTML = '<td colspan="6">'+r.det+'</td>';
        tr.after(d);
      });
      b.appendChild(tr);
    });
    if(!b.children.length) b.innerHTML = '<tr><td colspan="6">No hay alquileres en este filtro.</td></tr>';
  }
  function setFilter(f){
    dFilter = f;
    document.querySelectorAll('#dFilters .chipbtn').forEach(function(c){ c.classList.toggle('on', c.dataset.f===f); });
    renderRows();
  }
  document.querySelectorAll('#dFilters .chipbtn').forEach(function(c){ c.addEventListener('click',function(){ setFilter(c.dataset.f); }); });
  document.querySelectorAll('.dstat').forEach(function(c){ c.addEventListener('click',function(){ setFilter(c.dataset.f); }); });
  renderRows();

  /* ---------- INIT ---------- */
  renderFlow(0);
})();
