# Changelog

## Unreleased

- Evita el fallo de D&D5e 6.0.5 al restaurar un `ItemGrant` importado sin
  elementos registrados mientras se añade un Advancement de conjuros.
- Excluye conjuros ya presentes también por `system.identifier`, evitando
  equivalentes de otros compendios con UUID diferente.
- Impide seleccionar los equivalentes que un índice de compendio antiguo no
  pueda ocultar por identificador.
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
