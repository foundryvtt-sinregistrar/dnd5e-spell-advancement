import assert from "node:assert/strict";
import test from "node:test";

const module = {};
const ready = [];
globalThis.foundry = {
  applications: {
    api: { ApplicationV2: class {}, HandlebarsApplicationMixin: base => base }
  }
};
globalThis.Hooks = {
  once: (hook, handler) => {
    if (hook === "ready") ready.push(handler);
  },
  on: () => {}
};
globalThis.CONFIG = { DND5E: { advancementTypes: {} } };
globalThis.dnd5e = { applications: {} };
globalThis.game = { modules: new Map([["dnd5e-spell-advancement", module]]) };
await import("../scripts/main.mjs");
for (const handler of ready) handler();

const compendium = "Compendium.dnd-players-handbook.classes.Item";

function reviewArcaneTrickster(nativeAdvancements, savedAdvancements = new Map()) {
  const actor = {
    isOwner: true,
    system: { metadata: { supportsAdvancement: true } },
    itemTypes: {
      spell: [],
      feat: [{
        _stats: { compendiumSource: `${compendium}.phbrgeSpellcasti` },
        system: { advancement: nativeAdvancements }
      }]
    }
  };
  actor.itemTypes.subclass = [{
    actor,
    type: "subclass",
    _stats: { compendiumSource: `${compendium}.phbrgeArcaneTric` },
    system: { levels: 3, advancement: savedAdvancements }
  }];
  return module.api.reviewExistingActorSpellAdvancements([actor]).pending[0].missing;
}

test("only adds prepared spells when the actor's native feature already grants cantrips", () => {
  const native = [{
    type: "ItemGrant",
    configuration: { items: [{ uuid: "Compendium.dnd-players-handbook.spells.Item.phbsplMageHand00" }] }
  }, {
    type: "ItemChoice",
    configuration: { type: "spell", restriction: { level: "0", list: ["class:wizard"] } }
  }];
  const savedAdvancements = new Map([["dsaATCantrips001", { value: { added: { 3: { spell: "original" } } } }]]);
  assert.deepEqual(reviewArcaneTrickster(native), ["dsaATSpells00001"]);
  assert.deepEqual(reviewArcaneTrickster(native, savedAdvancements), ["dsaATSpells00001"]);
  assert.equal(savedAdvancements.get("dsaATCantrips001").value.added[3].spell, "original");
});

test("preserves the module's advancements for actors imported with the older feature", () => {
  assert.deepEqual(reviewArcaneTrickster([]), [
    "dsaATMageHand001", "dsaATCantrips001", "dsaATSpells00001"
  ]);
});
