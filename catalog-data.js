// Índice de productos del catálogo Koala Kids.
// "page" es el número de página del PDF donde aparece cada producto.
// Si algún día cambian productos o páginas, este es el único archivo que hay que tocar.
const CATALOG_INDEX = [
  { title: "Faldas lisas", category: "Faldas", page: 3, price: "$180 – $205", note: "Varios colores · mayoreo desde 6 piezas", tags: ["falda", "lisa", "colores"] },
  { title: "Faldas floreadas", category: "Faldas", page: 3, price: "$150 – $190", note: "Rojo, rosa, negro, azul marino, celeste", tags: ["falda", "floreada", "flores"] },

  { title: "Vestido de Veracruz", category: "Vestidos", page: 4, price: "$300 – $325", tags: ["vestido", "veracruz"] },
  { title: "Vestido Nuevo León", category: "Vestidos", page: 4, price: "$295 – $310", note: "Rosa, amarillo, turquesa", tags: ["vestido", "nuevo león"] },
  { title: "Vestido de la Piña", category: "Vestidos", page: 4, price: "$290 – $320", tags: ["vestido", "piña"] },
  { title: "Vestido de Aguascalientes", category: "Vestidos", page: 4, price: "$390", tags: ["vestido", "aguascalientes"] },

  { title: "Vestido de Jalisco", category: "Vestidos", page: 5, price: "$290 – $320", tags: ["vestido", "jalisco"] },
  { title: "Vestido de manta", category: "Vestidos", page: 5, price: "$160 – $210", note: "Manga corta o larga", tags: ["vestido", "manta"] },

  { title: "Manta niño (2 pzas)", category: "Trajes", page: 6, price: "$160 – $210", tags: ["manta", "niño"] },
  { title: "Vestido floreado Adelita", category: "Vestidos", page: 6, price: "$270", note: "Tallas 2-12 · carrilleras por separado", tags: ["adelita", "vestido"] },
  { title: "Vestido Adelita", category: "Vestidos", page: 6, price: "$350 – $400", note: "Carrilleras por separado", tags: ["adelita", "vestido"] },
  { title: "Vestimenta de charro", category: "Trajes", page: 6, price: "Consultar", note: "Chaleco, pantalón y chaqueta", tags: ["charro", "traje"] },

  { title: "Vestido de Colima", category: "Vestidos", page: 7, price: "$310 – $335", tags: ["vestido", "colima"] },
  { title: "Vestido Azteca", category: "Vestidos", page: 7, price: "$300", note: "Incluye penacho", tags: ["vestido", "azteca", "penacho"] },
  { title: "Vestido de Nayarit", category: "Vestidos", page: 7, price: "$340", tags: ["vestido", "nayarit"] },
  { title: "Vestido Yucateco", category: "Vestidos", page: 7, price: "$290 – $320", tags: ["vestido", "yucatán"] },

  { title: "Traje de Veracruz", category: "Trajes", page: 8, price: "$370 – $450", note: "Sombrero, paliacate, pantalón, guayabera", tags: ["traje", "veracruz", "niño"] },
  { title: "Falda de china poblana", category: "Faldas", page: 8, price: "$200 – $340", note: "Solo falda, imagen demostrativa", tags: ["falda", "china poblana"] },
  { title: "Traje de charro niña", category: "Trajes", page: 8, price: "Consultar", note: "Negro con dorado o plateado", tags: ["charro", "niña"] },

  { title: "Miguel Hidalgo (2 pzas)", category: "Trajes", page: 9, price: "$310", tags: ["miguel hidalgo", "traje"] },

  { title: "Sombreros de paja", category: "Accesorios", page: 10, price: "$100 c/u", tags: ["sombrero", "paja"] },
  { title: "Caballitos", category: "Accesorios", page: 10, price: "$140 – $180", note: "Calidad premium con sonido", tags: ["caballito", "juguete"] },
  { title: "Sombrero texano", category: "Accesorios", page: 10, price: "$130 – $160", tags: ["sombrero", "texano"] },
  { title: "Sombrero Allende", category: "Accesorios", page: 10, price: "$100 c/u", tags: ["sombrero", "allende"] },
  { title: "Pompones tricolor", category: "Accesorios", page: 10, price: "$100 el par", tags: ["pompón", "tricolor"] },
  { title: "Pompones de color", category: "Accesorios", page: 10, price: "$80 – $100", note: "Mayoreo desde 12 pares", tags: ["pompón", "color"] },
  { title: "Sombrero de viejito", category: "Accesorios", page: 10, price: "$100 c/u", tags: ["sombrero", "viejito"] },
  { title: "Banda presidencial", category: "Accesorios", page: 10, price: "$120", note: "Infantil y adulto", tags: ["banda", "presidencial"] },

  { title: "Sombrero de charro (sencillo)", category: "Accesorios", page: 11, price: "$160 – $210", tags: ["sombrero", "charro"] },
  { title: "Sombrero de charro (premium)", category: "Accesorios", page: 11, price: "$260 – $350", note: "Bebé a adulto", tags: ["sombrero", "charro", "premium"] },
  { title: "Sombrero 4 piedras", category: "Accesorios", page: 11, price: "$120 – $140", tags: ["sombrero"] },
  { title: "Rifle", category: "Accesorios", page: 11, price: "$80 c/u", tags: ["rifle", "accesorio"] },
  { title: "Sombrero caporal", category: "Accesorios", page: 11, price: "$180", tags: ["sombrero", "caporal"] },
  { title: "Fajilla roja", category: "Accesorios", page: 11, price: "$50 c/u", tags: ["fajilla"] },
  { title: "Moño rojo para charro", category: "Accesorios", page: 11, price: "$85 c/u", tags: ["moño", "charro"] },

  { title: "Peluca de Miguel Hidalgo", category: "Accesorios", page: 12, price: "$80 c/u", tags: ["peluca"] },
  { title: "Carrilleras", category: "Accesorios", page: 12, price: "$80 – $150", tags: ["carrillera", "adelita"] },
  { title: "Espadas", category: "Accesorios", page: 12, price: "$110 – $120", tags: ["espada"] },
  { title: "Rebozos", category: "Accesorios", page: 12, price: "$120 – $150", tags: ["rebozo"] },
  { title: "Blusa con listón", category: "Accesorios", page: 12, price: "$190", note: "Manga larga, varios colores de listón", tags: ["blusa"] },
  { title: "Paliacates", category: "Accesorios", page: 12, price: "$40 c/u", note: "Docena $260", tags: ["paliacate"] },
  { title: "Abanicos", category: "Accesorios", page: 12, price: "$80 el par", tags: ["abanico"] },
  { title: "Trenzas", category: "Accesorios", page: 12, price: "$80 – $190 el par", tags: ["trenza"] },
  { title: "Collares", category: "Accesorios", page: 12, price: "$20 c/u", tags: ["collar"] },
  { title: "Peineta bailable Veracruz", category: "Accesorios", page: 12, price: "$80 c/u", tags: ["peineta", "veracruz"] },

  { title: "Rumbera", category: "Trajes", page: 13, price: "$135 – $270", note: "Mayoreo desde 6 piezas", tags: ["rumbera"] },
  { title: "Mangas rumberas", category: "Accesorios", page: 13, price: "$160", tags: ["manga", "rumbera"] },
  { title: "Rumbero de niño", category: "Trajes", page: 13, price: "$135 – $270", tags: ["rumbero", "niño"] },
  { title: "Manta de niño", category: "Trajes", page: 13, price: "$160 – $210", tags: ["manta", "niño"] },
  { title: "Vestido agogo", category: "Vestidos", page: 13, price: "$225", tags: ["agogo", "vestido"] },

  { title: "Traje Michael Jackson", category: "Trajes", page: 14, price: "$400", note: "Tallas 2-12 · sombrero por separado", tags: ["michael jackson", "disfraz"] },
  { title: "Agogo niño", category: "Trajes", page: 14, price: "$400", note: "Tallas CH, M, G · peluca por separado", tags: ["agogo", "niño"] },

  { title: "Vestido Naranjado", category: "Destacados", page: 15, price: "$1,234", note: "Algodón fresco para playa, hecho en México", tags: ["destacado", "vestido", "playa"] },

  { title: "¿Cómo comprar?", category: "Destacados", page: 16, price: "", note: "WhatsApp (55) 1234-5678 · sitioincreible.com", tags: ["comprar", "contacto", "ayuda"] }
];
