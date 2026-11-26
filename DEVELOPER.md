# DEVELOPER.md

## Contexto
Proyecto para Foundry VTT V14 y **D&D5e 6.0.6** (versión objetivo confirmada por el usuario). Se investiga la adquisición/selección automática de conjuros mediante Advancements nativos.

## Objetivo
Cuando un Actor obtenga o deba elegir conjuros por clase, subclase, rasgo, dote o subida de nivel, reutilizar:

`Advancement → ItemChoice → type: spell → restricciones → Compendium Browser → selección → Actor`.

No crear un navegador alternativo.

## Evidencia confirmada
Item oficial inspeccionado:
`Compendium.dnd-players-handbook.feats.Item.phbftMagicInitia`
(`Iniciado en la magia / Magic Initiate`).

### Dos trucos
```javascript
{
  type: "ItemChoice",
  configuration: {
    allowDrops: true,
    choices: { "0": { count: 2, replacement: true } },
    pool: [],
    restriction: {
      list: ["class:cleric", "class:druid", "class:wizard"],
      level: "0",
      school: []
    },
    spell: {
      ability: ["int", "wis", "cha"],
      method: "spell",
      uses: { max: "", per: "", requireSlot: false },
      prepared: 2
    },
    type: "spell",
    sorting: "a"
  }
}
```

### Un conjuro de nivel 1
```javascript
{
  type: "ItemChoice",
  configuration: {
    allowDrops: true,
    choices: { "0": { count: 1, replacement: true } },
    pool: [],
    restriction: {
      list: ["class:cleric", "class:druid", "class:wizard"],
      level: "1",
      school: []
    },
    spell: {
      ability: ["int", "wis", "cha"],
      method: "spell",
      uses: { max: "1", per: "lr", requireSlot: false },
      prepared: 2
    },
    type: "spell",
    sorting: "a"
  }
}
```

## Comportamiento observado
- `restriction.level = "1"` → Compendium Browser bloqueado a nivel 1–1.
- `restriction.list` → listas Clérigo/Druida/Mago seleccionadas y bloqueadas.
- `choices["0"].count = 1` → selección máxima de un Item.

### Semántica confirmada originalmente en DnD5e 6.0.5 (evidencia histórica)
- Las claves de `configuration.choices` son niveles del Advancement; DnD5e las registra en
  `item.advancement.byLevel` y el `AdvancementManager` procesa las que correspondan al nivel
  ganado.
- `count` limita las selecciones de esa clave/nivel. `replacement` permite sustituir una elección
  anterior conforme al flujo nativo.
- `restriction` determina qué puede elegirse; `spell` modifica el Item de conjuro que se crea en
  el Actor (habilidad, método, preparado, usos y procedencia).
- Un `ScaleValue` no es una elección: muestra o calcula valores como número de trucos o máximo de
  conjuros preparados, pero no invoca `ItemChoiceFlow` ni el Compendium Browser.

Separar conceptualmente:
- `restriction`: QUÉ puede elegir el usuario.
- `spell`: CÓMO se configura el conjuro elegido.
- `choices`: CUÁNDO/CUÁNTOS se eligen, mediante las claves de nivel del Advancement.

## Caso contrastado: Mago 2024
En el mundo de pruebas, el Actor `BXIi9awhO1cIx3Hn` contiene el rasgo
`Actor.BXIi9awhO1cIx3Hn.Item.ZhwzGqTFXNCZcfoT` (`Lanzamiento de conjuros`), copiado de
`Compendium.dnd-players-handbook.classes.Item.phbwzdSpellcasti`.

La pestaña Avance de ese rasgo no contiene ningún Advancement. La clase Mago sólo muestra los
ScaleValues oficiales `Trucos conocidos` y `Máx. conjuros preparados`; por ello el sistema muestra
las cantidades, pero no abre selección de conjuros. No es equivalente a Magic Initiate y no debe
diagnosticarse como un fallo del Compendium Browser.

## Cambio mínimo posible
Si el módulo necesita una elección que el contenido oficial no modela, definir un `ItemChoice`
propio y mínimo sobre el Item que concede el conjuro. Debe usar `type: "spell"`,
`choices` con el nivel de concesión, `restriction` para lista/nivel/escuela y `spell` para el modo
de configuración. No modificar el contenido oficial ni intentar inferir elecciones a partir de
ScaleValues.

## Restricciones
No parchear HTML, simular clics, duplicar el navegador, hardcodear nombres traducidos, modificar compendios oficiales ni asumir APIs no verificadas.

Sí reutilizar Advancements, UUID/identificadores estables y APIs públicas; mantener cambios mínimos y documentar dependencias de versión.

## Compatibilidad
- **Versión actual confirmada por el usuario: D&D5e 6.0.6**, sobre Foundry VTT 14. El módulo debe verificarse contra 6.0.6 antes de declarar compatibilidad o depender de internals.
- **Contexto histórico:** el ejemplo original de Magic Initiate indicaba `systemVersion: 5.3.3` y parte de la investigación se realizó con D&D5e **6.0.5** sobre Foundry **14.368**. No borrar estos hallazgos ni considerarlos validación actual por sí solos.
- **Evidencia posterior:** `DND5E-6.0.6-COMPATIBILITY-REPORT.md` describe pruebas en un mundo con D&D5e **6.0.6**, con distinción entre `dnd5e-spell-advancement` **1.14.4** (cargada y probada) y **1.14.5** (en el árbol, pendiente de validar en ese mundo).

## Archivos auxiliares
Si existen, usar:
- `docs/CODEX-HANDOFF-SPELL-ADVANCEMENT.md`
- `docs/CODEX-TASK.md`
- `tools/FOUNDRY-INSPECTION.js`

## Entregable previo a implementación
Codex debe informar primero:
1. archivos/clases de DnD5e implicados;
2. ejemplos oficiales encontrados;
3. ciclo Advancement → Compendium Browser → Actor;
4. comportamiento por nivel;
5. riesgos de compatibilidad;
6. arquitectura mínima propuesta;
7. archivos del repositorio que habría que modificar.

No implementar hasta completar esta investigación, salvo instrucción explícita del usuario.
