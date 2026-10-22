# D&D5e Spell Advancement

<p align="center">
  <img src="docs/foundry/assets/banner-spell-advancement.png" alt="D&amp;D5e Spell Advancement">
</p>

**Versión actual — Foundry v14**

![Foundry v14](https://img.shields.io/badge/Foundry-v14-green)
![Foundry verified 14.368](https://img.shields.io/badge/Verified-14.368-blue)
![System dnd5e 6.0.5](https://img.shields.io/badge/dnd5e-6.0.5-blue)

[![Latest Release](https://img.shields.io/github/v/release/foundryvtt-sinregistrar/dnd5e-spell-advancement?label=release)](https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement/releases/latest)
[![Downloads Latest Release](https://img.shields.io/github/downloads/foundryvtt-sinregistrar/dnd5e-spell-advancement/latest/total?label=descargas%20%C3%BAltima%20release)](https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement/releases/latest)

[![Downloads Total](https://img.shields.io/github/downloads/foundryvtt-sinregistrar/dnd5e-spell-advancement/total?label=descargas%20totales)](https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement/releases)

Requiere Foundry VTT 14.367 o posterior y D&D5e 6.0.5. Instálalo desde la
URL de manifiesto publicada en la release y actívalo en el mundo.

Módulo local para añadir avances `ItemChoice` nativos de D&D5e a clases que
necesitan abrir el Compendium Browser al obtener conjuros. No modifica ningún
compendio oficial.

Para detalles de implementación, compatibilidad y API, consulta la
[documentación técnica](docs/DOCUMENTACION-TECNICA.md).

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

Para procesar todos los Actores de mundo que poseas sin buscarlos uno a uno,
abre **Ajustes de partida → Procesar Actores existentes → Abrir
procesamiento** como GM. La ventana muestra los avances pendientes y permite
iniciar, reanudar o cancelar la cola. También puedes ejecutar esta macro como
GM o propietario de los Actores:

El ajuste de mundo **Mostrar registro detallado en consola** permite activar o
desactivar las trazas de diagnóstico del análisis y de la cola. Está activado
por defecto y sólo lo puede cambiar un GM.

```js
await game.modules.get("dnd5e-spell-advancement").api.configureExistingActors();
```

Al iniciar la cola, los avances cuyos cupos ya están cubiertos se guardan
automáticamente en el perfil de avance del Item de clase, usando como historial
los conjuros ya importados. No se añaden, eliminan ni modifican conjuros. Así,
una subida de nivel posterior no vuelve a pedir las elecciones históricas. La
macro abre un `AdvancementManager` nativo sólo para los déficits restantes.
Completa las elecciones de un Actor para pasar automáticamente al siguiente. Si
cierras un selector, la cola queda pausada y puedes reintentar esa misma entrada
con:

```js
await game.modules.get("dnd5e-spell-advancement").api.resumeExistingActorBatch();
```

Para abandonar la cola, sin deshacer los Actores ya completados:

```js
game.modules.get("dnd5e-spell-advancement").api.cancelExistingActorBatch();
```

`actor` debe ser el Actor seleccionado o una referencia al Actor en las macros
individuales anteriores.
