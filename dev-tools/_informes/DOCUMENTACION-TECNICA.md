# Documentación técnica — D&D5e Spell Advancement

Fecha de revisión: 2026-10-21  
Versión documentada: 1.14.0 (rama `main`)  
Entorno objetivo: Foundry VTT 14.367–14.368 y sistema D&D5e 6.0.5.

## 1. Propósito

`dnd5e-spell-advancement` complementa el contenido de clases, subclases y
Actores existentes con elecciones de conjuros que D&D5e puede resolver de
forma nativa. Su objetivo no es crear un nuevo sistema de magia ni un
navegador propio: añade datos `Advancement` de tipo `ItemChoice` al ítem de
clase o subclase embebido en el Actor.

El flujo resultante es el del propio sistema:

```text
Actor / subida de nivel
  -> Item de clase o subclase
  -> Advancement ItemChoice (type: spell)
  -> Compendium Browser de D&D5e
  -> elección confirmada por el usuario
  -> Item de conjuro creado o configurado por D&D5e en el Actor
```

Consecuencias importantes:

- El módulo no modifica compendios oficiales ni premium.
- El módulo no inserta conjuros directamente en un Actor como sustituto de una
  elección. La resolución la realiza `ItemChoice`.
- Las selecciones quedan registradas en el Advancement del ítem, de modo que
  las subidas posteriores siguen el modelo de datos de D&D5e.
- Las restricciones de lista, nivel, escuela y cantidad se aplican en el
  Compendium Browser nativo.

El punto de entrada principal es `scripts/main.mjs`; `module.json` carga ese
archivo como módulo ES.

## 2. Compatibilidad y dependencias

| Componente | Requisito | Uso en el módulo |
| --- | --- | --- |
| Foundry VTT | 14.367 mínimo; 14.368 verificado | Hooks, `ApplicationV2`, ajustes de mundo, Items y Actores. |
| D&D5e | 6.0.5 | `ItemChoice`, `ItemGrant`, `AdvancementManager` y `CompendiumBrowser`. |
| Babele u otros módulos | No requerido | Puede traducir nombres de documentos; por eso el módulo no usa nombres como identidad. |

Las integraciones con D&D5e se limitan a sus mecanismos existentes:

- `CONFIG.DND5E.advancementTypes.ItemChoice.documentClass` para construir
  Advancements.
- `dnd5e.applications.advancement.AdvancementManager.forNewAdvancement()`
  para abrir el gestor nativo.
- `dnd5e.applications.CompendiumBrowser` para seleccionar conjuros.
- Hook `dnd5e.advancementManagerComplete` para avanzar una cola de Actores.

Si cambia la API o los datos internos de D&D5e, el primer lugar que debe
revisarse es `scripts/main.mjs`, especialmente `configureClass`,
`installExistingSpellExclusion` y `removeEmptyItemGrantRestoreSteps`.

## 3. Modelo de un Advancement de conjuro

Un `ItemChoice` creado por el módulo contiene cuatro áreas fundamentales:

| Campo | Responsabilidad |
| --- | --- |
| `configuration.choices` | Indica en qué nivel del ítem se solicita una elección y cuántos conjuros se eligen. Las claves son niveles de clase/subclase, no niveles de conjuro. |
| `configuration.restriction` | Delimita el catálogo: lista de conjuros, nivel y, si procede, escuela. |
| `configuration.spell` | Define cómo se crea el conjuro: característica, método, estado preparado y uso de espacios. |
| `value` | Guarda `added` y `replaced`; D&D5e registra aquí el historial de las elecciones aplicadas. |

Ejemplo conceptual de un conjuro preparado de Clérigo:

```js
{
  type: "ItemChoice",
  configuration: {
    choices: { 1: { count: 4 }, 2: { count: 1 } },
    restriction: {
      level: "availableNoCantrips",
      list: ["class:cleric"],
      school: []
    },
    spell: {
      ability: ["wis"],
      method: "spell",
      prepared: 1,
      uses: { max: "", per: "", requireSlot: false }
    },
    type: "spell"
  },
  value: { added: {}, replaced: {} }
}
```

`restriction.level = "0"` se utiliza para trucos. La restricción
`"availableNoCantrips"` permite niveles de conjuro desde 1 hasta el mayor
espacio disponible que D&D5e determina para el Actor, evitando que se elijan
trucos o conjuros de nivel aún inaccesible.

`count` es un incremento para ese nivel del Advancement, no el número total
de conjuros que un personaje conoce en toda su ficha.

## 4. Contenido de progresión soportado

Las tablas de progresión residen como constantes en `scripts/main.mjs`.

### 4.1 Clérigo y Bardo

`clericAdvancements()` crea dos elecciones:

1. Trucos de Clérigo: 3 en nivel 1, uno adicional en niveles 4 y 10.
2. Conjuros preparados: cuatro en nivel 1 y los incrementos hasta nivel 20;
   siempre dentro de la lista de Clérigo y limitados por espacios disponibles.

`bardAdvancements()` implementa tres avances:

1. Trucos de Bardo: 2 en nivel 1, uno adicional en 4 y 10.
2. Conjuros de Bardo hasta nivel 9.
3. `Secretos mágicos` desde nivel 10, con listas de Bardo, Clérigo, Druida y
   Mago. Mantenerlo separado evita ampliar la lista del Bardo antes de que las
   reglas lo permitan.

### 4.2 Otras clases base

`BASE_CLASS_SPELLCASTERS` describe los perfiles y `baseClassAdvancements()`
los transforma en Advancements:

| Clase | Característica | Trucos | Selección de nivel 1+ |
| --- | --- | --- | --- |
| Druida | Sabiduría | 2 en 1; +1 en 4 y 10 | Preparados de lista de Druida. |
| Hechicero | Carisma | 4 en 1; +1 en 4 y 10 | Preparados de lista de Hechicero. |
| Brujo | Carisma | 2 en 1; +1 en 4 y 10 | Progresión de Magia del pacto. |
| Explorador | Sabiduría | No configurado | Preparados de semilanzador. |
| Paladín | Carisma | No configurado | Preparados de semilanzador. |
| Mago | Inteligencia | 3 en 1; +1 en 4 y 10 | Libro: 6 conjuros en nivel 1 y 2 por nivel posterior. |

El caso del Mago es distinto: los conjuros del libro se crean con
`prepared: 0`. El límite de conjuros preparados sigue siendo el de la clase
oficial y se gestiona desde la ficha del Actor.

### 4.3 Subclases

`SUBCLASS_SPELLCASTERS` identifica subclases mediante UUID de origen oficial,
no por nombres localizados:

- Caballero arcano: trucos y progresión de lanzador de un tercio de la lista
  de Mago.
- Tramposo arcano: la misma progresión y un `ItemGrant` nativo obligatorio de
  `Mano de mago` en nivel 3.

El `ItemGrant` no se sustituye por creación manual de Items: D&D5e continúa
siendo quien concede el conjuro fijo.

## 5. Ciclo de configuración de una clase

La función central es `configureClass(classItem)`.

1. Calcula los datos de avance con `advancementsForClass(classItem)`.
2. Exige que el ítem esté embebido en un Actor y que el Actor exponga
   `system.metadata.supportsAdvancement`.
3. Ejecuta `seedImportedSpellChoices` para preservar conjuros de clase ya
   importados como elecciones históricas del Advancement nuevo.
4. Descarta los Advancements que el ítem ya contiene; el proceso es
   idempotente para avances ya instalados.
5. Instancia los datos faltantes como `ItemChoice` y llama a
   `AdvancementManager.forNewAdvancement(actor, classItem.id, advancements)`.
6. Renderiza el gestor si este tiene pasos pendientes.

Estados significativos que puede devolver:

| Estado | Significado |
| --- | --- |
| `rendered` | Se abrió el gestor nativo con elecciones pendientes. |
| `already-configured` | La clase ya tenía todos los Advancements del módulo. |
| `unsupported-actor` | El Actor no admite Advancements. |
| `no-steps` | El gestor no tenía pasos que resolver. |

Cuando se crea un ítem de clase o subclase, el hook `createItem` programa
`configureClass(item)` en el siguiente ciclo. Esto evita solaparse con la
confirmación de un `AdvancementManager` que haya creado el ítem.

## 6. Actores existentes e importados

El análisis separa los avances ausentes en dos resultados: los que conservan
un déficit de elecciones se incorporan a la cola y abren el
`AdvancementManager` nativo; los que ya quedan cubiertos por conjuros
importados se muestran como **Sin selección necesaria**. Al pulsar **Iniciar
cola**, esta segunda ruta instala automáticamente los `ItemChoice` faltantes
en el Item de clase con su `value.added` ya reconciliado. Para ello usa la API
pública `Item#createAdvancement` de D&D5e, por lo que conserva sus validaciones
y migraciones. No crea, elimina ni modifica conjuros: sólo registra los UUID de
los existentes como elecciones históricas. El cálculo reutiliza las mismas dos
bolsas (trucos y nivel 1+) y la misma deduplicación por `system.identifier` /
documento de compendio que la reconciliación que prepara el gestor.

Si el ajuste de mundo **Mostrar registro detallado en consola** está activado,
al pulsar **Analizar** o iniciar la cola el módulo registra en consola una
traza estructurada por Actor/clase con sus IDs, avances ausentes, cupos
requeridos/asignados, déficit y decisión (`pending-choice` o `reconciled`). La
traza no se emite durante los repintados ordinarios de la interfaz. El ajuste
está activado por defecto y es restringido a GM.

El módulo puede actuar sobre una clase concreta o recorrer las clases y
subclases compatibles que el usuario actual puede modificar.

### API pública

Tras el hook `ready`, el módulo publica estas funciones en
`game.modules.get("dnd5e-spell-advancement").api`:

| Función | Uso |
| --- | --- |
| `configureCleric(item)` / `configureBard(item)` | Configura un ítem de clase conocido. |
| `configureActorCleric(actor)` / `configureActorBard(actor)` | Busca esa clase en un Actor y abre el gestor. |
| `configureActorClass(actor, identifier)` | Configura una clase base soportada por su identificador D&D5e. |
| `configureActorSubclass(actor, origin)` | Configura una subclase según su UUID de origen. |
| `findExistingActorSpellAdvancements(actors)` | Devuelve las clases/subclases compatibles con avances pendientes. |
| `configureExistingActors(actors)` | Inicia la cola secuencial. |
| `resumeExistingActorBatch()` | Reintenta la entrada actualmente pausada. |
| `cancelExistingActorBatch()` | Cancela la cola sin deshacer entradas ya completadas. |

### Preservación del historial importado

`seedImportedSpellChoices` busca conjuros del Actor que pertenezcan a la clase
en configuración mediante `system.sourceItem` o `system.classIdentifier`.
Sólo toma conjuros que tengan procedencia de compendio (`sourceId`).
`importedClassSpellsByLevel` los agrupa por `system.level` y elimina
equivalentes mediante identificador D&D5e, ID de documento de compendio o UUID
de origen. Después construye dos bolsas: trucos (nivel 0) y conjuros de nivel
1+. Cada bolsa cubre primero, en orden de los niveles de clase ya alcanzados,
las elecciones históricas del Advancement. El excedente se conserva en el
Actor; si la bolsa no cubre una elección, D&D5e muestra sólo ese déficit en el
selector nativo.

Para cada elección histórica elegible, registra en `value.added` el ID local
del Item y su UUID de procedencia.

Esto tiene dos efectos:

- No recrea ni borra conjuros importados.
- Hace que D&D5e considere cubiertas las elecciones históricas adecuadas al
  añadir los nuevos Advancements.

### Cola y menú de Ajustes de partida

`ExistingActorBatchConfig` es una aplicación `ApplicationV2` con la plantilla
`templates/existing-actors-config.hbs`. Se registra mediante
`game.settings.registerMenu` como una opción restringida para GM:

```text
Ajustes de partida
  -> D&D5e Spell Advancement
  -> Procesar Actores existentes
```

La ventana puede analizar, iniciar, reanudar y cancelar. No implementa un
selector de conjuros: sólo controla `configureExistingActors` y muestra el
estado de la cola.

`advanceExistingActorBatch` abre un gestor nativo por vez. Después de que
D&D5e emita `dnd5e.advancementManagerComplete`, el hook del módulo marca la
entrada como completada y programa la siguiente. Si el usuario cierra el
gestor sin completarlo, la entrada sigue disponible para reanudarse o
cancelarse.

## 7. Prevención de conjuros duplicados

La exclusión se instala en `installExistingSpellExclusion()`. El módulo envuelve
la acción `browse` de `ItemChoiceFlow` sin sustituir al Compendium Browser.

Hay tres niveles de comparación, en este orden:

| Comparación | Fuente | Finalidad |
| --- | --- | --- |
| UUID completo | `flags.dnd5e.sourceId` o `_stats.compendiumSource` | Oculta el mismo documento de compendio. |
| Identificador D&D5e | `system.identifier` / `item.identifier` | Reconoce el mismo conjuro entre documentos con UUID distinto. |
| ID de documento de compendio | Segmento final de `Compendium.<pack>.Item.<id>` frente a `item.id` | Cubre paquetes 2024 equivalentes cuando una traducción o índice no expone el identificador canónico. |

El primer y segundo nivel se añaden al filtro bloqueado del navegador como
filtros arbitrarios `NOT ... IN`. El tercer nivel se aplica mediante el
callback nativo `prerequisites.validate`, porque el documento completo del
resultado ya está disponible y se puede comparar su `item.id` sin depender de
los campos del índice.

Si un resultado coincide, `validateSpellChoice` añade al `Map` de
prerrequisitos una entrada inválida con la etiqueta «El Actor ya tiene este
conjuro». El Compendium Browser de D&D5e interpreta `valid: false` y, con sus
prerrequisitos forzados, evita confirmarlo. No se compara el nombre visible;
esto evita errores por idioma, acentos o traducciones de Babele.

Ejemplo de equivalencia cubierta:

```text
Compendium.dnd5e.spells24.Item.phbsplBless00000
Compendium.dnd-players-handbook.spells.Item.phbsplBless00000
                                      ^^^^^^^^^^^^^^^^^
                                      mismo ID de documento
```

## 8. Restricción del rango de nivel de conjuro

`installSpellLevelRangeControls()` envuelve el manejo de cambios de formulario
del navegador nativo para conservar un intervalo máximo definido por el
Advancement. La opción `dsaSpellLevelRange` guarda ese límite duro. El usuario
puede acotar el intervalo visible dentro del permitido, pero no ampliarlo más
allá de los espacios disponibles del Actor.

La lógica se usa al construir el navegador desde la acción `browse`:

1. Lee `restriction.level`.
2. Para `availableNoCantrips`, consulta el máximo permitido por el flujo de
   D&D5e y crea un intervalo de 1 hasta dicho máximo.
3. Conserva los filtros de clase y escuela de la configuración del
   `ItemChoice`.
4. Pasa el intervalo mediante `dsaSpellLevelRange` al `CompendiumBrowser`.

## 9. Defensa ante ItemGrant importados vacíos

D&D5e 6.0.5 puede construir pasos de reversión/restauración al añadir un
Advancement nuevo. Un `ItemGrant` importado cuyo `value.added` esté vacío no
tiene datos para restaurar; el sistema intenta acceder a `undefined.items`.

`removeEmptyItemGrantRestoreSteps(manager)` elimina exclusivamente los pasos
automáticos `reverse` y `restore` asociados a esos `ItemGrant` vacíos. El
`ItemGrant` original no se modifica ni se eliminan pasos que sí contengan
elementos concedidos. Esta intervención mínima se ejecuta tras crear el
`AdvancementManager` y antes de renderizarlo.

## 10. Límites funcionales actuales

- El módulo no gestiona reemplazos diarios de conjuros ni ofrece una interfaz
  propia para modificar elecciones ya confirmadas.
- No añade automáticamente los conjuros que faltan a un Actor importado; el
  usuario los selecciona en el flujo nativo.
- Las dotes, especies y rasgos no incluidos explícitamente no reciben
  Advancements del módulo.
- Artífice no está en los perfiles base actuales.
- La compatibilidad está validada contra D&D5e 6.0.5; una actualización mayor
  del sistema requiere revisar las APIs indicadas en la sección 2.

## 11. Desarrollo, validación y empaquetado

Los comandos definidos en `package.json` son:

```powershell
npm.cmd run validate
npm.cmd run build:release
npm.cmd run test:release
node --check scripts/main.mjs
git diff --check
```

`validate` comprueba el manifiesto y los requisitos de release. `test:release`
ejecuta la prueba de empaquetado y verifica que el ZIP contiene una única raíz
de módulo con su `module.json`.

Para una comprobación manual en Foundry:

1. Recargar el mundo después de cambiar `scripts/main.mjs`.
2. Abrir un Actor compatible y usar la API individual o el menú de
   procesamiento de Actores existentes.
3. Abrir el selector nativo sin confirmar ninguna elección.
4. Verificar que los conjuros ya presentes se ocultan o quedan deshabilitados
   y que no aparece ningún error en consola.
5. Cancelar la cola si la prueba no debe modificar los Advancements del Actor.

## 12. Archivos relevantes

| Ruta | Contenido |
| --- | --- |
| `module.json` | Identidad, versión, compatibilidad y punto de entrada ES. |
| `scripts/main.mjs` | Toda la lógica de perfiles, Advancements, navegador, API y cola. |
| `templates/existing-actors-config.hbs` | Interfaz del menú de procesamiento masivo. |
| `README.md` | Guía de uso y alcance de usuario. |
| `CHANGELOG.md` | Cambios por versión, incluidos los filtros de equivalencia. |
| `dev-tools/buildScripts/` | Validación y construcción de releases. |
| `tests/test_build_release.py` | Prueba de estructura del paquete de release. |

## 13. Principios para cambios futuros

1. Preferir siempre `Advancement`, `ItemChoice`, `ItemGrant` y
   `AdvancementManager` de D&D5e frente a creación manual de conjuros.
2. Identificar documentos por UUID, `system.identifier` o ID de documento; no
   por nombres mostrados en la interfaz.
3. Mantener los cambios mínimos y limitados a los flujos soportados.
4. No modificar packs oficiales ni premium.
5. Antes de ampliar una clase, rasgo o subclase, verificar su progreso y UUID
   contra los datos de D&D5e instalados.
6. Repetir validación estática, empaquetado y una prueba visual con el Actor
   exacto que se desea soportar.
