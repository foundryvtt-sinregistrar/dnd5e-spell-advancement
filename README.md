# D&D5e Spell Advancement

Módulo local para añadir avances `ItemChoice` nativos de D&D5e a clases que
necesitan abrir el Compendium Browser al obtener conjuros. No modifica ningún
compendio oficial.

## Alcance actual

Clérigo (PHB 2024):

- trucos de la lista de Clérigo: 3 a nivel 1, +1 a niveles 4 y 10;
- conjuros de la lista de Clérigo, excluyendo trucos: incrementos que llegan a
  22 conjuros preparados a nivel 20;
- el nivel máximo de conjuro se limita de forma nativa a los espacios de
  conjuro disponibles del actor;
- los trucos se crean siempre preparados y los conjuros como preparados, con
  Sabiduría como característica de lanzamiento.

Al crear un Clérigo, el módulo inicia un segundo `AdvancementManager` nativo
para registrar las elecciones. En subidas posteriores, D&D5e incorpora esos
avances en el mismo flujo normal de subida de nivel.

Bardo (PHB 2024):

- trucos de la lista de Bardo: 2 a nivel 1, +1 a niveles 4 y 10;
- conjuros preparados de Bardo hasta nivel 9, restringidos al nivel de espacio
  disponible;
- desde nivel 10, `Secretos mágicos` permite cada nuevo conjuro preparado de
  las listas de Bardo, Clérigo, Druida y Mago, tal como indica el rasgo oficial;
- los conjuros usan Carisma y se crean preparados.

## Actores existentes

El módulo no modifica automáticamente actores ya existentes. Para iniciar la
configuración de un Clérigo existente, ejecuta como propietario del Actor:

```js
await game.modules.get("dnd5e-spell-advancement").api.configureActorCleric(actor);
```

Para un Bardo existente:

```js
await game.modules.get("dnd5e-spell-advancement").api.configureActorBard(actor);
```

`actor` debe ser el Actor seleccionado o una referencia al Actor en una macro.
