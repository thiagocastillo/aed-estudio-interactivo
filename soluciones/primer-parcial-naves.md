# Solución: Sistema de Gestión de Tareas (Naves Autónomas)

Este panel detalla la resolución técnica del primer parcial, enfocándose en la gestión eficiente de tareas críticas y el uso de estructuras balanceadas para el historial.

## 🚀 Arquitectura del Sistema

El sistema utiliza un **Agregado de Servicio** (`SistemaGestionNave`) que coordina múltiples estructuras internas:

- **Colas de Pendientes**: 
    - `colaCriticas`: Prioridad por criticidad (1-2) + FIFO.
    - `colaNormales`: FIFO estricto para criticidades 3-4.
- **Cola de Espera**: Para tareas que exceden la capacidad momentánea.
- **Historial**: 
    - `bufferProcesadas`: Lista enlazada (hasta 74 tareas).
    - `historial`: Árbol AVL (desde la tarea 75 en adelante).

---

## 📋 R1: Recepción de Tareas (Ingreso con Topes)

El sistema impone un tope global de **25 tareas** y un cupo de **10 críticas**.

### Pseudocódigo: `recibirTarea(tarea)`
```pascal
Metodo recibirTarea(tarea)
    // Se intenta ingresar la tarea al sistema
    Si intentarIngresar(tarea) entonces
        // Tarea admitida en colaCriticas o colaNormales
    Sino
        // Capacidad llena, va a espera
        colaEspera.encolar(tarea)
    Fin Si
Fin Metodo

Metodo intentarIngresar(tarea)
    // Regla: Max 25 total, Max 10 criticas
    Si totalPendientes < 25 entonces
        Si tarea.esCritica() Y criticasPendientes < 10 entonces
            colaCriticas.insertarOrdenado(tarea) // Prioridad 1 > 2, luego FIFO
            totalPendientes <- totalPendientes + 1
            criticasPendientes <- criticasPendientes + 1
            Retornar Verdadero
        Sino Si NO tarea.esCritica() entonces
            colaNormales.encolar(tarea) // FIFO puro
            totalPendientes <- totalPendientes + 1
            Retornar Verdadero
        Fin Si
    Fin Si
    Retornar Falso
Fin Metodo
```

---

## ⚙️ R2: Procesamiento de Tareas (Prioridad)

Siempre se procesa la tarea más crítica disponible.

### Pseudocódigo: `procesarTarea()`
```pascal
Metodo procesarTarea()
    Variable tareaAProcesar : Tarea
    
    Si NO colaCriticas.esVacia() entonces
        tareaAProcesar <- colaCriticas.desencolar()
        criticasPendientes <- criticasPendientes - 1
    Sino Si NO colaNormales.esVacia() entonces
        tareaAProcesar <- colaNormales.desencolar()
    Sino
        Retornar Nulo // Nada para procesar
    Fin Si
    
    totalPendientes <- totalPendientes - 1
    
    // Registrar en historial (R3)
    registrarProcesada(tareaAProcesar)
    
    // Al liberar cupo, intentamos meter las de la cola de espera
    drenarColaEspera()
    
    Retornar tareaAProcesar
Fin Metodo
```

---

## 🌳 R3: Historial y Búsqueda (AVL)

Garantiza búsqueda $O(\log n)$ tras alcanzar el umbral de 75 tareas.

### Pseudocódigo: `registrarProcesada(tarea)`
```pascal
Metodo registrarProcesada(tarea)
    totalProcesadas <- totalProcesadas + 1
    
    Si totalProcesadas < 75 entonces
        bufferProcesadas.agregarAlFinal(tarea)
    Sino Si totalProcesadas = 75 entonces
        // Momento de la migración al árbol
        historial <- Nuevo AVLArbol()
        Para cada t en bufferProcesadas hacer
            historial.insertar(t)
        Fin Para
        historial.insertar(tarea)
        bufferProcesadas <- Nulo // Liberar memoria
    Sino
        // Ya estamos en fase AVL
        historial.insertar(tarea)
    Fin Si
Fin Metodo
```

### Pseudocódigo: `buscarTareaProcesada(id)`
```pascal
Metodo buscarTareaProcesada(id)
    Si totalProcesadas < 75 entonces
        // Búsqueda lineal en el buffer
        Retornar bufferProcesadas.buscarPorId(id)
    Sino
        // Búsqueda logarítmica en el AVL
        // Se usa un CriterioPorId para comparar sin crear una Tarea ficticia
        Retornar historial.buscar(Nuevo CriterioPorId(id))
    Fin Si
Fin Metodo
```

---

## ❌ R4: Cancelación de Tareas

Solo se pueden cancelar tareas que aún no han sido procesadas.

### Pseudocódigo: `cancelarTarea(id)`
```pascal
Metodo cancelarTarea(id)
    Variable encontrada : Booleano <- Falso
    
    // 1. Buscar y remover de colas activas
    Si colaCriticas.removerPorId(id) entonces
        criticasPendientes <- criticasPendientes - 1
        encontrada <- Verdadero
    Sino Si colaNormales.removerPorId(id) entonces
        encontrada <- Verdadero
    Sino Si colaEspera.removerPorId(id) entonces
        encontrada <- Verdadero
    Fin Si
    
    Si encontrada entonces
        totalPendientes <- totalPendientes - 1
        // Se liberó un lugar, intentamos mover de espera a pendientes
        drenarColaEspera()
    Fin Si
    
    Retornar encontrada
Fin Metodo
```

---

## 🧠 Decisiones Clave de Diseño

1. **Inmutabilidad de `Tarea`**: Todos los campos son `final`. Una tarea procesada no debe cambiar.
2. **CriterioPorId**: Permite cumplir el contrato de búsqueda del TDA Árbol (`Comparable`) sin instanciar objetos `Tarea` incompletos.
3. **AVL vs BST**: El AVL garantiza balanceo ante IDs que lleguen ordenados (peor caso del BST), asegurando siempre la performance prometida de $O(\log n)$.
4. **Drenaje de Espera**: Se debe ejecutar tanto al procesar como al cancelar, para maximizar el throughput de la nave.
