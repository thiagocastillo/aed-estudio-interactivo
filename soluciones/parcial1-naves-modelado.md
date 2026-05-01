# Modelado de Entidades

El diseño se basa en **Inmutabilidad** y **Tipado Fuerte**.

### 📦 Clase `Tarea`
Representa el evento atómico del sistema.
- `id` (int): Clave única.
- `descripcion` (String): Texto descriptivo.
- `criticidad` (int): 1-4.

```java
public final class Tarea implements Comparable<Tarea> {
    private final int id;
    private final String descripcion;
    private final int criticidad;

    // El orden natural es por ID para facilitar el AVL
    @Override
    public int compareTo(Tarea otra) {
        return Integer.compare(this.id, otra.id);
    }
}
```

### 🔍 Clase `CriterioPorId`
Clase auxiliar para búsquedas en el árbol sin instanciar tareas completas.

```java
public class CriterioPorId implements Comparable<Tarea> {
    private final int idBuscado;

    public CriterioPorId(int id) { this.idBuscado = id; }

    @Override
    public int compareTo(Tarea t) {
        return Integer.compare(this.idBuscado, t.getId());
    }
}
```

### 🏗️ Clase `SistemaGestionNave`
El "Cerebro" que contiene las estructuras:
- `ArrayDeque<Tarea> colaNormales`
- `ArrayDeque<Tarea> colaEspera`
- `List<Tarea> colaCriticas` (ordenada por criticidad)
- `AVLArbol<Tarea> historial`
