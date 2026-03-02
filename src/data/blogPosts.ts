export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  coverImage: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "como-organizar-freezer",
    title: "Cómo organizar tu freezer para la semana en 5 pasos",
    excerpt: "Una guía práctica para aprovechar el espacio de tu freezer y tener comida lista todos los días.",
    date: "5 de febrero, 2026",
    tag: "Organización",
    coverImage: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1200&q=80",
    content: `
      <p>Si alguna vez abriste el freezer y encontraste un misterio envuelto en papel aluminio, este artículo es para vos. Organizar el freezer no es solo una cuestión estética: <strong>es la diferencia entre cocinar tranquila y salir corriendo al delivery</strong>.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" alt="Freezer organizado con recipientes etiquetados" />
        <figcaption>Un freezer bien organizado te ahorra tiempo y reduce el desperdicio.</figcaption>
      </figure>

      <h2>Paso 1: Vaciá todo y hacé limpieza</h2>
      <p>Sí, todo. Sacá cada tupper, cada bolsita, cada cosa que "algún día vas a usar". Si no sabés qué es o cuándo lo hiciste, descartalo. El freezer no es un museo de comida olvidada.</p>

      <blockquote>
        <p>"El orden no es un destino, es un hábito que se construye con pequeñas decisiones diarias."</p>
      </blockquote>

      <h2>Paso 2: Clasificá por tipo de comida</h2>
      <p>Agrupá todo en categorías: <strong>proteínas, verduras, salsas, comidas completas y panes</strong>. Esto te va a permitir encontrar lo que necesitás en segundos, sin tener que revolver como si buscaras un tesoro.</p>

      <h2>Paso 3: Usá recipientes transparentes y etiquetá</h2>
      <p>Las bolsas de freezer con cierre hermético y los tuppers transparentes son tus mejores aliados. Etiquetá cada uno con el nombre del plato y la fecha en que lo preparaste. <strong>Tu yo del futuro te lo va a agradecer.</strong></p>

      <ul>
        <li>Bolsas con cierre hermético para salsas y guisos</li>
        <li>Tuppers de vidrio para porciones individuales</li>
        <li>Etiquetas con cinta de papel y marcador</li>
      </ul>

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
    coverImage: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80",
    content: `
      <p>El meal prep suena intimidante, pero en realidad es lo más simple del mundo: <strong>cocinar una vez para comer varios días</strong>. No necesitás ser chef, ni tener una cocina enorme, ni dedicar 8 horas al domingo.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" alt="Preparación de viandas semanales" />
        <figcaption>Preparar todo en un día te libera el resto de la semana.</figcaption>
      </figure>

      <h2>¿Qué es exactamente el meal prep?</h2>
      <p>Es simplemente dedicar un momento de la semana (generalmente el domingo o el día que tengas libre) para cocinar varias preparaciones que después vas a usar durante la semana. Puede ser desde cocinar arroz y pollo hasta preparar 5 viandas completas.</p>

      <h2>¿Por dónde empiezo?</h2>
      <p>Empezá simple. Elegí <strong>3 recetas que ya sepas hacer</strong> y que se banquen bien en la heladera o freezer. Las milanesas, tartas, guisos y pastas con salsa son ideales para arrancar porque rinden mucho y se conservan perfecto.</p>

      <blockquote>
        <p>"La perfección es enemiga del progreso. Tu primer meal prep no tiene que ser perfecto, solo tiene que existir."</p>
      </blockquote>

      <h2>El equipamiento mínimo</h2>
      <p>No necesitás nada especial. Con una buena olla, una asadera, tuppers con tapa (preferiblemente de vidrio) y bolsas de freezer, estás lista. Si tenés una procesadora, mejor, pero no es obligatorio.</p>

      <ul>
        <li>Olla grande y sartén antiadherente</li>
        <li>Asadera para el horno</li>
        <li>Tuppers de vidrio con tapa hermética</li>
        <li>Bolsas de freezer con cierre</li>
      </ul>

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
    coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    content: `
      <p>La carga mental de la cocina no empieza cuando prendés la hornalla. <strong>Empieza cuando abrís los ojos a la mañana y ya estás pensando "¿qué hago de comer hoy?"</strong>. Y esa pregunta se repite 3, 4, 5 veces al día, todos los días.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&q=80" alt="Mujer cocinando tranquila en su cocina" />
        <figcaption>Cocinar puede ser un momento de calma si dejás de improvisar.</figcaption>
      </figure>

      <h2>1. Planificá el menú una sola vez por semana</h2>
      <p>Sentate 15 minutos el sábado o domingo y decidí qué vas a comer cada día. No tiene que ser gourmet. Puede ser "lunes: milanesas con ensalada, martes: guiso de lentejas". <strong>Esa decisión tomada una sola vez te libera de 21 decisiones en la semana.</strong></p>

      <blockquote>
        <p>"No es que no te guste cocinar. Es que estás cansada de decidir qué cocinar."</p>
      </blockquote>

      <h2>2. Automatizá las compras</h2>
      <p>Una vez que tenés el menú, la lista de compras se arma sola. Mejor aún: usá siempre la misma estructura de lista (verduras, proteínas, lácteos, secos) y comprá siempre en el mismo lugar. Tu cerebro va a funcionar en piloto automático.</p>

      <h2>3. Delegá lo que puedas (y aceptá ayuda)</h2>
      <p>No tenés que hacerlo todo sola. Si tu pareja puede picar verduras, genial. Si tus hijos pueden poner la mesa, mejor. Y si un sistema como Cocina en Flor puede darte el menú, las recetas y la lista de compras ya armada... <strong>¿por qué no aprovecharlo?</strong></p>

      <ul>
        <li>Delegá tareas simples a otros miembros de la familia</li>
        <li>Usá un sistema de planificación que decida por vos</li>
        <li>Aceptá que "suficientemente bueno" es perfecto</li>
      </ul>

      <p>La carga mental se reduce cuando tenés sistemas. No se trata de hacer más, se trata de <strong>pensar menos en lo que ya decidiste</strong>.</p>
    `,
  },
  {
    slug: "lista-compras-inteligente",
    title: "La lista de compras inteligente que te ahorra tiempo y plata",
    excerpt: "Comprá una vez por semana y dejá de improvisar. Así funciona nuestra lista.",
    date: "12 de enero, 2026",
    tag: "Tips",
    coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    content: `
      <p>¿Cuántas veces fuiste al super "a comprar algo rápido" y saliste con bolsas llenas de cosas que no necesitabas? <strong>La lista de compras inteligente es tu escudo contra las compras impulsivas y el desperdicio.</strong></p>

      <figure>
        <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80" alt="Lista de compras organizada junto a vegetales frescos" />
        <figcaption>Una buena lista es la base de una semana sin estrés.</figcaption>
      </figure>

      <h2>¿Qué la hace "inteligente"?</h2>
      <p>Una lista inteligente no es simplemente anotar lo que falta. Es una lista que sale directamente de tu menú semanal. Si sabés que vas a cocinar milanesas, guiso y tarta, entonces sabés exactamente qué comprar. <strong>Nada más, nada menos.</strong></p>

      <h2>La estructura que funciona</h2>
      <p>Organizá tu lista por secciones del supermercado: frutas y verduras, carnes, lácteos, almacén, limpieza. Así recorrés el super una sola vez, sin volver atrás porque te olvidaste el queso.</p>

      <ol>
        <li>Frutas y verduras frescas</li>
        <li>Carnes y proteínas</li>
        <li>Lácteos y huevos</li>
        <li>Almacén y secos</li>
        <li>Limpieza y extras</li>
      </ol>

      <h2>Comprá en cantidad, cociná en bloque</h2>
      <p>Si el pollo está en oferta, comprá de más y freezá. Si vas a hacer dos recetas con cebolla, comprá las cebollas juntas. <strong>Pensar en volumen te ahorra plata y tiempo.</strong></p>

      <h2>El error más común</h2>
      <p>Ir al supermercado sin menú. Terminás comprando "lo de siempre" o improvisando. El resultado: ingredientes que sobran, comidas que no cierran y frustración. Con un menú definido, cada producto tiene un destino claro.</p>

      <p>En Cocina en Flor, cada plan semanal incluye la lista de compras ya armada. Solo tenés que abrir la app, ir al super y tachar. <strong>Así de simple.</strong></p>
    `,
  },
  {
    slug: "viandas-salvadoras-trabajo",
    title: "5 viandas salvadoras para llevar al trabajo",
    excerpt: "Comé rico en la oficina sin recurrir al delivery. Ideas rápidas, económicas y recontra prácticas.",
    date: "5 de enero, 2026",
    tag: "Recetas",
    coverImage: "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",
    content: `
      <p>Llevarse vianda al trabajo no tiene por qué ser aburrido. Con un poco de planificación, podés comer <strong>mejor, más barato y sin perder tiempo en la cola del delivery</strong>.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" alt="Viandas coloridas en tuppers de vidrio" />
        <figcaption>Viandas caseras: ricas, económicas y listas en minutos.</figcaption>
      </figure>

      <h2>1. Wrap de pollo con vegetales</h2>
      <p>Tortilla de trigo + pollo desmenuzado del día anterior + lechuga, tomate y un poco de mayonesa casera. Se arma en 5 minutos y viaja perfecto. <strong>Tip: envolvelo en papel aluminio para que mantenga la forma.</strong></p>

      <h2>2. Ensalada completa en frasco</h2>
      <p>Poné el aderezo en el fondo, después los ingredientes más pesados (garbanzos, pollo, arroz) y arriba las hojas verdes. Al mediodía sacudís el frasco y tenés una ensalada perfecta sin que se marchite.</p>

      <blockquote>
        <p>"La vianda perfecta es la que te da ganas de comer cuando la abrís. Si no te entusiasma, no la vas a sostener."</p>
      </blockquote>

      <h2>3. Pasta fría mediterránea</h2>
      <p>Fusilli + tomates cherry + aceitunas + cubitos de queso + albahaca + aceite de oliva. Se hace en 15 minutos la noche anterior y al otro día está incluso más rica porque los sabores se integraron.</p>

      <h2>4. Tarta individual de verduras</h2>
      <p>Usá moldes de muffin para hacer mini tartas con la tapa que sobró del domingo. Rellenálas con lo que tengas: zapallitos con queso, espinaca con ricota, jamón y queso. <strong>Freezá las que sobren para la semana siguiente.</strong></p>

      <h2>5. Bowl de arroz con proteína</h2>
      <p>Arroz + la proteína que tengas (pollo, carne, huevo duro) + vegetales salteados o crudos + salsa de soja o chimichurri. Simple, completo y satisfactorio.</p>

      <ul>
        <li>Prepará todo el domingo en un bloque de 2 horas</li>
        <li>Usá tuppers de vidrio (calientan mejor en microondas)</li>
        <li>Variá las proteínas para no aburrirte</li>
        <li>Siempre tené una vianda de backup en el freezer</li>
      </ul>

      <p>Con estas 5 opciones rotando, tenés <strong>un mes entero de viandas resueltas</strong>. Y si querés más ideas, en el Club de Cocina en Flor recibís 40 recetas nuevas cada mes, muchas pensadas especialmente para llevar.</p>
    `,
  },
  {
    slug: "compras-eficientes-super",
    title: "Cómo hacer compras eficientes en el súper (y no morir en el intento)",
    excerpt: "Estrategias probadas para comprar más rápido, gastar menos y no olvidarte de nada.",
    date: "28 de diciembre, 2025",
    tag: "Organización",
    coverImage: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80",
    content: `
      <p>Ir al supermercado puede ser una odisea o un trámite de 30 minutos. La diferencia está en <strong>cómo te preparás antes de salir de tu casa</strong>.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="Pasillo de supermercado con productos frescos" />
        <figcaption>Con un plan claro, el supermercado deja de ser un campo de batalla.</figcaption>
      </figure>

      <h2>Regla #1: Nunca vayas sin lista</h2>
      <p>Parece obvio, pero la mayoría de la gente va al super "a ver qué hay". El resultado: comprás de más, olvidás lo importante y terminás gastando el doble. <strong>La lista es tu mapa, no salgas sin ella.</strong></p>

      <blockquote>
        <p>"Cada vez que entrás al súper sin lista, estás tomando 200 micro-decisiones que drenan tu energía mental."</p>
      </blockquote>

      <h2>Regla #2: Organizá la lista por sector</h2>
      <p>Si tu lista dice "tomate, detergente, queso, manzanas, arroz", vas a recorrer el super como un laberinto. Organizala por sector: verdulería, carnicería, lácteos, almacén, limpieza. Recorrés una sola vez y listo.</p>

      <h2>Regla #3: Comprá una vez por semana</h2>
      <p>Cada visita al super es una oportunidad de gastar de más. Si hacés una compra grande semanal y solo volvés para frescos (fruta, verdura), <strong>reducís las tentaciones y el tiempo invertido</strong>.</p>

      <h2>Regla #4: Aprovechá las ofertas con inteligencia</h2>
      <p>Una oferta solo es buena si el producto está en tu menú. Si el atún está 2x1 pero no vas a hacer nada con atún esta semana, no es una oferta — es un gasto.</p>

      <ol>
        <li>Revisá el menú semanal antes de salir</li>
        <li>Armá la lista por sectores del super</li>
        <li>Definí un presupuesto máximo</li>
        <li>Evitá ir con hambre (¡nunca!)</li>
        <li>Comprá marcas blancas para básicos</li>
      </ol>

      <h2>Regla #5: Comprá con el menú en la mano</h2>
      <p>Si sabés que el lunes hacés milanesas, el martes tarta y el miércoles guiso, cada producto que ponés en el changuito tiene un destino. No hay lugar para la improvisación ni el desperdicio.</p>

      <p>En Cocina en Flor, cada semana recibís el menú completo con la lista de compras ya armada y organizada. <strong>Solo tenés que ir, comprar y cocinar. Sin pensar.</strong></p>
    `,
  },
];
