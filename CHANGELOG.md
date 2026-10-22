# Changelog

## 1.14.4 - 2026-10-23

- Adds an English README and public technical documentation links.
- Aligns the documentation and release workflow for publication in the Foundry
  VTT package directory.

## 1.14.3 - 2026-10-22

- Al iniciar la cola, guarda automáticamente los `ItemChoice` completamente
  cubiertos por conjuros importados como historial de avance. Las subidas de
  nivel posteriores sólo solicitan elecciones nuevas; nunca crea ni modifica
  conjuros durante esa reconciliación.
- Añade el ajuste de mundo **Mostrar registro detallado en consola** para
  activar o desactivar las trazas de análisis y procesamiento.
- Registra en consola el análisis y la cola de Actores: cupos cubiertos,
  déficit, avances ausentes y la decisión de abrir u omitir el selector.
- Muestra en "Sin selección necesaria" los Actores cuyos conjuros importados
  cubren todas las elecciones antes de guardar su perfil de avance.
- Evita el fallo de D&D5e 6.0.5 al restaurar un `ItemGrant` importado sin
  elementos registrados mientras se añade un Advancement de conjuros.
- Excluye conjuros ya presentes también por `system.identifier`, evitando
  equivalentes de otros compendios con UUID diferente.
- Impide seleccionar los equivalentes que un índice de compendio antiguo no
  pueda ocultar por identificador.
- Reconoce también el ID de documento compartido por paquetes de compendio
  2024, incluso cuando una traducción no expone el identificador canónico.
- Reconcilia los conjuros importados por clase/subclase en dos bolsas
  independientes (trucos y nivel 1+), agrupadas por nivel y deduplicadas antes
  de calcular las elecciones pendientes.
- Adds a native sequential batch for configuring supported existing Actors without automatically adding spells.
- Adds a restricted World Settings menu for reviewing and controlling that batch without a macro.

## 1.14.0 - 2026-10-13

- Imported characters retain existing class spell choices and the native Compendium Browser excludes spells already on the Actor.
- The Compendium Browser keeps the Advancement's spell-level range enforced while allowing users to narrow the visible range.

## 0.4.0 - 2026-10-06

- First public release of native D&D5e spell-selection Advancements.
- Supports Cleric, Bard, Druid, Sorcerer, Warlock, Ranger, Paladin, and Wizard.
- Supports the Eldritch Knight and Arcane Trickster subclasses from the installed PHB module.
- Adds reproducible release packaging, GitHub Release automation, and Marketplace publication documentation.
