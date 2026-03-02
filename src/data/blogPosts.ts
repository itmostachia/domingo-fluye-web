export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  coverColor: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "como-organizar-freezer",
    title: "Cómo organizar tu freezer para la semana en 5 pasos",
    excerpt: "Una guía práctica para aprovechar el espacio de tu freezer y tener comida lista todos los días.",
    date: "5 de febrero, 2026",
    tag: "Organización",
    coverColor: "bg-primary/10",
    content: `
      <p>Si alguna vez abriste el freezer y encontraste un misterio envuelto en papel aluminio, este artículo es para vos. Organizar el freezer no es solo una cuestión estética: <strong>es la diferencia entre cocinar tranquila y salir corriendo al delivery</strong>.</p>

      <h2>Paso 1: Vaciá todo y hacé limpieza</h2>
      <p>Sí, todo. Sacá cada tupper, cada bolsita, cada cosa que "algún día vas a usar". Si no sabés qué es o cuándo lo hiciste, descartalo. El freezer no es un museo de comida olvidada.</p>

      <h2>Paso 2: Clasificá por tipo de comida</h2>
      <p>Agrupá todo en categorías: proteínas, verduras, salsas, comidas completas y panes. Esto te va a permitir encontrar lo que necesitás en segundos, sin tener que revolver como si buscaras un tesoro.</p>

      <h2>Paso 3: Usá recipientes transparentes y etiquetá</h2>
      <p>Las bolsas de freezer con cierre hermético y los tuppers transparentes son tus mejores aliados. Etiquetá cada uno con el nombre del plato y la fecha en que lo preparaste. <strong>Tu yo del futuro te lo va a agradecer.</strong></p>

      <h2>Paso 4: Organizá por zonas</h2>
      <p>Asigná una zona del freezer a cada categoría. El cajón de arriba para comidas listas, el del medio para proteínas crudas y el de abajo para panes y extras. Una vez que tenés tu sistema, mantenerlo es automático.</p>

      <h2>Paso 5: Rotá y planificá</h2>
      <p>Cada semana, antes de cocinar, revisá qué tenés. Usá lo más viejo primero y planificá qué vas a preparar para reponer. <strong>Con este sistema, siempre vas a tener comida casera lista para sacar y calentar.</strong></p>

      <p>¿Parece mucho? Te prometo que una vez que lo hacés, se vuelve un hábito. Y ese hábito te devuelve horas de tranquilidad cada semana.</p>
    `,
  },
  {
    slug: "meal-prep-principiantes",
    title: "Meal prep para principiantes: todo lo que necesitás saber",
    excerpt: "Si nunca cocinaste todo el domingo, esta guía te va a dar la confianza para empezar.",
    date: "28 de enero, 2026",
    tag: "Guías",
    coverColor: "bg-secondary/10",
    content: `
      <p>El meal prep suena intimidante, pero en realidad es lo más simple del mundo: <strong>cocinar una vez para comer varios días</strong>. No necesitás ser chef, ni tener una cocina enorme, ni dedicar 8 horas al domingo.</p>

      <h2>¿Qué es exactamente el meal prep?</h2>
      <p>Es simplemente dedicar un momento de la semana (generalmente el domingo o el día que tengas libre) para cocinar varias preparaciones que después vas a usar durante la semana. Puede ser desde cocinar arroz y pollo hasta preparar 5 viandas completas.</p>

      <h2>¿Por dónde empiezo?</h2>
      <p>Empezá simple. Elegí 3 recetas que ya sepas hacer y que se banquen bien en la heladera o freezer. Las milanesas, tartas, guisos y pastas con salsa son ideales para arrancar porque rinden mucho y se conservan perfecto.</p>

      <h2>El equipamiento mínimo</h2>
      <p>No necesitás nada especial. Con una buena olla, una asadera, tuppers con tapa (preferiblemente de vidrio) y bolsas de freezer, estás lista. Si tenés una procesadora, mejor, pero no es obligatorio.</p>

      <h2>La regla de oro: no te compliques</h2>
      <p>El primer meal prep no tiene que ser perfecto. Si cocinás 2 cosas y las tenés listas para la semana, ya ganaste. <strong>La idea no es ser perfecta, es ser práctica.</strong> Cada semana vas a ir sumando recetas y ganando confianza.</p>

      <h2>Tips que marcan la diferencia</h2>
      <p>Cociná mientras algo está en el horno. Aprovechá los tiempos muertos. Poné música o un podcast. Involucrá a tu familia. Y sobre todo: <strong>disfrutá del proceso</strong>. Cocinar con intención es un acto de amor propio.</p>
    `,
  },
  {
    slug: "reducir-carga-mental-cocina",
    title: "3 formas de reducir la carga mental con la cocina",
    excerpt: "No es solo cocinar. Es dejar de pensar en qué cocinar. Te contamos cómo lograrlo.",
    date: "20 de enero, 2026",
    tag: "Bienestar",
    coverColor: "bg-accent/20",
    content: `
      <p>La carga mental de la cocina no empieza cuando prendés la hornalla. <strong>Empieza cuando abrís los ojos a la mañana y ya estás pensando "¿qué hago de comer hoy?"</strong>. Y esa pregunta se repite 3, 4, 5 veces al día, todos los días.</p>

      <h2>1. Planificá el menú una sola vez por semana</h2>
      <p>Sentate 15 minutos el sábado o domingo y decidí qué vas a comer cada día. No tiene que ser gourmet. Puede ser "lunes: milanesas con ensalada, martes: guiso de lentejas". <strong>Esa decisión tomada una sola vez te libera de 21 decisiones en la semana.</strong></p>

      <h2>2. Automatizá las compras</h2>
      <p>Una vez que tenés el menú, la lista de compras se arma sola. Mejor aún: usá siempre la misma estructura de lista (verduras, proteínas, lácteos, secos) y comprá siempre en el mismo lugar. Tu cerebro va a funcionar en piloto automático.</p>

      <h2>3. Delegá lo que puedas (y aceptá ayuda)</h2>
      <p>No tenés que hacerlo todo sola. Si tu pareja puede picar verduras, genial. Si tus hijos pueden poner la mesa, mejor. Y si un sistema como Cocina en Flor puede darte el menú, las recetas y la lista de compras ya armada... <strong>¿por qué no aprovecharlo?</strong></p>

      <p>La carga mental se reduce cuando tenés sistemas. No se trata de hacer más, se trata de pensar menos en lo que ya decidiste.</p>
    `,
  },
  {
    slug: "lista-compras-inteligente",
    title: "La lista de compras inteligente que te ahorra tiempo y plata",
    excerpt: "Comprá una vez por semana y dejá de improvisar. Así funciona nuestra lista.",
    date: "12 de enero, 2026",
    tag: "Tips",
    coverColor: "bg-muted",
    content: `
      <p>¿Cuántas veces fuiste al super "a comprar algo rápido" y saliste con bolsas llenas de cosas que no necesitabas? <strong>La lista de compras inteligente es tu escudo contra las compras impulsivas y el desperdicio.</strong></p>

      <h2>¿Qué la hace "inteligente"?</h2>
      <p>Una lista inteligente no es simplemente anotar lo que falta. Es una lista que sale directamente de tu menú semanal. Si sabés que vas a cocinar milanesas, guiso y tarta, entonces sabés exactamente qué comprar. Nada más, nada menos.</p>

      <h2>La estructura que funciona</h2>
      <p>Organizá tu lista por secciones del supermercado: frutas y verduras, carnes, lácteos, almacén, limpieza. Así recorrés el super una sola vez, sin volver atrás porque te olvidaste el queso.</p>

      <h2>Comprá en cantidad, cociná en bloque</h2>
      <p>Si el pollo está en oferta, comprá de más y freezá. Si vas a hacer dos recetas con cebolla, comprá las cebollas juntas. <strong>Pensar en volumen te ahorra plata y tiempo.</strong></p>

      <h2>El error más común</h2>
      <p>Ir al supermercado sin menú. Terminás comprando "lo de siempre" o improvisando. El resultado: ingredientes que sobran, comidas que no cierran y frustración. Con un menú definido, cada producto tiene un destino claro.</p>

      <p>En Cocina en Flor, cada plan semanal incluye la lista de compras ya armada. Solo tenés que abrir la app, ir al super y tachar. Así de simple.</p>
    `,
  },
];
