# AGENTS.md

## Proyecto
Foundry VTT V14 + sistema **D&D5e 6.0.6** (versión actual confirmada por el usuario). El objetivo actual es reutilizar los mecanismos nativos de DnD5e para que un Actor elija conjuros obtenidos por clase, subclase, rasgo, dote o subida de nivel.

## Reglas para Codex
1. Lee `DEVELOPER.md` antes de modificar código.
2. Lee, si existen, `docs/CODEX-HANDOFF-SPELL-ADVANCEMENT.md` y `docs/CODEX-TASK.md`.
3. Prioriza APIs y mecanismos nativos de Foundry/DnD5e.
4. No implementes un navegador de conjuros propio si puede usarse el Compendium Browser nativo.
5. No dupliques funcionalidad de DnD5e ni modifiques compendios oficiales/premium.
6. No dependas del HTML/DOM si existe un modelo de datos, Advancement o API apropiada.
7. Antes de implementar: localiza ejemplos oficiales, identifica las clases/métodos implicados, documenta hallazgos y propone el cambio mínimo.
8. No hagas refactorizaciones ajenas a la tarea.
9. No inventes campos ni APIs. Marca claramente comportamiento confirmado, inferencias e hipótesis.
10. Verifica todo contra el entorno instalado de Foundry VTT V14/DnD5e.

## Flujo preferido
Actor/subida de nivel → Clase/Subclase/Rasgo/Dote → Advancement nativo → ItemChoice (`type = spell`) → `restriction + choices + spell` → Compendium Browser → selección → conjuro en Actor.

## Hallazgos confirmados
`Iniciado en la magia / Magic Initiate` usa dos `ItemChoice`:
- trucos: `choices["0"].count = 2`, `restriction.level = "0"`, listas `class:cleric`, `class:druid`, `class:wizard`;
- nivel 1: `choices["0"].count = 1`, `restriction.level = "1"`, mismas listas.

DnD5e convierte esas restricciones en filtros bloqueados del Compendium Browser.

En DnD5e 6.0.5 (**hallazgo histórico de investigación, no versión objetivo actual**), las claves de `configuration.choices` son niveles del Advancement: un
`ItemChoice` con `choices["1"]` se procesa al subir ese Item/clase al nivel 1. `count` es el
máximo de elecciones de esa clave; no es un contador global de conjuros.

Los `ScaleValue` como `Trucos conocidos` y `Máx. conjuros preparados` sólo exponen un valor o
límite. No abren el Compendium Browser ni crean Items de conjuro.

Caso comprobado en el mundo de pruebas: `Actor.BXIi9awhO1cIx3Hn.Item.ZhwzGqTFXNCZcfoT`
(`Lanzamiento de conjuros`, procedente de
`Compendium.dnd-players-handbook.classes.Item.phbwzdSpellcasti`) no tiene Advancements en su
pestaña Avance. La clase Mago 2024 aporta ScaleValues para trucos conocidos y conjuros
preparados, pero no un `ItemChoice` de conjuros. Es intencionadamente distinto de Magic Initiate.

## Consecuencia de implementación
Para abrir el selector nativo al conceder conjuros, el Item controlado por el Advancement (clase,
subclase, rasgo o dote) debe contener explícitamente un `ItemChoice` con `type: "spell"` y una
entrada `choices` en el nivel correspondiente. Añadir o leer ScaleValues no es suficiente.

No implementar una alternativa personalizada mientras el flujo nativo pueda cubrir el caso.

## Actualización de compatibilidad — 6.0.6
- La versión actual declarada es **D&D5e 6.0.6**, no 6.0.5. Conservar los hallazgos anteriores como evidencia histórica y verificar las APIs sobre 6.0.6 antes de cambiar código.
- El informe de compatibilidad del 26-10-2026 describe pruebas de selección y persistencia de conjuros con 6.0.6. Distingue la versión **1.14.4** cargada en el mundo de la **1.14.5** presente en el árbol de trabajo; no generalizar la validación.
