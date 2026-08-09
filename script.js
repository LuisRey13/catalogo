(() => {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  // ---- elements ----
  const emptyState  = document.getElementById('emptyState');
  const bookEl      = document.getElementById('book');
  const controls    = document.getElementById('controls');
  const searchToggle= document.getElementById('searchToggle');

  const pageViewport = document.getElementById('pageViewport');
  const canvasBottom  = document.getElementById('canvasBottom');
  const pageFlip       = document.getElementById('pageFlip');
  const canvasTop       = document.getElementById('canvasTop');
  const flipShade       = document.getElementById('flipShade');

  const hitLeft  = document.getElementById('hitLeft');
  const hitRight = document.getElementById('hitRight');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const dial       = document.getElementById('dial');
  const dialFace   = document.getElementById('dialFace');
  const dialPanel  = document.getElementById('dialPanel');
  const pageIndicator = document.getElementById('pageIndicator');
  const pageTotal      = document.getElementById('pageTotal');
  const pageSlider     = document.getElementById('pageSlider');
  const pageInput      = document.getElementById('pageInput');
  const goBtn          = document.getElementById('goBtn');

  const edgeLeft  = document.getElementById('edgeLeft');
  const edgeRight = document.getElementById('edgeRight');

  // ---- state ----
  let pdfDoc = null;
  let numPages = 0;
  let currentPage = 1;
  let isFlipping = false;
  let renderToken = 0;

  // =========================================================
  // Carga del PDF: viene embebido como base64 en pdf-data.js,
  // así que no depende de fetch, servidor, ni protocolo (file:// o https).
  // =========================================================

  function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  }

  async function loadEmbeddedPdf() {
    try {
      const bytes = base64ToUint8Array(PDF_BASE64);
      const task = pdfjsLib.getDocument({ data: bytes });
      const doc = await task.promise;
      await onPdfLoaded(doc);
    } catch (err) {
      console.error('No se pudo cargar el catálogo:', err);
    }
  }

  async function onPdfLoaded(doc) {
    pdfDoc = doc;
    numPages = doc.numPages;
    currentPage = 1;

    const firstPage = await pdfDoc.getPage(1);
    const vp = firstPage.getViewport({ scale: 1 });
    document.documentElement.style.setProperty('--page-aspect', vp.width / vp.height);

    resetFlipLayer();
    await renderInto(canvasTop, 1);

    pageTotal.textContent = numPages;
    pageIndicator.textContent = 1;
    pageSlider.max = numPages;
    pageSlider.value = 1;
    pageInput.max = numPages;
    pageInput.value = 1;

    showBook();
    updateEdges();
    updateNavState();
  }

  function showBook() {
    emptyState.hidden = true;
    bookEl.hidden = false;
    controls.hidden = false;
    searchToggle.hidden = false;
  }

  function resetFlipLayer() {
    pageFlip.style.transition = 'none';
    pageFlip.style.transform = 'rotateY(0deg)';
    flipShade.style.opacity = '0';
    void pageFlip.offsetWidth;
    pageFlip.style.transition = '';
  }

  // ---- rendering ----
  async function renderInto(canvas, pageNum) {
    const myToken = ++renderToken;
    const page = await pdfDoc.getPage(pageNum);
    const rect = pageViewport.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = (rect.width / baseViewport.width) * dpr;
    const viewport = page.getViewport({ scale });

    if (myToken !== renderToken) return;

    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;
  }

  // ---- navigation ----
  function updateNavState() {
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= numPages;
    hitLeft.disabled = currentPage <= 1;
    hitRight.disabled = currentPage >= numPages;
  }

  function updateEdges() {
    const progress = numPages > 1 ? (currentPage - 1) / (numPages - 1) : 0;
    const maxW = 10;
    edgeLeft.style.width = Math.max(2, progress * maxW) + 'px';
    edgeRight.style.width = Math.max(2, (1 - progress) * maxW) + 'px';
  }

  async function goToPage(target) {
    if (isFlipping || !pdfDoc) return;
    target = Math.min(Math.max(1, Math.round(target)), numPages);
    if (target === currentPage) return;

    const forward = target > currentPage;
    isFlipping = true;
    updateNavState();

    await renderInto(canvasBottom, target);
    await renderInto(canvasTop, currentPage);

    pageFlip.style.transformOrigin = forward ? 'left center' : 'right center';
    const toDeg = forward ? -170 : 170;

    const rotateAnim = pageFlip.animate(
      [{ transform: 'rotateY(0deg)' }, { transform: `rotateY(${toDeg}deg)` }],
      { duration: 680, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'forwards' }
    );
    flipShade.animate(
      [{ opacity: 0 }, { opacity: 0.6, offset: 0.55 }, { opacity: 0 }],
      { duration: 680, easing: 'ease-in-out' }
    );

    await rotateAnim.finished;

    currentPage = target;
    await renderInto(canvasTop, currentPage);
    resetFlipLayer();

    pageIndicator.textContent = currentPage;
    pageSlider.value = currentPage;
    pageInput.value = currentPage;
    updateEdges();
    updateNavState();
    isFlipping = false;
  }

  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
  hitLeft.addEventListener('click', () => goToPage(currentPage - 1));
  hitRight.addEventListener('click', () => goToPage(currentPage + 1));

  document.addEventListener('keydown', (e) => {
    if (bookEl.hidden) return;
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
    if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
    if (e.key === 'Escape') { closeDial(); closeDrawer(); }
  });

  // ---- dial / selector de página ----
  function openDial() {
    dialPanel.hidden = false;
    dialFace.setAttribute('aria-expanded', 'true');
    pageSlider.value = currentPage;
    pageInput.value = currentPage;
  }
  function closeDial() {
    dialPanel.hidden = true;
    dialFace.setAttribute('aria-expanded', 'false');
  }
  dialFace.addEventListener('click', (e) => {
    e.stopPropagation();
    dialPanel.hidden ? openDial() : closeDial();
  });
  document.addEventListener('click', (e) => {
    if (!dial.contains(e.target)) closeDial();
  });
  dialPanel.addEventListener('click', (e) => e.stopPropagation());

  pageSlider.addEventListener('input', () => { pageInput.value = pageSlider.value; });
  pageInput.addEventListener('input', () => { pageSlider.value = pageInput.value; });
  goBtn.addEventListener('click', () => { goToPage(Number(pageInput.value)); closeDial(); });
  pageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { goToPage(Number(pageInput.value)); closeDial(); }
  });

  // ---- resize ----
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (!pdfDoc || isFlipping) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => renderInto(canvasTop, currentPage), 150);
  });

  // ---- gestos táctiles: deslizar para hojear en celular ----
  let touchStartX = null;
  let touchStartY = null;

  pageViewport.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }, { passive: true });

  pageViewport.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    touchStartX = null;
    touchStartY = null;

    const SWIPE_THRESHOLD = 45;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy) * 1.3) return;

    if (dx < 0) goToPage(currentPage + 1); // deslizar a la izquierda = siguiente página
    else goToPage(currentPage - 1);        // deslizar a la derecha = página anterior
  }, { passive: true });

  // =========================================================
  // Fichero / buscador
  // =========================================================

  const catalogDrawer  = document.getElementById('catalogDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerClose    = document.getElementById('drawerClose');
  const drawerChips    = document.getElementById('drawerChips');
  const priceMinInput  = document.getElementById('priceMin');
  const priceMaxInput  = document.getElementById('priceMax');
  const drawerResults  = document.getElementById('drawerResults');
  const searchInput    = document.getElementById('searchInput');

  const CATEGORIES = ['Todos', 'Vestidos', 'Faldas', 'Trajes', 'Accesorios', 'Destacados'];
  let activeCategory = 'Todos';

  function parsePriceRange(item) {
    if (!item.price) return null;
    const nums = (item.price.match(/\d[\d,]*/g) || []).map((n) => parseFloat(n.replace(/,/g, '')));
    if (!nums.length) return null;
    return { min: Math.min(...nums), max: Math.max(...nums) };
  }

  function currentPriceFilter() {
    const min = priceMinInput.value !== '' ? parseFloat(priceMinInput.value) : null;
    const max = priceMaxInput.value !== '' ? parseFloat(priceMaxInput.value) : null;
    return { min, max };
  }

  function priceMatches(item, filter) {
    if (filter.min === null && filter.max === null) return true;
    const range = parsePriceRange(item);
    if (!range) return false; // sin precio numérico: se excluye si hay un rango específico activo
    if (filter.min !== null && range.max < filter.min) return false;
    if (filter.max !== null && range.min > filter.max) return false;
    return true;
  }

  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function buildChips() {
    drawerChips.innerHTML = '';
    CATEGORIES.forEach((cat) => {
      const chip = document.createElement('button');
      chip.className = 'chip' + (cat === activeCategory ? ' active' : '');
      chip.textContent = cat;
      chip.addEventListener('click', () => {
        activeCategory = cat;
        buildChips();
        renderResults();
      });
      drawerChips.appendChild(chip);
    });
  }

  function matches(item, query, priceFilter) {
    if (activeCategory !== 'Todos' && item.category !== activeCategory) return false;
    if (!priceMatches(item, priceFilter)) return false;
    if (!query) return true;
    const haystack = normalize(
      [item.title, item.category, item.note, item.price, ...(item.tags || [])].join(' ')
    );
    return haystack.includes(query);
  }

  function makeCard(item) {
    const card = document.createElement('button');
    card.className = 'index-card';
    card.innerHTML = `
      <div class="index-card-top">
        <span>${item.category}</span>
        <span>Pág. ${item.page}</span>
      </div>
      <div class="index-card-title">${item.title}</div>
      ${item.price ? `<div class="index-card-price">${item.price}</div>` : ''}
      ${item.note ? `<div class="index-card-note">${item.note}</div>` : ''}
    `;
    card.addEventListener('click', () => {
      closeDrawer();
      goToPage(item.page);
    });
    return card;
  }

  function randomSuggestions(count) {
    const pool = [...CATALOG_INDEX];
    const picked = [];
    while (picked.length < count && pool.length) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }
    return picked;
  }

  function renderResults() {
    const query = normalize(searchInput.value.trim());
    const priceFilter = currentPriceFilter();
    drawerResults.innerHTML = '';

    if (!query && activeCategory === 'Todos' && priceFilter.min === null && priceFilter.max === null) {
      const hint = document.createElement('div');
      hint.className = 'drawer-hint';
      hint.innerHTML = '<span>¿No sabes qué buscar? Prueba con…</span>';
      const refreshBtn = document.createElement('button');
      refreshBtn.textContent = '⟳';
      refreshBtn.title = 'Otras ideas';
      refreshBtn.addEventListener('click', renderResults);
      hint.appendChild(refreshBtn);
      drawerResults.appendChild(hint);
      randomSuggestions(5).forEach((item) => drawerResults.appendChild(makeCard(item)));
      return;
    }

    const results = CATALOG_INDEX.filter((item) => matches(item, query, priceFilter));

    if (!results.length) {
      const empty = document.createElement('div');
      empty.className = 'no-results';
      empty.textContent = `No encontramos nada con esos filtros. Prueba ajustando la búsqueda o el precio.`;
      drawerResults.appendChild(empty);
      return;
    }

    results.forEach((item) => drawerResults.appendChild(makeCard(item)));
  }

  function openDrawer() {
    catalogDrawer.hidden = false;
    searchInput.value = '';
    activeCategory = 'Todos';
    priceMinInput.value = '';
    priceMaxInput.value = '';
    buildChips();
    renderResults();
    setTimeout(() => searchInput.focus(), 50);
  }
  function closeDrawer() {
    catalogDrawer.hidden = true;
  }

  searchToggle.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);
  searchInput.addEventListener('input', renderResults);
  priceMinInput.addEventListener('input', renderResults);
  priceMaxInput.addEventListener('input', renderResults);

  // =========================================================
  // Medidas anti-copia (nivel "buena fe", no bloquean capturas
  // del sistema operativo, cámaras, ni grabación de pantalla)
  // =========================================================

  function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showToast('Acción deshabilitada en este catálogo');
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'CANVAS' || e.target.tagName === 'IMG') e.preventDefault();
  });

  document.addEventListener('keydown', (e) => {
    const k = (e.key || '').toLowerCase();
    const blockedCombo = (e.ctrlKey || e.metaKey) && ['s', 'p', 'u', 'c'].includes(k);
    const blockedDevtools = e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(k));
    if (blockedCombo || blockedDevtools) {
      e.preventDefault();
      showToast('Acción deshabilitada en este catálogo');
    }
  });

  // Best-effort: difumina el contenido si la ventana pierde el foco
  function setPrivacyBlur(active) {
    document.body.classList.toggle('privacy-blur', active);
  }
  window.addEventListener('blur', () => setPrivacyBlur(true));
  window.addEventListener('focus', () => setPrivacyBlur(false));
  document.addEventListener('visibilitychange', () => setPrivacyBlur(document.hidden));

  // Best-effort: aviso al detectar Impr Pant (no borra capturas ya guardadas en disco)
  document.addEventListener('keyup', async (e) => {
    if (e.key === 'PrintScreen') {
      showToast('Este contenido es solo para vista previa');
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText('');
        }
      } catch (_) { /* algunos navegadores no lo permiten; se ignora */ }
    }
  });

  // ---- init ----
  loadEmbeddedPdf();
})();
