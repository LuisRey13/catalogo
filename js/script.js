/* =========================================================================
   Koala Kids — Visor de catálogo tipo libro (flipbook)
   - Renderiza catalogo.pdf con PDF.js (cargado desde CDN en index.html)
   - Efecto de hoja al pasar página + salto rápido a páginas lejanas
   - Buscador de productos con filtros (nombre, categoría, rango de precio)
   ========================================================================= */

(() => {
  "use strict";

  /* ----------------------------------------------------------------------
     1) DATOS DE PRODUCTOS
     Extraídos manualmente del contenido de catalogo.pdf.
     price: {min, max} en pesos. Si un producto no tiene precio fijo en el
     PDF, price es null y se muestra "Precio a consultar".
     page: número de página del PDF donde aparece el producto.
  ---------------------------------------------------------------------- */
  const PRODUCTS = [
    // Faldas
    { name: "Faldas lisas", category: "Faldas", price: { min: 220, max: 235 }, page: 3 },
    { name: "Faldas floreadas", category: "Faldas", price: { min: 185, max: 220 }, page: 3 },
    { name: "Falda de china poblana", category: "Faldas", price: { min: 215, max: 265 }, page: 8 },
    { name: "Falda doble vuelo", category: "Faldas", price: { min: 360, max: 400 }, page: 11 },

    // Vestidos
    { name: "Vestido de Veracruz", category: "Vestidos", price: { min: 300, max: 325 }, page: 4 },
    { name: "Vestido Nuevo León", category: "Vestidos", price: { min: 295, max: 310 }, page: 4 },
    { name: "Vestido de la Piña", category: "Vestidos", price: { min: 290, max: 320 }, page: 4 },
    { name: "Vestido de Aguascalientes", category: "Vestidos", price: { min: 390, max: 390 }, page: 4 },
    { name: "Vestido de Jalisco", category: "Vestidos", price: { min: 290, max: 530 }, page: 5 },
    { name: "Vestido floreado Adelitas", category: "Vestidos", price: { min: 270, max: 270 }, page: 6 },
    { name: "Vestido Adelitas", category: "Vestidos", price: { min: 350, max: 400 }, page: 6 },
    { name: "Vestido de Colima", category: "Vestidos", price: { min: 310, max: 335 }, page: 7 },
    { name: "Vestido Azteca (incluye penacho)", category: "Vestidos", price: { min: 300, max: 300 }, page: 7 },
    { name: "Vestido de Nayarit", category: "Vestidos", price: { min: 340, max: 340 }, page: 7 },
    { name: "Vestido Yucateco", category: "Vestidos", price: { min: 290, max: 320 }, page: 7 },
    { name: "Vestido de Chiapas", category: "Vestidos", price: { min: 290, max: 290 }, page: 8 },
    { name: "Vestido de Chiapas bordado", category: "Vestidos", price: { min: 650, max: 2500 }, page: 9 },
    { name: "Vestido Jalisco Gala", category: "Vestidos", price: { min: 660, max: 3000 }, page: 9 },

    // Trajes
    { name: "Traje de manta (manga corta o larga)", category: "Trajes", price: { min: 160, max: 210 }, page: 5 },
    { name: "Manta niño (incluye camisa y pantalón)", category: "Trajes", price: { min: 160, max: 210 }, page: 6 },
    { name: "Vestimenta de charro niño (por pedido)", category: "Trajes", price: { min: 535, max: 870 }, page: 6 },
    { name: "Traje de Veracruz", category: "Trajes", price: { min: 370, max: 450 }, page: 8 },
    { name: "Traje de charro niña (por pedido)", category: "Trajes", price: { min: 535, max: 870 }, page: 8 },
    { name: "Manta bordada", category: "Trajes", price: { min: 235, max: 265 }, page: 9 },
    { name: "Escaramuza", category: "Trajes", price: { min: 660, max: 760 }, page: 9 },
    { name: "Traje de charro (adulto)", category: "Trajes", price: { min: 360, max: 370 }, page: 11 },

    // Camisas
    { name: "Camisa Pachuqueña", category: "Camisas", price: { min: 185, max: 195 }, page: 10 },
    { name: "Camisa de gallos", category: "Camisas", price: { min: 230, max: 250 }, page: 10 },
    { name: "Camisa de caballos", category: "Camisas", price: { min: 230, max: 300 }, page: 10 },
    { name: "Camisa Tricolor", category: "Camisas", price: { min: 230, max: 300 }, page: 10 },

    // Blusas y otros (sueltos)
    { name: "Blusa de olanes", category: "Accesorios", price: { min: 130, max: 170 }, page: 11 },
    { name: "Tutú patrio", category: "Accesorios", price: { min: 145, max: 195 }, page: 11 },
    { name: "Blusa con listón manga larga", category: "Accesorios", price: { min: 190, max: 190 }, page: 18 },

    // Personajes — niño/a
    { name: "Miguel Hidalgo (niño)", category: "Personajes", price: { min: 250, max: 250 }, page: 12 },
    { name: "Josefa Ortíz de Domínguez (niña)", category: "Personajes", price: { min: 250, max: 250 }, page: 12 },
    { name: "Vicente Guerrero (niño)", category: "Personajes", price: { min: 250, max: 290 }, page: 12 },
    { name: "Allende (niño)", category: "Personajes", price: { min: 250, max: 250 }, page: 12 },
    { name: "Niños héroes", category: "Personajes", price: { min: 250, max: 280 }, page: 13 },
    { name: "Aldama (niño)", category: "Personajes", price: { min: 250, max: 280 }, page: 13 },
    { name: "Porfirio Díaz (niño)", category: "Personajes", price: { min: 260, max: 290 }, page: 13 },
    { name: "Morelos (niño)", category: "Personajes", price: { min: 250, max: 250 }, page: 13 },
    { name: "Iturbide (niño)", category: "Personajes", price: { min: 250, max: 250 }, page: 13 },
    { name: "Cadete (niño)", category: "Personajes", price: { min: 250, max: 280 }, page: 13 },

    // Personajes — adulto
    { name: "Miguel Hidalgo (adulto)", category: "Personajes", price: { min: 290, max: 430 }, page: 14 },
    { name: "Morelos (adulto)", category: "Personajes", price: { min: 430, max: 430 }, page: 14 },
    { name: "Allende (adulto)", category: "Personajes", price: { min: 430, max: 430 }, page: 14 },
    { name: "Cadete (adulto)", category: "Personajes", price: { min: 290, max: 290 }, page: 14 },
    { name: "Porfirio Díaz (adulto)", category: "Personajes", price: { min: 300, max: 300 }, page: 15 },
    { name: "Vicente Guerrero (adulto)", category: "Personajes", price: { min: 290, max: 290 }, page: 15 },
    { name: "Niño héroe (adulto)", category: "Personajes", price: { min: 290, max: 290 }, page: 15 },
    { name: "Aldama (adulto)", category: "Personajes", price: { min: 290, max: 290 }, page: 15 },

    // Accesorios
    { name: "Sombrero de paja", category: "Accesorios", price: { min: 100, max: 100 }, page: 16 },
    { name: "Caballito (calidad premium, con sonido)", category: "Accesorios", price: { min: 140, max: 180 }, page: 16 },
    { name: "Sombrero texano", category: "Accesorios", price: { min: 130, max: 160 }, page: 16 },
    { name: "Pompones tricolor (par)", category: "Accesorios", price: { min: 100, max: 100 }, page: 16 },
    { name: "Sombrero Allende", category: "Accesorios", price: { min: 100, max: 100 }, page: 16 },
    { name: "Pompones de color (par)", category: "Accesorios", price: { min: 80, max: 100 }, page: 16 },
    { name: "Sombrero de viejito", category: "Accesorios", price: { min: 100, max: 100 }, page: 16 },
    { name: "Banda presidencial", category: "Accesorios", price: { min: 120, max: 120 }, page: 16 },
    { name: "Sombrero de charro sencillo", category: "Accesorios", price: { min: 160, max: 210 }, page: 17 },
    { name: "Sombrero de charro (calidad premium)", category: "Accesorios", price: { min: 260, max: 350 }, page: 17 },
    { name: "Sombrero 4 piedras", category: "Accesorios", price: { min: 120, max: 140 }, page: 17 },
    { name: "Rifle", category: "Accesorios", price: { min: 80, max: 80 }, page: 17 },
    { name: "Sombrero caporal", category: "Accesorios", price: { min: 180, max: 180 }, page: 17 },
    { name: "Sombrero de paja (charro)", category: "Accesorios", price: { min: 100, max: 100 }, page: 17 },
    { name: "Fajilla roja para cintura", category: "Accesorios", price: { min: 50, max: 50 }, page: 17 },
    { name: "Moño rojo/tricolor para charro", category: "Accesorios", price: { min: 85, max: 85 }, page: 17 },
    { name: "Peluca de Miguel Hidalgo", category: "Accesorios", price: { min: 80, max: 80 }, page: 18 },
    { name: "Carrilleras", category: "Accesorios", price: { min: 80, max: 150 }, page: 18 },
    { name: "Espadas", category: "Accesorios", price: { min: 110, max: 120 }, page: 18 },
    { name: "Rebozos", category: "Accesorios", price: { min: 120, max: 150 }, page: 18 },
    { name: "Peineta bailable Veracruz", category: "Accesorios", price: { min: 80, max: 80 }, page: 18 },
    { name: "Paliacates (docena)", category: "Accesorios", price: { min: 40, max: 260 }, page: 18 },
    { name: "Trenzas", category: "Accesorios", price: { min: 80, max: 80 }, page: 18 },
    { name: "Sombrero revolucionario", category: "Accesorios", price: { min: 100, max: 120 }, page: 19 },
    { name: "Huaraches", category: "Accesorios", price: { min: 150, max: 180 }, page: 19 },
    { name: "Machetes", category: "Accesorios", price: { min: 49, max: 49 }, page: 19 },
    { name: "Peinetas", category: "Accesorios", price: { min: 85, max: 85 }, page: 19 },
    { name: "Trenza completa", category: "Accesorios", price: { min: 190, max: 190 }, page: 19 },
    { name: "Abanicos", category: "Accesorios", price: { min: 80, max: 80 }, page: 19 },
    { name: "Bigotes", category: "Accesorios", price: null, page: 19 },
    { name: "Collares", category: "Accesorios", price: { min: 20, max: 20 }, page: 19 },
    { name: "Barbas", category: "Accesorios", price: null, page: 19 },

    // Promoción Patria
    { name: "Blusa de olanes con falda floreada", category: "Promoción Patria", price: { min: 340, max: 350 }, page: 20 },
    { name: "Blusa de olanes con falda lisa", category: "Promoción Patria", price: { min: 340, max: 350 }, page: 20 },
    { name: "Blusa de listón con falda lisa", category: "Promoción Patria", price: { min: 390, max: 410 }, page: 21 },
    { name: "Blusa de listón con falda floreada", category: "Promoción Patria", price: { min: 360, max: 380 }, page: 22 },
    { name: "Blusa bordada con falda lisa/floreada", category: "Promoción Patria", price: { min: 360, max: 380 }, page: 22 },
    { name: "Camisa de gallo/caballo, faja, pantalón caporal negro", category: "Promoción Patria", price: null, page: 23 },
    { name: "Camisa de gallo/caballo, faja, pantalón caporal rayas", category: "Promoción Patria", price: null, page: 23 },
    { name: "Camisa pachuqueña, faja, pantalón caporal negro", category: "Promoción Patria", price: null, page: 24 },
    { name: "Camisa pachuqueña, faja, pantalón caporal rayas", category: "Promoción Patria", price: null, page: 24 },
    { name: "Pantalón caporal negro", category: "Promoción Patria", price: { min: 200, max: 240 }, page: 24 },
    { name: "Pantalón caporal rayas", category: "Promoción Patria", price: { min: 210, max: 300 }, page: 24 },
  ];

  /* ----------------------------------------------------------------------
     2) CONFIGURACIÓN GENERAL
  ---------------------------------------------------------------------- */
  const PDF_URL = "catalogo.pdf";
  const PDFJS_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const ADJACENT_FLIP_MS = 850;   // debe coincidir con la transición CSS de .page
  const JUMP_FADE_MS = 180;       // salto rápido a página lejana

  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
  }

  /* ----------------------------------------------------------------------
     3) ESTADO
  ---------------------------------------------------------------------- */
  const state = {
    numPages: 0,
    currentPage: 1,       // 1-based
    pageEls: [],           // divs .page, índice 0 = página 1
    isAnimating: false,
    pdfDoc: null,
  };

  /* ----------------------------------------------------------------------
     4) REFERENCIAS DOM
  ---------------------------------------------------------------------- */
  const bookEl = document.getElementById("book");
  const bookStageEl = document.getElementById("bookStage");
  const bookLoadingEl = document.getElementById("bookLoading");
  const loadingTextEl = document.getElementById("loadingText");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pillPrev = document.getElementById("pillPrev");
  const pillNext = document.getElementById("pillNext");
  const pageInput = document.getElementById("pageInput");
  const pageTotalEl = document.getElementById("pageTotal");
  const clickLeft = document.getElementById("clickLeft");
  const clickRight = document.getElementById("clickRight");

  const openSearchBtn = document.getElementById("openSearchBtn");
  const drawerEl = document.getElementById("drawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawerClose = document.getElementById("drawerClose");
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  const priceMinInput = document.getElementById("priceMinInput");
  const priceMaxInput = document.getElementById("priceMaxInput");
  const rangeMin = document.getElementById("rangeMin");
  const rangeMax = document.getElementById("rangeMax");
  const rangeFill = document.getElementById("rangeFill");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  const resultsCountEl = document.getElementById("resultsCount");
  const resultsListEl = document.getElementById("resultsList");

  /* ----------------------------------------------------------------------
     5) CARGA Y RENDERIZADO DEL PDF
  ---------------------------------------------------------------------- */
  async function initBook() {
    if (!window.pdfjsLib) {
      showBookError(
        "No se pudo cargar la librería PDF.js.",
        "Revisa tu conexión a internet: PDF.js se carga desde un CDN público la primera vez que abres la página."
      );
      return;
    }

    let pdf;
    try {
      pdf = await window.pdfjsLib.getDocument(PDF_URL).promise;
    } catch (err) {
      showBookError(
        "No se pudo abrir catalogo.pdf.",
        "Si abriste este archivo con doble clic (protocolo file://), el navegador bloquea la lectura por seguridad. " +
        "Abre este proyecto desde un servidor local, por ejemplo ejecutando:\n\npython3 -m http.server\n\ny visitando http://localhost:8000, " +
        "o súbelo a tu hosting real.",
        err
      );
      return;
    }

    state.pdfDoc = pdf;
    state.numPages = pdf.numPages;
    pageTotalEl.textContent = String(state.numPages);
    pageInput.value = "1";

    // Aspecto del libro calculado dinámicamente a partir de la página 1
    const firstPage = await pdf.getPage(1);
    const firstViewport = firstPage.getViewport({ scale: 1 });
    const aspect = firstViewport.width / firstViewport.height;
    bookEl.style.setProperty("--ar", aspect.toFixed(4));

    // Crear un <div class="page"> por cada página del PDF
    for (let i = 1; i <= state.numPages; i++) {
      const pageEl = document.createElement("div");
      pageEl.className = "page";
      pageEl.dataset.page = String(i);

      const canvas = document.createElement("canvas");
      pageEl.appendChild(canvas);

      const shade = document.createElement("div");
      shade.className = "shade";
      pageEl.appendChild(shade);

      bookEl.appendChild(pageEl);
      state.pageEls.push(pageEl);
    }

    applyStackOrder(false);

    // Renderizar cada página en su canvas, mostrando progreso
    for (let i = 1; i <= state.numPages; i++) {
      loadingTextEl.textContent = `Cargando catálogo… ${i}/${state.numPages}`;
      try {
        await renderPage(i);
      } catch (err) {
        showBookError(
          "Ocurrió un error al dibujar una página del catálogo.",
          "Intenta recargar la página. Si el problema continúa, verifica que catalogo.pdf no esté dañado.",
          err
        );
        return;
      }
    }

    if (bookLoadingEl) bookLoadingEl.remove();
  }

  async function renderPage(pageNumber) {
    const page = await state.pdfDoc.getPage(pageNumber);
    const pageEl = state.pageEls[pageNumber - 1];
    const canvas = pageEl.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    // Tamaño real en pantalla del contenedor del libro
    const cssWidth = bookEl.clientWidth || bookStageEl.clientWidth;
    const baseViewport = page.getViewport({ scale: 1 });
    const cssScale = cssWidth / baseViewport.width;
    const pixelRatio = window.devicePixelRatio || 1;
    const renderScale = cssScale * pixelRatio;
    const viewport = page.getViewport({ scale: renderScale || 1 });

    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));

    await page.render({ canvasContext: ctx, viewport }).promise;
  }

  function showBookError(title, message, err) {
    if (bookLoadingEl) bookLoadingEl.remove();
    const existing = bookEl.querySelector(".book-error");
    if (existing) existing.remove();

    const box = document.createElement("div");
    box.className = "book-error";
    box.innerHTML = `
      <p class="book-error-title">${escapeHtml(title)}</p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      ${err ? `<span class="book-error-detail-label">Detalle técnico</span>
      <pre class="book-error-detail">${escapeHtml(String(err && err.message ? err.message : err))}</pre>` : ""}
    `;
    bookEl.appendChild(box);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ----------------------------------------------------------------------
     6) ORDEN DE APILADO (z-index) DE LAS HOJAS
  ---------------------------------------------------------------------- */
  function applyStackOrder(animated) {
    const n = state.numPages;
    const current = state.currentPage;

    state.pageEls.forEach((el, idx) => {
      const p = idx + 1;
      const flipped = p < current;

      if (!animated) el.classList.add("no-anim");
      el.style.transform = `rotateY(${flipped ? -180 : 0}deg)`;
      el.style.zIndex = String(flipped ? p : n - p + 1);

      if (!animated) {
        // forzar reflow antes de quitar no-anim para que no anime el estado inicial
        void el.offsetWidth;
        el.classList.remove("no-anim");
      }
    });
  }

  /* ----------------------------------------------------------------------
     7) NAVEGACIÓN: volteo adyacente vs. salto rápido
  ---------------------------------------------------------------------- */
  function goToPage(target) {
    target = Math.max(1, Math.min(state.numPages || 1, target));
    if (!state.numPages || state.isAnimating || target === state.currentPage) {
      syncPageInput();
      return;
    }

    const diff = target - state.currentPage;

    if (Math.abs(diff) === 1) {
      flipAdjacent(diff > 0 ? "forward" : "backward");
    } else {
      jumpTo(target);
    }
  }

  function flipAdjacent(direction) {
    state.isAnimating = true;
    const n = state.numPages;

    let flippingEl;
    if (direction === "forward") {
      flippingEl = state.pageEls[state.currentPage - 1]; // hoja actual, gira hacia -180
    } else {
      flippingEl = state.pageEls[state.currentPage - 2]; // hoja anterior, regresa a 0
    }

    flippingEl.style.zIndex = String(n + 10);
    flippingEl.classList.add("flipping");
    // forzar reflow para asegurar que la animación de transform se dispare
    void flippingEl.offsetWidth;

    if (direction === "forward") {
      flippingEl.style.transform = "rotateY(-180deg)";
    } else {
      flippingEl.style.transform = "rotateY(0deg)";
    }

    window.setTimeout(() => {
      state.currentPage += direction === "forward" ? 1 : -1;
      flippingEl.classList.remove("flipping");
      applyStackOrder(true);
      state.isAnimating = false;
      syncPageInput();
    }, ADJACENT_FLIP_MS);
  }

  function jumpTo(target) {
    state.isAnimating = true;
    bookEl.classList.add("jumping");

    window.setTimeout(() => {
      state.currentPage = target;
      applyStackOrder(false);
      syncPageInput();

      window.setTimeout(() => {
        bookEl.classList.remove("jumping");
        window.setTimeout(() => {
          state.isAnimating = false;
        }, JUMP_FADE_MS);
      }, 20);
    }, JUMP_FADE_MS);
  }

  function syncPageInput() {
    pageInput.value = String(state.currentPage);
    prevBtn.disabled = pillPrev.disabled = state.currentPage <= 1;
    nextBtn.disabled = pillNext.disabled = state.currentPage >= state.numPages;
  }

  /* ----------------------------------------------------------------------
     8) CONTROLES: flechas, píldora, teclado, clic en el libro, swipe
  ---------------------------------------------------------------------- */
  prevBtn.addEventListener("click", () => goToPage(state.currentPage - 1));
  nextBtn.addEventListener("click", () => goToPage(state.currentPage + 1));
  pillPrev.addEventListener("click", () => goToPage(state.currentPage - 1));
  pillNext.addEventListener("click", () => goToPage(state.currentPage + 1));

  clickLeft.addEventListener("click", () => goToPage(state.currentPage - 1));
  clickRight.addEventListener("click", () => goToPage(state.currentPage + 1));

  function commitPageInput() {
    const val = parseInt(pageInput.value, 10);
    if (Number.isNaN(val)) {
      syncPageInput();
      return;
    }
    goToPage(val);
  }
  pageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitPageInput();
      pageInput.blur();
    }
  });
  pageInput.addEventListener("blur", commitPageInput);

  document.addEventListener("keydown", (e) => {
    if (document.activeElement === pageInput || document.activeElement === searchInput) return;
    if (drawerEl.classList.contains("open") && e.key === "Escape") {
      closeDrawer();
      return;
    }
    if (e.key === "ArrowRight") goToPage(state.currentPage + 1);
    else if (e.key === "ArrowLeft") goToPage(state.currentPage - 1);
    else if (e.key === "Home") goToPage(1);
    else if (e.key === "End") goToPage(state.numPages);
  });

  // Swipe táctil
  let touchStartX = null;
  bookStageEl.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  bookStageEl.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) goToPage(state.currentPage + 1);
      else goToPage(state.currentPage - 1);
    }
    touchStartX = null;
  }, { passive: true });

  /* ----------------------------------------------------------------------
     9) BUSCADOR DE PRODUCTOS (drawer)
  ---------------------------------------------------------------------- */
  const priceValues = PRODUCTS.filter(p => p.price).flatMap(p => [p.price.min, p.price.max]);
  const GLOBAL_MIN_PRICE = 0;
  const GLOBAL_MAX_PRICE = Math.ceil(Math.max(...priceValues, 0) / 10) * 10;

  function setupCategoryOptions() {
    const categories = [...new Set(PRODUCTS.map(p => p.category))];
    categories.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  function setupPriceRange() {
    rangeMin.min = rangeMax.min = GLOBAL_MIN_PRICE;
    rangeMin.max = rangeMax.max = GLOBAL_MAX_PRICE;
    rangeMin.value = GLOBAL_MIN_PRICE;
    rangeMax.value = GLOBAL_MAX_PRICE;
    priceMinInput.placeholder = String(GLOBAL_MIN_PRICE);
    priceMaxInput.placeholder = String(GLOBAL_MAX_PRICE);
    updateRangeFill();
  }

  function updateRangeFill() {
    const min = Number(rangeMin.value);
    const max = Number(rangeMax.value);
    const span = GLOBAL_MAX_PRICE - GLOBAL_MIN_PRICE || 1;
    const leftPct = ((min - GLOBAL_MIN_PRICE) / span) * 100;
    const rightPct = ((max - GLOBAL_MIN_PRICE) / span) * 100;
    rangeFill.style.left = `${leftPct}%`;
    rangeFill.style.width = `${Math.max(0, rightPct - leftPct)}%`;
  }

  function currentPriceFilter() {
    let min = priceMinInput.value.trim() === "" ? GLOBAL_MIN_PRICE : Number(priceMinInput.value);
    let max = priceMaxInput.value.trim() === "" ? GLOBAL_MAX_PRICE : Number(priceMaxInput.value);
    if (Number.isNaN(min)) min = GLOBAL_MIN_PRICE;
    if (Number.isNaN(max)) max = GLOBAL_MAX_PRICE;
    if (min > max) { const t = min; min = max; max = t; }
    return { min, max };
  }

  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function formatPrice(product) {
    if (!product.price) return "Precio a consultar";
    const { min, max } = product.price;
    if (min === max) return `$${min}`;
    return `$${min}–$${max}`;
  }

  function renderResults() {
    const query = normalize(searchInput.value.trim());
    const category = categorySelect.value;
    const { min: priceMin, max: priceMax } = currentPriceFilter();

    const results = PRODUCTS.filter((p) => {
      if (query && !normalize(p.name).includes(query)) return false;
      if (category && p.category !== category) return false;
      if (p.price) {
        const overlaps = p.price.min <= priceMax && p.price.max >= priceMin;
        if (!overlaps) return false;
      } else if (priceMin > GLOBAL_MIN_PRICE || priceMax < GLOBAL_MAX_PRICE) {
        // si el usuario acotó el precio, ocultar productos sin precio definido
        return false;
      }
      return true;
    });

    resultsCountEl.textContent = `${results.length} producto${results.length === 1 ? "" : "s"}`;

    if (results.length === 0) {
      resultsListEl.innerHTML = `<p class="no-results">No se encontraron productos con esos filtros.</p>`;
      return;
    }

    resultsListEl.innerHTML = "";
    results.forEach((p) => {
      const card = document.createElement("div");
      card.className = "result-card";
      card.innerHTML = `
        <div class="result-card-top">
          <span class="result-name">${escapeHtml(p.name)}</span>
          <span class="result-price">${escapeHtml(formatPrice(p))}</span>
        </div>
        <div class="result-meta">
          <span class="result-tag">${escapeHtml(p.category)}</span>
          <button type="button" class="result-view" data-page="${p.page}">Ver · pág. ${p.page}</button>
        </div>
      `;
      resultsListEl.appendChild(card);
    });

    resultsListEl.querySelectorAll(".result-view").forEach((btn) => {
      btn.addEventListener("click", () => {
        const page = Number(btn.dataset.page);
        goToPage(page);
        closeDrawer();
      });
    });
  }

  function clearFilters() {
    searchInput.value = "";
    categorySelect.value = "";
    priceMinInput.value = "";
    priceMaxInput.value = "";
    rangeMin.value = GLOBAL_MIN_PRICE;
    rangeMax.value = GLOBAL_MAX_PRICE;
    updateRangeFill();
    renderResults();
  }

  searchInput.addEventListener("input", renderResults);
  categorySelect.addEventListener("change", renderResults);

  priceMinInput.addEventListener("input", () => {
    if (priceMinInput.value.trim() !== "") rangeMin.value = Number(priceMinInput.value);
    updateRangeFill();
    renderResults();
  });
  priceMaxInput.addEventListener("input", () => {
    if (priceMaxInput.value.trim() !== "") rangeMax.value = Number(priceMaxInput.value);
    updateRangeFill();
    renderResults();
  });

  rangeMin.addEventListener("input", () => {
    if (Number(rangeMin.value) > Number(rangeMax.value)) rangeMin.value = rangeMax.value;
    priceMinInput.value = rangeMin.value;
    updateRangeFill();
    renderResults();
  });
  rangeMax.addEventListener("input", () => {
    if (Number(rangeMax.value) < Number(rangeMin.value)) rangeMax.value = rangeMin.value;
    priceMaxInput.value = rangeMax.value;
    updateRangeFill();
    renderResults();
  });

  clearFiltersBtn.addEventListener("click", clearFilters);

  /* ----------------------------------------------------------------------
     10) DRAWER: abrir / cerrar
  ---------------------------------------------------------------------- */
  function openDrawer() {
    drawerEl.classList.add("open");
    drawerOverlay.classList.add("open");
    drawerEl.setAttribute("aria-hidden", "false");
    window.setTimeout(() => searchInput.focus(), 300);
  }
  function closeDrawer() {
    drawerEl.classList.remove("open");
    drawerOverlay.classList.remove("open");
    drawerEl.setAttribute("aria-hidden", "true");
  }
  openSearchBtn.addEventListener("click", openDrawer);
  drawerClose.addEventListener("click", closeDrawer);
  drawerOverlay.addEventListener("click", closeDrawer);

  /* ----------------------------------------------------------------------
     11) INICIO
  ---------------------------------------------------------------------- */
  setupCategoryOptions();
  setupPriceRange();
  renderResults();
  syncPageInput();
  initBook();

})();
