# R1: Recepción de Tareas (Ingreso con Topes)

El sistema impone un tope global de **25 tareas** y un cupo de **10 críticas**.

### 🛠️ Estructuras Utilizadas
- `colaCriticas`: `ColaPrioridad` (o Lista Ordenada) que mantiene Criticidad 1 antes que 2, y FIFO ante empate.
- `colaNormales`: `Cola` (FIFO) para criticidades 3 y 4.
- `colaEspera`: `Cola` (FIFO) para tareas que no pudieron entrar.

### 📝 Pseudocódigo: `recibirTarea(tarea)`
```pascal
Metodo recibirTarea(tarea)
    // Se intenta ingresar la tarea al sistema
    Si intentarIngresar(tarea) entonces
        // Tarea admitida con éxito
        Log("Tarea " + tarea.id + " admitida.")
    Sino
        // Capacidad llena, va a espera para no descartar nada
        colaEspera.encolar(tarea)
        Log("Tarea " + tarea.id + " en espera.")
    Fin Si
Fin Metodo

Metodo intentarIngresar(tarea)
    // REGLA 1: Tope global de 25
    Si totalPendientes < 25 entonces
        
        // REGLA 2: Tope de 10 criticas (1 o 2)
        Si (tarea.criticidad = 1 O tarea.criticidad = 2) entonces
            Si criticasPendientes < 10 entonces
                colaCriticas.insertarOrdenado(tarea) // Prioridad 1 > 2, luego FIFO
                totalPendientes <- totalPendientes + 1
                criticasPendientes <- criticasPendientes + 1
                Retornar Verdadero
            Sino
                Retornar Falso // Cupo critico lleno
            Fin Si
        
        // Tareas normales (3 o 4)
        Sino
            colaNormales.encolar(tarea) // FIFO puro
            totalPendientes <- totalPendientes + 1
            Retornar Verdadero
        Fin Si
        
    Fin Si
    
    Retornar Falso // Tope global alcanzado
Fin Metodo
```

### 💡 Puntos Clave
- **No se descartan tareas**: Lo que no entra va a `colaEspera`.
- **Doble validación**: Se chequea el total y luego el cupo específico de críticas.
