const tabsConfig = {
    'General': { icon: 'fa-book', label: 'Teoria' },
    'Pseudocódigos': { icon: 'fa-file-code', label: 'Pseudos' },
    'Exámenes (Letras)': { icon: 'fa-file-lines', label: 'Letras' },
    'Soluciones': { icon: 'fa-check-double', label: 'Soluciones' },
    'Codigo Base': { icon: 'fa-laptop-code', label: 'Labs' },
    'Fuentes Java': { icon: 'fa-code', label: 'Java TDAs' },
    'Guias Practicas': { icon: 'fa-route', label: 'Guias' },
    'Primer Parcial': { icon: 'fa-rocket', label: '1er Parcial' }
};

const virtualDocuments = {
    'guia-interactiva-general': {
        title: 'Ruta Interactiva de Estudio AED',
        category: 'Guias Practicas',
        markdown: `
# Ruta Interactiva de Estudio AED

Esta guia transforma todo el material en un flujo practico para estudiar con foco de parcial.

## 1) Calentamiento teorico (30-40 min)

- Leer [Guia de Estudio](guia-de-estudio.md) para entender patrones de parciales.
- Repasar [Cuadernola](cuadernola.md) para tener plantillas listas.

## 2) Base de estructuras (50-70 min)

- Navegar por la seccion Pseudocodigos en este orden:
    1. Lista enlazada
    2. Pila y Cola
    3. Conjunto
    4. ABB
    5. AVL
- Objetivo: poder escribir cada TDA sin mirar.

## 3) Entrenamiento tipo parcial parte pseudocodigo

Resolver en tiempo:

1. LTIM
2. Separar hojas/internos
3. Parentesco
4. Combo viable
5. BST peliculas

## 4) Entrenamiento tipo parcial parte Java

- Ir a la seccion Labs y abrir cada carpeta del parcial.
- Identificar rapidamente:
    - Interfaz
    - Clase nodo/elemento
    - Arbol o TDA principal
    - Clase de dominio (Producto/Persona/etc.)
    - Tests

## 5) Simulacro final

1. Elegir una letra de examen de la seccion Letras.
2. Hacer primero pseudocodigo (max 60 min).
3. Hacer luego Java + JUnit (max 60 min).
4. Comparar contra Soluciones y anotar errores recurrentes.

## Checklist de cierre

- [ ] Inserto y roto AVL sin dudas.
- [ ] Resuelvo ABB con recursion sin perder casos borde.
- [ ] Paso de lenguaje natural a pseudocodigo en menos de 10 min.
- [ ] Implemento en Java sin romper contratos de interfaces.
- [ ] Escribo al menos 3 tests JUnit por ejercicio.
`
    },
    'codigo-base-mapa': {
        title: 'Mapa Visual del Codigo Base',
        category: 'Guias Practicas',
        markdown: `
# Mapa Visual del Codigo Base

Esta seccion te ayuda a orientarte rapido en cada base de catedra.

## 2024-S1 (Parcial de Productos)

- **Nucleo arbol**: \`IArbolBB\`, \`IElementoAB\`, \`TArbolBB\`, \`TElementoAB\`
- **Dominio**: \`Producto\`, \`TArbolDeProductos\`
- **Soporte**: \`ManejadorArchivosGenerico\`, \`Main\`
- **Pruebas**: \`Parcial1Test_Junit4\`, \`Parcial1Test_Junit5\`

## farmachop (Practico 10)

- **Estructura principal**: \`ILista\` / \`Lista\`, \`INodo\` / \`Nodo\`
- **IO de datos**: \`ManejadorArchivosGenerico\`, archivos txt de farmacos y sueros
- **Entrada**: \`Programa\`

## festival-otaku (Recuperatorio 2025)

- **TDAs**: \`TDALista\`, \`TDACola\`, \`TDAPila\`, \`TDAConjunto\`
- **Entrada**: \`App\`

## parentesco (Parcial 2024 S2)

- **Arbol genealogico**: \`IArbolBB\`, \`IElementoAB\`, \`TArbolBB\`, \`TElementoAB\`
- **Dominio**: \`Persona\`, \`ResultadoParentesco\`, \`Genealogia\`
- **Pruebas**: \`GenealogiaTests_JUnit5\`
`
    },
    'practica-60-min': {
        title: 'Practica Guiada 60 Minutos',
        category: 'Guias Practicas',
        markdown: `
# Practica Guiada de 60 Minutos

## Bloque A (15 min): AVL
- Inserta una secuencia y justifica cada rotacion.
- Objetivo: no equivocarte en LL, RR, LR, RL.

## Bloque B (15 min): ABB recursivo
- Resolver un metodo tipo hojas/internos o promedio de nivel.
- Marcar claramente: caso base, llamada recursiva, combinacion.

## Bloque C (15 min): Java de parcial
- Elegir una base (parentesco o 2024-S1).
- Completar un metodo central sin mirar solucion.

## Bloque D (15 min): retroalimentacion
- Comparar con Soluciones.
- Anotar 3 errores y su correccion concreta.
`
    },
    'parcial1-plan': {
        title: '📋 Plan de Resolución: Naves Autónomas',
        category: 'Primer Parcial',
        markdown: `
# Plan de Resolución: Naves Autónomas

Sigue estas etapas para dominar la implementación de este parcial.

## Etapa 1: Análisis y Modelado (15 min)
- Entender la entidad **Tarea** (id, descripcion, criticidad).
- Definir los topes: 25 global, 10 críticas.
- Identificar las 3 colas necesarias.

## Etapa 2: Implementación de Recepción y Procesamiento (30 min)
- Escribir el pseudocódigo de \`recibirTarea\` validando cupos.
- Implementar \`procesarTarea\` respetando la prioridad 1 > 2 > (3,4).
- **Clave**: No olvidar \`drenarColaEspera()\` al liberar espacio.

## Etapa 3: Estructura de Datos AVL (20 min)
- Entender por qué se usa un AVL (búsqueda logarítmica).
- Implementar la migración del buffer al árbol en la tarea #75.

## Etapa 4: Cancelación e Inmutabilidad (15 min)
- Implementar \`cancelarTarea\` recorriendo las 3 colas.
- Asegurar que el historial sea inmutable.
`
    }
};

const topics = [
    { 
        category: 'General',
        items: [
            { id: 'guia', title: 'Guía de Estudio', file: 'guia-de-estudio.md' },
            { id: 'cuadernola', title: 'Cuadernola (Teoría)', file: 'cuadernola.md' },
            { id: 'metodos-java-guia', title: 'Guía de Implementación Java', file: 'metodos_java.md' },
        ]
    },
    {
        category: 'Pseudocódigos',
        items: [
            { id: 'pseudo-completo', title: '📘 Todos los Pseudos', file: 'pseudocodigos/pseudos-completo.md' },
            { id: 'pseudo-arbol-avl', title: 'Árbol AVL', file: 'pseudocodigos/arbol-avl.md' },
            { id: 'pseudo-arbol-binario', title: 'Árbol Binario', file: 'pseudocodigos/arbol-binario.md' },
            { id: 'pseudo-arbol-bst', title: 'Árbol BST', file: 'pseudocodigos/arbol-bst.md' },
            { id: 'pseudo-cola', title: 'Cola', file: 'pseudocodigos/cola.md' },
            { id: 'pseudo-conjunto', title: 'Conjunto', file: 'pseudocodigos/conjunto.md' },
            { id: 'pseudo-lista', title: 'Lista Enlazada', file: 'pseudocodigos/lista-enlazada.md' },
            { id: 'pseudo-pila', title: 'Pila', file: 'pseudocodigos/pila.md' },
            { id: 'pseudo-eliminacion', title: 'Eliminación ABB', file: 'pseudocodigos/eliminacion-abb.md' },
            { id: 'pseudo-clave-compuesta', title: 'Clave Compuesta', file: 'pseudocodigos/clave-compuesta.md' },
            { id: 'pseudo-ej-pelis', title: 'Ejercicio: Películas', file: 'pseudocodigos/ejercicio-bst-peliculas.md' },
            { id: 'pseudo-ej-parentesco', title: 'Ejercicio: Parentesco', file: 'pseudocodigos/ejercicio-calcular-parentesco.md' },
            { id: 'pseudo-ej-combo', title: 'Ejercicio: Combo Viable', file: 'pseudocodigos/ejercicio-combo-viable.md' },
            { id: 'pseudo-ej-ltim', title: 'Ejercicio: LTIM', file: 'pseudocodigos/ejercicio-ltim.md' },
            { id: 'pseudo-ej-hojas', title: 'Ejercicio: Hojas/Internos', file: 'pseudocodigos/ejercicio-separar-hojas-internos.md' },
            { id: 'pseudo-ej-altura', title: 'Ejercicio: Calcular Altura', file: 'pseudocodigos/ejercicio-calcular-altura.md' },
            { id: 'pseudo-ej-tamano', title: 'Ejercicio: Calcular Tamaño', file: 'pseudocodigos/ejercicio-calcular-tamano.md' },
        ]
    },
    {
        category: 'Exámenes (Letras)',
        items: [
            { id: 'letra-2024-s1-p2-e1', title: '2024 S1 P2 Examen 1', file: 'letras/2024-S1-parte2-examen1.md' },
            { id: 'letra-2024-s1-p2-e2', title: '2024 S1 P2 Examen 2', file: 'letras/2024-S1-parte2-examen2.md' },
            { id: 'letra-2024-s1-p3-e1', title: '2024 S1 P3 Examen 1', file: 'letras/2024-S1-parte3-examen1.md' },
            { id: 'letra-2024-s1-p3-e2', title: '2024 S1 P3 Examen 2', file: 'letras/2024-S1-parte3-examen2.md' },
            { id: 'letra-2024-s2-p2', title: '2024 S2 Parte 2', file: 'letras/2024-S2-parte2.md' },
            { id: 'letra-2025-s1-p2', title: '2025 S1 Parte 2', file: 'letras/2025-S1-parte2.md' },
            { id: 'letra-2025-s1-p3', title: '2025 S1 Parte 3', file: 'letras/2025-S1-parte3.md' },
            { id: 'letra-2025-s1-p3-rec', title: '2025 S1 P3 Recuperatorio', file: 'letras/2025-S1-parte3-recuperatorio.md' },
            { id: 'letra-2025-s2-p2', title: '2025 S2 Parte 2', file: 'letras/2025-S2-parte2.md' },
            { id: 'letra-parentesco-p3', title: 'Parentesco Parte 3', file: 'letras/parentesco-parte3.md' },
            { id: 'letra-otaku', title: 'Festival Otaku (Completo)', file: 'letras/festivalOtaku-completo.md' },
            { id: 'letra-farmachop', title: 'Práctico 10 - Farmachop', file: 'letras/practico10-farmachop.md' },
        ]
    },
    {
        category: 'Soluciones',
        items: [
            { id: 'sol-avl', title: 'Inserciones AVL', file: 'soluciones/avl-inserciones.md' },
            { id: 'sol-bst-pelis', title: 'BST Películas', file: 'soluciones/bst-peliculas.md' },
            { id: 'sol-parentesco', title: 'Calcular Parentesco', file: 'soluciones/calcular-parentesco.md' },
            { id: 'sol-combo', title: 'Combo Viable', file: 'soluciones/combo-viable.md' },
            { id: 'sol-ltim', title: 'LTI Media', file: 'soluciones/lti-media.md' },
            { id: 'sol-hojas', title: 'Separar Hojas/Internos', file: 'soluciones/separar-hojas-internos.md' },
            { id: 'sol-2024s1-summary', title: '📌 Solución 2024-S1 (Info)', file: 'virtual/sol-2024s1-summary.md', virtual: true, virtualSource: 'sol-2024s1' },
            { id: 'sol-2024s1-tarbol', title: '   TArbolBB.java (Sol)', file: 'soluciones/Primer-parcial-Parte-3-2024-1er-Semestre/src/main/java/uy/edu/ucu/aed/TArbolBB.java' },
            { id: 'sol-2024s1-tprod', title: '   TArbolDeProductos.java', file: 'soluciones/Primer-parcial-Parte-3-2024-1er-Semestre/src/main/java/uy/edu/ucu/aed/TArbolDeProductos.java' },
            { id: 'sol-2024s1-telem', title: '   TElementoAB.java (Sol)', file: 'soluciones/Primer-parcial-Parte-3-2024-1er-Semestre/src/main/java/uy/edu/ucu/aed/TElementoAB.java' },
        ]
    },
    {
        category: 'Codigo Base',
        items: [
            { id: 'cb-2024s1-summary', title: '📌 Lab 2024-S1 (Info)', file: 'codigo-base/2024-S1/README.md', virtual: true, virtualSource: 'cb-2024s1' },
            { id: 'cb-2024s1-tarbol', title: '   TArbolBB.java', file: 'codigo-base/2024-S1/TArbolBB.java' },
            { id: 'cb-2024s1-telem', title: '   TElementoAB.java', file: 'codigo-base/2024-S1/TElementoAB.java' },
            { id: 'cb-2024s1-test', title: '   Parcial1Test.java', file: 'codigo-base/2024-S1/Parcial1Test_Junit5.java' },
            
            { id: 'cb-farmachop-summary', title: '📌 Lab Farmachop (Info)', file: 'codigo-base/farmachop/README.md', virtual: true, virtualSource: 'cb-farmachop' },
            { id: 'cb-farmachop-lista', title: '   Lista.java', file: 'codigo-base/farmachop/Lista.java' },
            { id: 'cb-farmachop-prog', title: '   Programa.java', file: 'codigo-base/farmachop/Programa.java' },
            
            { id: 'cb-festival-summary', title: '📌 Lab Festival Otaku (Info)', file: 'codigo-base/festival-otaku/README.md', virtual: true, virtualSource: 'cb-festival' },
            { id: 'cb-festival-lista', title: '   ListaEnlazada.java', file: 'codigo-base/festival-otaku/ListaEnlazada.java' },
            { id: 'cb-festival-cola', title: '   Cola.java', file: 'codigo-base/festival-otaku/Cola.java' },
            { id: 'cb-festival-conjunto', title: '   Conjunto.java', file: 'codigo-base/festival-otaku/Conjunto.java' },
            
            { id: 'cb-parentesco-summary', title: '📌 Lab Parentesco (Info)', file: 'codigo-base/parentesco/README.md', virtual: true, virtualSource: 'cb-parentesco' },
            { id: 'cb-parentesco-tarbol', title: '   TArbolBB.java', file: 'codigo-base/parentesco/TArbolBB.java' },
            { id: 'cb-parentesco-genea', title: '   Genealogia.java', file: 'codigo-base/parentesco/Genealogia.java' },
        ]
    },
    {
        category: 'Fuentes Java',
        items: [
            { id: 'java-full-reference', title: '📘 Guía Maestra Java', file: 'metodos_java.md' },
            { id: 'java-tarbol', title: 'TArbolBB (Genérico)', file: 'codigo-base/2024-S1/TArbolBB.java' },
            { id: 'java-telem', title: 'TElementoAB (Genérico)', file: 'codigo-base/2024-S1/TElementoAB.java' },
            { id: 'java-lista', title: 'Lista Enlazada', file: 'codigo-base/farmachop/Lista.java' },
            { id: 'java-nodo', title: 'Nodo Lista', file: 'codigo-base/farmachop/Nodo.java' },
            { id: 'java-cola', title: 'Cola TDA', file: 'codigo-base/festival-otaku/Cola.java' },
            { id: 'java-pila', title: 'Pila TDA', file: 'codigo-base/festival-otaku/Pila.java' },
            { id: 'java-conjunto', title: 'Conjunto TDA', file: 'codigo-base/festival-otaku/Conjunto.java' },
        ]
    },
    {
        category: 'Guias Practicas',
        items: [
            { id: 'guia-interactiva-general', title: 'Ruta Interactiva de Estudio', file: 'virtual/guia-interactiva-general.md', virtual: true },
            { id: 'codigo-base-mapa', title: 'Mapa Visual del Codigo Base', file: 'virtual/codigo-base-mapa.md', virtual: true },
            { id: 'practica-60-min', title: 'Practica Guiada 60 Min', file: 'virtual/practica-60-min.md', virtual: true }
        ]
    },
    {
        category: 'Primer Parcial',
        items: [
            { id: 'parcial1-plan', title: '📋 Plan de Resolución', file: 'virtual/parcial1-plan.md', virtual: true },
            { id: 'parcial1-naves-completo', title: '🚀 Solución Completa', file: 'soluciones/primer-parcial-naves.md' },
            { id: 'parcial1-naves-r1', title: 'R1: Recepción (Pseudo)', file: 'soluciones/parcial1-naves-r1.md' },
            { id: 'parcial1-naves-r2', title: 'R2: Procesamiento (Pseudo)', file: 'soluciones/parcial1-naves-r2.md' },
            { id: 'parcial1-naves-r3', title: 'R3: Historial AVL (Pseudo)', file: 'soluciones/parcial1-naves-r3.md' },
            { id: 'parcial1-naves-r4', title: 'R4: Cancelación (Pseudo)', file: 'soluciones/parcial1-naves-r4.md' },
            { id: 'parcial1-naves-modelado', title: 'Modelado y Entidades', file: 'soluciones/parcial1-naves-modelado.md' },
        ]
    }
];

const allItems = topics.flatMap(cat => cat.items);

let currentCategory = 'General';
let currentTopicId = null;
const progress = JSON.parse(localStorage.getItem('aed-progress-premium')) || {}; 

const sidebarNav = document.getElementById('sidebar-nav');
const sidebarTabs = document.getElementById('sidebar-tabs');
const searchInput = document.getElementById('search-input');
const markdownContent = document.getElementById('markdown-content');
const currentTopicTitle = document.getElementById('current-topic-title');
const currentCategoryBadge = document.getElementById('current-category-badge');
const topicCheckbox = document.getElementById('topic-checkbox');
const progressPercentage = document.getElementById('progress-percentage');
const progressBar = document.getElementById('progress-bar');
const contentWrapper = document.getElementById('content-wrapper');

let searchQuery = '';

function init() {
    renderTabs();
    setupTabs();
    setupSearch();
    renderSidebar();
    updateProgressUI();
    
    marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: true
    });
    
    const initialItems = topics.find(c => c.category === currentCategory).items;
    if (initialItems.length > 0) {
        loadTopic(initialItems[0].id);
    }

    topicCheckbox.addEventListener('change', (e) => {
        if (!currentTopicId) return;
        progress[currentTopicId] = e.target.checked;
        saveProgress();
        renderSidebar(); 
        updateProgressUI();
    });
}

function setupSearch() {
    searchInput.oninput = (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        if (searchQuery) {
            sidebarTabs.style.display = 'none';
        } else {
            sidebarTabs.style.display = 'grid';
        }
        renderSidebar();
    };
}

function setupTabs() {
    const btns = sidebarTabs.querySelectorAll('.tab-btn');
    btns.forEach(btn => {
        btn.onclick = () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            if (searchQuery) {
                searchQuery = '';
                searchInput.value = '';
                sidebarTabs.style.display = 'grid';
            }
            renderSidebar();

            const items = topics.find(c => c.category === currentCategory).items;
            if (items.length > 0 && !items.find(i => i.id === currentTopicId)) {
                loadTopic(items[0].id);
            }
        };
    });
}

function renderTabs() {
    sidebarTabs.innerHTML = '';
    topics.forEach((topicGroup, index) => {
        const cfg = tabsConfig[topicGroup.category] || { icon: 'fa-folder-open', label: topicGroup.category };
        const btn = document.createElement('button');
        btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
        btn.dataset.category = topicGroup.category;
        btn.innerHTML = `<i class="fa-solid ${cfg.icon}"></i> ${cfg.label}`;
        sidebarTabs.appendChild(btn);
    });
}

function getVirtualCodeBaseMarkdown(key) {
    const codeBaseGuides = {
        'cb-2024s1': {
            title: 'Lab 2024-S1 (Productos)',
            objective: 'Resolver metodos de ABB/AVL y logica sobre productos.',
            files: ['IArbolBB.java', 'IElementoAB.java', 'TArbolBB.java', 'TElementoAB.java', 'Producto.java', 'Parcial1Test.java']
        },
        'cb-farmachop': {
            title: 'Lab Farmachop (Practico 10)',
            objective: 'Resolver filtros por lista blanca/negra y validacion de preparado viable.',
            files: ['ILista.java', 'INodo.java', 'Lista.java', 'Nodo.java', 'Programa.java']
        },
        'cb-festival': {
            title: 'Lab Festival Otaku',
            objective: 'Practicar implementacion de TDAs y composicion para ejercicios de combinatoria.',
            files: ['TDALista.java', 'ListaEnlazada.java', 'TDACola.java', 'Cola.java', 'TDAPila.java', 'Pila.java', 'TDAConjunto.java', 'Conjunto.java']
        },
        'cb-parentesco': {
            title: 'Lab Parentesco',
            objective: 'Implementar calculo de parentesco en arbol genealogico invertido.',
            files: ['IArbolBB.java', 'IElementoAB.java', 'TArbolBB.java', 'TElementoAB.java', 'Genealogia.java', 'Persona.java']
        },
        'sol-2024s1': {
            title: 'Solución Completa 2024-S1',
            objective: 'Revisar la implementación resuelta del parcial 2024-S1 para comparar con tu código.',
            files: ['TArbolBB.java', 'TElementoAB.java', 'TArbolDeProductos.java', 'Main.java', 'ManejadorArchivosGenerico.java', 'Parcial1Test_Junit5.java']
        }
    };

    const guide = codeBaseGuides[key];
    if (!guide) return '# Guia no disponible';

    return `
# ${guide.title}

## Objetivo
${guide.objective}

## Archivos clave disponibles
${guide.files.map(f => `- \`${f}\``).join('\n')}

## Instrucciones
Utiliza los archivos de este laboratorio para practicar la implementación de los métodos requeridos en los parciales.
`;
}

function renderSidebar() {
    sidebarNav.innerHTML = '';
    let itemsToRender = [];
    let headerText = '';

    if (searchQuery) {
        itemsToRender = allItems.filter(i => 
            i.title.toLowerCase().includes(searchQuery) || 
            i.id.toLowerCase().includes(searchQuery)
        );
        headerText = `Resultados para: "${searchQuery}"`;
    } else {
        const category = topics.find(c => c.category === currentCategory);
        if (!category) return;
        itemsToRender = category.items;
        headerText = category.category;
    }

    const header = document.createElement('div');
    header.className = 'nav-category';
    header.innerHTML = `<span>${headerText}</span>`;
    sidebarNav.appendChild(header);

    if (itemsToRender.length === 0) {
        const empty = document.createElement('div');
        empty.style.padding = '1rem';
        empty.style.color = 'var(--text-muted)';
        empty.textContent = 'No se encontraron temas.';
        sidebarNav.appendChild(empty);
        return;
    }

    itemsToRender.forEach(topic => {
        const isCompleted = progress[topic.id];
        const isActive = topic.id === currentTopicId;
        const el = document.createElement('div');
        el.className = `nav-item ${isActive ? 'active' : ''}`;
        el.innerHTML = `
            <span>${topic.title}</span>
            ${isCompleted ? '<div class="status-icon"><i class="fa-solid fa-check"></i></div>' : ''}
        `;
        el.onclick = () => loadTopic(topic.id);
        sidebarNav.appendChild(el);
    });
}

function updateProgressUI() {
    const total = allItems.length;
    const completed = allItems.filter(t => progress[t.id]).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    progressPercentage.textContent = `${pct}%`;
    progressBar.style.width = `${pct}%`;
}

function saveProgress() {
    localStorage.setItem('aed-progress-premium', JSON.stringify(progress));
}

function enhanceCodeBlocks() {
    const codeBlocks = markdownContent.querySelectorAll('pre code');
    codeBlocks.forEach((block, index) => {
        const classList = Array.from(block.classList);
        const langClass = classList.find(c => c.startsWith('language-'));
        const language = langClass ? langClass.replace('language-', '') : 'code';
        hljs.highlightElement(block);
        const pre = block.parentElement;
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper fade-in';
        wrapper.style.animationDelay = `${index * 0.05}s`;
        const header = document.createElement('div');
        header.className = 'code-block-header';
        const langLabel = document.createElement('div');
        langLabel.className = 'code-language';
        langLabel.textContent = language;
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(block.innerText).then(() => {
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar';
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        };
        header.appendChild(langLabel);
        header.appendChild(copyBtn);
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(header);
        wrapper.appendChild(pre);
    });
}

async function loadTopic(id) {
    const topic = allItems.find(t => t.id === id);
    if (!topic) return;
    currentTopicId = id;
    markdownContent.classList.remove('fade-in');
    const parentCategory = topics.find(c => c.items.some(i => i.id === id));
    currentCategoryBadge.textContent = parentCategory ? parentCategory.category : 'General';
    currentTopicTitle.textContent = topic.title;
    topicCheckbox.disabled = false;
    topicCheckbox.checked = !!progress[id];
    
    if (parentCategory && parentCategory.category !== currentCategory) {
        currentCategory = parentCategory.category;
        const btns = sidebarTabs.querySelectorAll('.tab-btn');
        btns.forEach(b => b.classList.toggle('active', b.dataset.category === currentCategory));
    }

    renderSidebar(); 
    markdownContent.innerHTML = `<div class="loader-container"><div class="loader"></div><h3>Cargando...</h3></div>`;
    contentWrapper.scrollTop = 0;

    try {
        let text = '';
        if (topic.virtual) {
            if (virtualDocuments[id]) {
                text = virtualDocuments[id].markdown;
            } else if (topic.virtualSource) {
                text = getVirtualCodeBaseMarkdown(topic.virtualSource);
            } else {
                text = '# Contenido no disponible';
            }
        } else {
            const response = await fetch(topic.file);
            if (!response.ok) throw new Error('No se pudo cargar');
            text = await response.text();
            
            // Detect file type and wrap if necessary
            if (topic.file.endsWith('.java')) {
                text = `# Fuente: ${topic.title}\n\n\`\`\`java\n${text}\n\`\`\``;
            } else if (topic.file.endsWith('.txt')) {
                text = `# Datos: ${topic.title}\n\n\`\`\`text\n${text}\n\`\`\``;
            }
        }
        markdownContent.innerHTML = marked.parse(text);
        markdownContent.classList.add('fade-in');
        enhanceCodeBlocks();
    } catch (err) {
        markdownContent.innerHTML = `<div class="error-box fade-in"><i class="fa-solid fa-triangle-exclamation"></i><h3>Error cargando contenido</h3><p>No se pudo cargar <code>${topic.file}</code>.</p></div>`;
    }
}

document.addEventListener('DOMContentLoaded', init);
