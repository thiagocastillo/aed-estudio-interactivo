# R4: Cancelación de Tareas

Se permite cancelar tareas pendientes basándose en su ID único. El historial es **inmutable**.

### 📝 Pseudocódigo: `cancelarTarea(id)`
```pascal
Metodo cancelarTarea(id)
    Variable encontrada : Booleano <- Falso
    
    // 1. Buscar en las tres colas de pendientes
    // IMPORTANTE: El historial AVL NO se consulta (es inmutable)
    
    Si colaCriticas.removerPorId(id) entonces
        criticasPendientes <- criticasPendientes - 1
        encontrada <- Verdadero
    
    Sino Si colaNormales.removerPorId(id) entonces
        encontrada <- Verdadero
    
    Sino Si colaEspera.removerPorId(id) entonces
        encontrada <- Verdadero
    Fin Si
    
    // 2. Si se cancelo algo, se libero un lugar
    Si encontrada entonces
        totalPendientes <- totalPendientes - 1
        
        // Re-intentar meter tareas de la cola de espera
        drenarColaEspera()
    Fin Si
    
    Retornar encontrada
Fin Metodo
```

### 💡 Puntos Clave
- **Integridad**: Solo las tareas "en tránsito" pueden borrarse.
- **Efecto Dominó**: Al cancelar una tarea que ocupaba un slot (`colaCriticas` o `colaNormales`), se debe disparar `drenarColaEspera()` para que una tarea en espera pueda subir.
- **Complejidad**: Es una búsqueda lineal en las colas, $O(n)$ en el peor caso de pendientes.
