# R3: Registro e Historial (Buffer + AVL)

Para optimizar la performance de búsqueda, el sistema migra de una lista lineal a un árbol AVL tras alcanzar un umbral de uso.

### 🌳 Estrategia Híbrida
- **Fase Inicial (0-74 tareas)**: Inserción en $O(1)$ en una `LinkedList` (buffer).
- **Migración (Tarea 75)**: Se vuelca el buffer al `AVLArbol` y se descarta la lista.
- **Fase Estable (75+ tareas)**: Inserción y búsqueda en $O(\log n)$ garantizado.

### 📝 Pseudocódigo: `registrarProcesada(tarea)`
```pascal
Metodo registrarProcesada(tarea)
    totalProcesadas <- totalProcesadas + 1
    
    // FASE 1: Buffer lineal
    Si totalProcesadas < 75 entonces
        bufferProcesadas.agregarAlFinal(tarea)
    
    // FASE 2: Migracion (Umbral alcanzado)
    Sino Si totalProcesadas = 75 entonces
        historial <- Nuevo AVLArbol()
        
        // Volcar lo viejo
        Para cada t en bufferProcesadas hacer
            historial.insertar(t)
        Fin Para
        
        // Insertar la actual
        historial.insertar(tarea)
        
        // Liberar el buffer para ahorrar memoria
        bufferProcesadas <- Nulo 
    
    // FASE 3: AVL Directo
    Sino
        historial.insertar(tarea)
    Fin Si
Fin Metodo

Metodo buscarTareaProcesada(id)
    Si totalProcesadas < 75 entonces
        // Busqueda O(n) permitida por el enunciado en fase inicial
        Retornar bufferProcesadas.buscarPorId(id)
    Sino
        // Busqueda O(log n) mediante AVL
        // Se usa CriterioPorId para buscar por entero, no por objeto Tarea
        Retornar historial.buscar(Nuevo CriterioPorId(id))
    Fin Si
Fin Metodo
```

### 💡 Por qué AVL?
Un **BST simple** puede degenerar en una lista (altura $O(n)$) si los IDs de las tareas llegan ordenados. El **AVL** realiza rotaciones para mantener la altura balanceada, asegurando que la búsqueda sea siempre eficiente.
