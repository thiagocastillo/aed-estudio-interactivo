# R2: Procesamiento de Tareas (Prioridad)

Siempre se ejecuta primero la tarea de mayor criticidad disponible (menor número de criticidad).

### ⚙️ Lógica de Selección
1. Si hay tareas críticas (1 o 2), se saca la primera de `colaCriticas`.
2. Si no hay críticas, se saca la primera de `colaNormales` (3 o 4).
3. Al finalizar, se intenta "drenar" la cola de espera.

### 📝 Pseudocódigo: `procesarTarea()`
```pascal
Metodo procesarTarea()
    Variable tareaAProcesar : Tarea
    
    // 1. Prioridad absoluta a las criticas
    Si NO colaCriticas.esVacia() entonces
        tareaAProcesar <- colaCriticas.desencolar()
        criticasPendientes <- criticasPendientes - 1
    
    // 2. Si no hay criticas, vamos por las normales
    Sino Si NO colaNormales.esVacia() entonces
        tareaAProcesar <- colaNormales.desencolar()
    
    // 3. Sistema vacio
    Sino
        Retornar Nulo
    Fin Si
    
    // Actualizar contador global
    totalPendientes <- totalPendientes - 1
    
    // R3: Guardar en el historial
    registrarProcesada(tareaAProcesar)
    
    // IMPORTANTE: Al liberar un cupo, intentamos admitir las que esperaban
    drenarColaEspera()
    
    Retornar tareaAProcesar
Fin Metodo

Metodo drenarColaEspera()
    // Mientras haya espacio y tareas esperando, las intentamos meter
    Mientras NO colaEspera.esVacia() Y intentarIngresar(colaEspera.verFrente()) hacer
        // Si intentarIngresar devolvio true, la tarea ya se movio de estructura
        // Solo falta sacarla de la cola de espera fisica
        colaEspera.desencolar()
    Fin Mientras
Fin Metodo
```

### 💡 Puntos Clave
- **O(1) amortizado**: La selección es inmediata gracias a la organización de las colas.
- **Drenaje automático**: Garantiza que el sistema siempre esté a máxima capacidad si hay demanda.
