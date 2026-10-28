# D&D5e Spell Advancement

[Español](README.md) | **English**

<p align="center">
  <img src="docs/foundry/assets/banner-spell-advancement.png" alt="D&amp;D5e Spell Advancement">
</p>

**Current version — Foundry v14**

![Foundry v14](https://img.shields.io/badge/Foundry-v14-green)
![Foundry verified 14.369](https://img.shields.io/badge/Verified-14.369-blue)
![System dnd5e 6.0.6](https://img.shields.io/badge/dnd5e-6.0.6-blue)

[![Latest Release](https://img.shields.io/github/v/release/foundryvtt-sinregistrar/dnd5e-spell-advancement?label=release)](https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement/releases/latest)
[![Downloads Latest Release](https://img.shields.io/github/downloads/foundryvtt-sinregistrar/dnd5e-spell-advancement/latest/total?label=latest%20release%20downloads)](https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement/releases/latest)

[![Downloads Total](https://img.shields.io/github/downloads/foundryvtt-sinregistrar/dnd5e-spell-advancement/total?label=total%20downloads)](https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement/releases)

Requires Foundry VTT 14.367 or later and D&D5e 6.0.6. Install it from the
manifest URL published in the release, then enable it in your world.

This module adds native D&D5e `ItemChoice` Advancements to classes that need to
open the Compendium Browser when gaining spells. It does not modify any official
compendium.

For implementation, compatibility, and API details, see the
[technical documentation (Spanish)](docs/DOCUMENTACION-TECNICA.md).

## Status

Compatible with Foundry VTT 14.367 or newer and dnd5e 6.0.6. The published module does not modify official compendiums.

## Requirements

- Foundry VTT 14.367 or newer.
- The dnd5e system 6.0.6.

## Installation

Install from Foundry's Add-on Modules browser with the [latest-release manifest](https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement/releases/latest/download/module.json), then enable it in the world.

## Activation and use

Cleric (PHB 2024):

- Cleric-list cantrips: 3 at level 1, plus 1 at levels 4 and 10;
- Cleric-list spells, excluding cantrips: increases that reach 22 prepared
  spells at level 20;
- the maximum spell level is natively limited to the Actor's available spell
  slots;
- the Compendium Browser can narrow the displayed spell-level range; for
  example, when levels 1 and 2 are available, it can show 1–2, only 1–1, or
  only 2–2, without allowing the permitted range to be expanded;
- cantrips are always created as prepared, and spells are created as prepared,
  with Wisdom as the spellcasting ability.

When creating a Cleric, the module starts a second native `AdvancementManager`
to record these choices. On later level-ups, D&D5e includes those Advancements
in its usual level-up flow.

Bard (PHB 2024):

- Bard-list cantrips: 2 at level 1, plus 1 at levels 4 and 10;
- prepared Bard spells through level 9, restricted to the available spell-slot
  level;
- from level 10, `Magical Secrets` allows every new prepared spell to come from
  the Bard, Cleric, Druid, or Wizard lists, as specified by the official
  feature;
- spells use Charisma and are created as prepared.

Other PHB 2024 base classes:

| Class | List | Ability | Implemented choices |
| --- | --- | --- | --- |
| Druid | Druid | Wisdom | Cantrips and prepared spells |
| Sorcerer | Sorcerer | Charisma | Cantrips and prepared spells |
| Warlock | Warlock | Charisma | Cantrips and Pact Magic spells |
| Ranger | Ranger | Wisdom | Prepared spells |
| Paladin | Paladin | Charisma | Prepared spells |
| Wizard | Wizard | Intelligence | Cantrips and spellbook spells |

The Wizard selects six 1st-level spells for the spellbook, then two at every
subsequent level. These are added unprepared; the class retains the official
prepared-spell limit, and the player prepares them from the character sheet.

Installed PHB subclasses:

- **Eldritch Knight**: two Wizard cantrips at level 3, one more at level 10,
  and prepared-spell increases from the one-third-caster table.
- **Arcane Trickster**: the same progression, plus `Mage Hand` granted
  automatically at level 3; its first two cantrips remain choices.

## Updating: existing Actors

The module does not automatically modify existing Actors. To start configuring
an existing Cleric, run the following as the Actor owner:

```js
await game.modules.get("dnd5e-spell-advancement").api.configureActorCleric(actor);
```

For an existing Bard:

```js
await game.modules.get("dnd5e-spell-advancement").api.configureActorBard(actor);
```

Other base classes are configured using their D&D5e identifier:

```js
await game.modules.get("dnd5e-spell-advancement")
  .api.configureActorClass(actor, "druid");
```

Available identifiers: `druid`, `sorcerer`, `warlock`, `ranger`, `paladin`, and
`wizard`.

Subclasses are detected by their official source UUID when they are added to an
Actor.

## Updating: imported Actors

When configuring an imported Actor, the module records its existing class
spells as historical choices. The native Compendium Browser excludes spells the
Actor already owns, so they cannot be selected again while resolving pending
Advancements.

To process all world Actors without locating them one by one, as a GM open
**Game Settings → Process Existing Actors → Open Processing**. The window shows
pending Advancements and lets you start, resume, or cancel the queue. You can
also run this macro as a GM or Actor owner:

The **Show detailed console logging** world setting enables or disables
diagnostic traces for analysis and the queue. It is enabled by default and can
only be changed by a GM.

```js
await game.modules.get("dnd5e-spell-advancement").api.configureExistingActors();
```

When the queue starts, Advancements whose quotas are already filled are
automatically saved to the class Item's advancement profile, using imported
spells as their history. No spells are added, removed, or modified. Therefore,
a later level-up does not ask for historical choices again. The macro opens a
native `AdvancementManager` only for the remaining deficits. Complete an
Actor's choices to automatically proceed to the next one. If you close a
selector, the queue pauses; retry that same entry with:

```js
await game.modules.get("dnd5e-spell-advancement").api.resumeExistingActorBatch();
```

To leave the queue without undoing already completed Actors:

```js
game.modules.get("dnd5e-spell-advancement").api.cancelExistingActorBatch();
```

`actor` must be the selected Actor or an Actor reference in the individual
macros above.
