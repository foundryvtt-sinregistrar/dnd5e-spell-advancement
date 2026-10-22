# Informe de implementación

Fecha inicial: 2026-10-06
Actualización documental: 2026-10-23 (versión 1.14.4 pendiente de publicación)
Entorno validado: Foundry VTT 14.368 y D&D5e 6.0.5.

## Resultado

`dnd5e-spell-advancement` añade Advancements `ItemChoice` propios a los
ítems embebidos de clase o subclase del Actor. No modifica compendios
oficiales ni implementa un navegador alternativo: D&D5e abre su Compendium
Browser y aplica los conjuros seleccionados como Items del Actor.

Los avances se añaden al crear el ítem y se persisten en él. Las siguientes
subidas de nivel se resuelven con el `AdvancementManager` nativo de D&D5e.
Para un Actor ya existente, el API del módulo abre ese mismo gestor de forma
explícita.

## Procesamiento de Actores existentes

`configureExistingActors()` recorre únicamente los Actores de mundo que el
usuario actual puede modificar y que exponen `supportsAdvancement`. Detecta
clases y subclases compatibles por sus identificadores estables y omite los
ítems que ya contienen todos los Advancements del módulo.

Cada entrada se resuelve con `AdvancementManager.forNewAdvancement`; no se
crean conjuros directamente. Al completar el gestor, el hook confirmado de
D&D5e `dnd5e.advancementManagerComplete` abre el siguiente. Si el usuario
cierra un gestor, la cola se pausa para poder reintentar la misma entrada o
cancelarla explícitamente. Los conjuros importados se conservan como elecciones
históricas y siguen excluidos del Compendium Browser.

## Contenido implementado

La cola también se expone en Ajustes de partida mediante el API nativo
`game.settings.registerMenu`. La ventana registrada es restringida al GM y
controla el mismo API público del módulo; no reemplaza el selector ni modifica
datos de Actor directamente.

| Origen | Trucos | Conjuros de nivel 1+ | Aptitud |
| --- | --- | --- | --- |
| Clérigo | 3 (1), +1 (4, 10) | 4 en nivel 1; 22 en nivel 20 | Sabiduría |
| Bardo | 2 (1), +1 (4, 10) | Bardo hasta nivel 9; Secretos mágicos desde nivel 10 | Carisma |
| Druida | 2 (1), +1 (4, 10) | 4 en nivel 1; 22 en nivel 20 | Sabiduría |
| Hechicero | 4 (1), +1 (4, 10) | 2, 4, 6 y progresión oficial posterior | Carisma |
| Brujo | 2 (1), +1 (4, 10) | Magia del pacto: 2 en nivel 1; 15 en nivel 19 | Carisma |
| Explorador | — | Progresión oficial de semilanzador: 2 en nivel 1; 15 en nivel 19 | Sabiduría |
| Paladín | — | Progresión oficial de semilanzador: 2 en nivel 1; 15 en nivel 19 | Carisma |
| Mago | 3 (1), +1 (4, 10) | Libro: 6 conjuros de nivel 1 y 2 por cada nivel posterior | Inteligencia |
| Caballero arcano | 2 (3), +1 (10) | Progresión oficial de lanzador de un tercio, lista de Mago | Inteligencia |
| Tramposo arcano | Mano de mago fija, 2 (3), +1 (10) | Progresión oficial de lanzador de un tercio, lista de Mago | Inteligencia |

Las selecciones de nivel 1+ usan `restriction.level = "availableNoCantrips"`.
`ItemChoiceFlow` convierte esa restricción en un filtro desde nivel 1 hasta el
mayor espacio de conjuro disponible para la clase o subclase.

## Casos especiales

- **Secretos mágicos** se modela como un Advancement separado desde nivel 10,
  con listas de Bardo, Clérigo, Druida y Mago. Esto evita permitir dichas
  listas en elecciones de Bardo anteriores a nivel 10.
- **Mago** conserva el límite oficial de conjuros preparados en el Item de
  clase. El módulo selecciona los conjuros del libro como no preparados; el
  usuario usa la ficha para preparar los que correspondan.
- **Tramposo arcano** usa un `ItemGrant` nativo para `Mano de mago` y un
  `ItemChoice` separado para sus otros trucos.
- Las subclases se identifican por UUID de origen, nunca por el nombre
  localizado. El UUID de Caballero arcano se confirmó en el compendio
  instalado; el de Tramposo arcano se infirió de la convención del mismo pack
  y sigue requiriendo una prueba en un Actor que contenga esa subclase antes de
  considerarlo validado para una release nueva.

## Verificación realizada

- `node --check scripts/main.mjs` sin errores.
- `module.json` se parsea correctamente como JSON.
- La cola de Actores existentes se verificó contra `AdvancementManager` de
  D&D5e 6.0.5: `forNewAdvancement` y el hook
  `dnd5e.advancementManagerComplete` son los puntos de integración usados.
- Se comprobó que todos los IDs propios de Advancement tienen 16 caracteres
  alfanuméricos, requisito que provocó el primer error de Clérigo.
- `git diff --check` sin errores de espacios.
- Se revisaron las escalas y las descripciones de los paquetes fuente
  instalados de D&D5e y del Player's Handbook.

Se dejó una macro local de prueba llamada `Prueba avance Clerigo` en la
partida. La macro contiene la llamada al API para el Actor de prueba, pero no
se ejecutó desde el directorio de macros durante esta sesión; por tanto, no se
declara una validación visual completa del selector en este informe.

## Límites conocidos y siguiente decisión

- El módulo no automatiza los reemplazos que las reglas permiten tras un
  descanso largo o al ganar nivel. Las selecciones y los avances de nivel sí
  son nativos; el reemplazo diario requiere decidir si se expone el flujo
  `AdvancementManager.forModifyChoices` como acción explícita de ficha.
- Artífice no se ha implementado porque no figura entre las especificaciones
  aportadas, aunque su contenido puede estar disponible mediante Tasha. Antes
  de añadirlo hay que acordar si se usa la progresión 2014 de Tasha u otra.
- Los rasgos, dotes, especies y subclases distintos de Caballero arcano y
  Tramposo arcano no se incluyen aquí: sólo se incorporarán al disponer de su
  especificación y UUID/identificador de origen verificable.

## Historial Git

- `bf39189` — primera implementación de Clérigo en `develop`.
- `d7ae81a` / `743059c` — Bardo en `feature/bard-spell-advancement` y merge a
  `develop`.
- `b780cf1` — clases base restantes y subclases en
  `feature/core-spellcasters`.
