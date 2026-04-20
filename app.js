const topics = [
    { 
        category: 'General',
        items: [
            { id: 'guia', title: 'Guía de Estudio', file: 'guia-de-estudio.md' },
            { id: 'cuadernola', title: 'Cuadernola (Teoría)', file: 'cuadernola.md' },
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
            { id: 'pseudo-ej-pelis', title: 'Ejercicio: Películas', file: 'pseudocodigos/ejercicio-bst-peliculas.md' },
            { id: 'pseudo-ej-parentesco', title: 'Ejercicio: Parentesco', file: 'pseudocodigos/ejercicio-calcular-parentesco.md' },
            { id: 'pseudo-ej-combo', title: 'Ejercicio: Combo Viable', file: 'pseudocodigos/ejercicio-combo-viable.md' },
            { id: 'pseudo-ej-ltim', title: 'Ejercicio: LTIM', file: 'pseudocodigos/ejercicio-ltim.md' },
            { id: 'pseudo-ej-hojas', title: 'Ejercicio: Hojas/Internos', file: 'pseudocodigos/ejercicio-separar-hojas-internos.md' },
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
        ]
    }
];

// Flatten items for easier lookup
const allItems = topics.flatMap(cat => cat.items);

let currentCategory = 'General';
let currentTopicId = null;
const progress = JSON.parse(localStorage.getItem('aed-progress')) || {};

// DOM Elements
const sidebarNav = document.getElementById('sidebar-nav');
const sidebarTabs = document.getElementById('sidebar-tabs');
const searchInput = document.getElementById('search-input');
const markdownContent = document.getElementById('markdown-content');
const currentTopicTitle = document.getElementById('current-topic-title');
const topicCheckbox = document.getElementById('topic-checkbox');
const progressPercentage = document.getElementById('progress-percentage');
const progressBar = document.getElementById('progress-bar');
const contentWrapper = document.getElementById('content-wrapper');

let searchQuery = '';

function init() {
    setupTabs();
    setupSearch();
    renderSidebar();
    updateProgressUI();
    
    // Load first topic of initial category
    const initialItems = topics.find(c => c.category === currentCategory).items;
    if (initialItems.length > 0) {
        loadTopic(initialItems[0].id);
    }

    // Checkbox event
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
            renderSidebar();
            
            // Auto-load first item of new category if not already in it
            const items = topics.find(c => c.category === currentCategory).items;
            if (items.length > 0 && !items.find(i => i.id === currentTopicId)) {
                loadTopic(items[0].id);
            }
        };
    });
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

    // Render header
    const header = document.createElement('div');
    header.className = 'nav-category';
    header.textContent = headerText;
    sidebarNav.appendChild(header);

    if (itemsToRender.length === 0) {
        const empty = document.createElement('div');
        empty.style.padding = '1rem';
        empty.style.color = 'var(--text-muted)';
        empty.style.fontSize = '0.875rem';
        empty.textContent = 'No se encontraron temas.';
        sidebarNav.appendChild(empty);
        return;
    }

    // Render items
    itemsToRender.forEach(topic => {
        const isCompleted = progress[topic.id];
        const isActive = topic.id === currentTopicId;
        
        const el = document.createElement('div');
        el.className = `nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
        el.innerHTML = `
            <span>${topic.title}</span>
            ${isCompleted ? '<span class="status-icon">✓</span>' : ''}
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
    localStorage.setItem('aed-progress', JSON.stringify(progress));
}

async function loadTopic(id) {
    const topic = allItems.find(t => t.id === id);
    if (!topic) return;

    currentTopicId = id;
    currentTopicTitle.textContent = topic.title;
    topicCheckbox.disabled = false;
    topicCheckbox.checked = !!progress[id];
    
    // If the topic belongs to a different category, update the tabs
    const parentCategory = topics.find(c => c.items.some(i => i.id === id));
    if (parentCategory && parentCategory.category !== currentCategory) {
        currentCategory = parentCategory.category;
        const btns = sidebarTabs.querySelectorAll('.tab-btn');
        btns.forEach(b => {
            b.classList.toggle('active', b.dataset.category === currentCategory);
        });
    }

    renderSidebar(); 

    markdownContent.innerHTML = '<div class="loader-container"><div class="loader"></div><h2>Cargando contenido...</h2></div>';
    contentWrapper.scrollTop = 0;

    try {
        const response = await fetch(topic.file);
        if (!response.ok) throw new Error('No se pudo cargar el archivo');
        const text = await response.text();
        
        // Parse markdown
        markdownContent.innerHTML = marked.parse(text);
        
        // Highlight code blocks
        markdownContent.querySelectorAll('pre code').forEach((block) => {
            block.classList.add('hljs');
        });

    } catch (err) {
        markdownContent.innerHTML = `
            <div class="error-box">
                <h3>Error cargando el contenido</h3>
                <p>Archivo: <code>${topic.file}</code></p>
                <p>Verifica que el archivo exista en el repositorio.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', init);
