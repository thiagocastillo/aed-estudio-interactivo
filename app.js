const topics = [
    { id: 'guia', title: 'Guía de Estudio', file: 'content/guia-de-estudio.md' },
    { id: 'cuadernola', title: 'Cuadernola (Teoría)', file: 'content/cuadernola.md' },
    { id: 'arbol-binario', title: 'Árbol Binario', file: 'content/arbol-binario.md' },
    { id: 'arbol-bst', title: 'Árbol de Búsqueda Binaria (ABB)', file: 'content/arbol-bst.md' },
    { id: 'arbol-avl', title: 'Árbol AVL', file: 'content/arbol-avl.md' }
];

let currentTopicId = null;
const progress = JSON.parse(localStorage.getItem('aed-progress')) || {};

// DOM Elements
const sidebarNav = document.getElementById('sidebar-nav');
const markdownContent = document.getElementById('markdown-content');
const currentTopicTitle = document.getElementById('current-topic-title');
const topicCheckbox = document.getElementById('topic-checkbox');
const progressPercentage = document.getElementById('progress-percentage');
const progressBar = document.getElementById('progress-bar');
const contentWrapper = document.getElementById('content-wrapper');

function init() {
    renderSidebar();
    updateProgressUI();
    
    // Load first topic by default
    if (topics.length > 0) {
        loadTopic(topics[0].id);
    }

    // Checkbox event
    topicCheckbox.addEventListener('change', (e) => {
        if (!currentTopicId) return;
        progress[currentTopicId] = e.target.checked;
        saveProgress();
        renderSidebar(); // Update checkmarks in sidebar
        updateProgressUI();
    });
}

function renderSidebar() {
    sidebarNav.innerHTML = '';
    topics.forEach(topic => {
        const isCompleted = progress[topic.id];
        const isActive = topic.id === currentTopicId;
        
        const el = document.createElement('div');
        el.className = `nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
        el.innerHTML = `
            <span>${topic.title}</span>
            ${isCompleted ? '<span style="margin-left:auto;color:var(--success);">✓</span>' : ''}
        `;
        el.onclick = () => loadTopic(topic.id);
        sidebarNav.appendChild(el);
    });
}

function updateProgressUI() {
    const total = topics.length;
    const completed = topics.filter(t => progress[t.id]).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    progressPercentage.textContent = `${pct}%`;
    progressBar.style.width = `${pct}%`;
}

function saveProgress() {
    localStorage.setItem('aed-progress', JSON.stringify(progress));
}

async function loadTopic(id) {
    const topic = topics.find(t => t.id === id);
    if (!topic) return;

    currentTopicId = id;
    currentTopicTitle.textContent = topic.title;
    topicCheckbox.disabled = false;
    topicCheckbox.checked = !!progress[id];
    
    renderSidebar(); // update active state

    markdownContent.innerHTML = '<h2>Cargando...</h2>';
    contentWrapper.scrollTop = 0;

    try {
        const response = await fetch(topic.file);
        if (!response.ok) throw new Error('No se pudo cargar el archivo');
        const text = await response.text();
        
        // Parse markdown
        markdownContent.innerHTML = marked.parse(text);
    } catch (err) {
        markdownContent.innerHTML = `
            <div style="color: #ef4444; padding: 1rem; border: 1px solid #ef4444; border-radius: 8px; background: rgba(239,68,68,0.1);">
                <h3>Error cargando el contenido</h3>
                <p>Si estás abriendo el archivo localmente (file://), el navegador bloquea la carga por políticas de seguridad (CORS).</p>
                <p><strong>Solución:</strong> Abre esta carpeta con <em>Live Server</em> en VSCode o súbelo a GitHub Pages.</p>
            </div>
        `;
    }
}

// Start app
document.addEventListener('DOMContentLoaded', init);
