# D&D5e Spell Advancement

![Foundry VTT 14.368](https://img.shields.io/badge/Foundry_VTT-14.367--14.368-green)
![D&D5e 6.0.5](https://img.shields.io/badge/D%26D5e-6.0.5-blue)
[![Latest release](https://img.shields.io/github/v/release/foundryvtt-sinregistrar/dnd5e-spell-advancement?label=release)](https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement/releases/latest)

Requiere Foundry VTT 14.367 o posterior y D&D5e 6.0.5. Instálalo desde la
URL de manifiesto publicada en la release y actívalo en el mundo.

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
- el Navegador de Compendios permite acotar el intervalo de nivel mostrado;
  por ejemplo, cuando estén disponibles los niveles 1 y 2, se puede mostrar
  1–2, sólo 1–1 o sólo 2–2, sin poder ampliar el intervalo permitido;
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

Otras clases base del PHB 2024:

| Clase | Lista | Aptitud | Selecciones implementadas |
| --- | --- | --- | --- |
| Druida | Druida | Sabiduría | Trucos y conjuros preparados |
| Hechicero | Hechicero | Carisma | Trucos y conjuros preparados |
| Brujo | Brujo | Carisma | Trucos y conjuros de Magia del pacto |
| Explorador | Explorador | Sabiduría | Conjuros preparados |
| Paladín | Paladín | Carisma | Conjuros preparados |
| Mago | Mago | Inteligencia | Trucos y conjuros del libro de conjuros |

El Mago selecciona seis conjuros de nivel 1 para el libro y dos por cada nivel
posterior. Estos se añaden sin preparar; el límite oficial de conjuros
preparados permanece en la clase y el jugador los prepara desde la ficha.

Subclases del PHB instaladas:

- **Caballero arcano**: dos trucos de Mago en nivel 3, otro en nivel 10 y los
  incrementos de conjuros preparados de la tabla de lanzador de un tercio.
- **Tramposo arcano**: la misma progresión, más `Mano de mago` concedida de
  forma fija en nivel 3; sus dos primeros trucos siguen siendo elecciones.

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

Las demás clases base se configuran con su identificador de D&D5e:

```js
await game.modules.get("dnd5e-spell-advancement")
  .api.configureActorClass(actor, "druid");
```

Identificadores disponibles: `druid`, `sorcerer`, `warlock`, `ranger`,
`paladin` y `wizard`.

Las subclases se detectan por su UUID de origen oficial al añadirse al Actor.

## Actores importados

Al configurar un Actor importado, el módulo registra los conjuros de su clase
ya existentes como elecciones históricas. El Compendium Browser nativo excluye
los conjuros que el Actor ya posee, para que no puedan volver a elegirse al
resolver los avances pendientes.

`actor` debe ser el Actor seleccionado o una referencia al Actor en una macro.
