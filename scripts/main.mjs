const MODULE_ID = "dnd5e-spell-advancement";

const CLERIC_IDENTIFIER = "cleric";
const CLERIC_CANTRIPS_ID = "dsaClericCantrip";
const CLERIC_SPELLS_ID = "dsaClericSpellsX";
const BARD_IDENTIFIER = "bard";
const BARD_CANTRIPS_ID = "dsaBardCantrip01";
const BARD_SPELLS_ID = "dsaBardSpells001";
const BARD_SECRETS_ID = "dsaBardSecrets01";

const FULL_CASTER_PREPARED_CHOICES = {
  1: { count: 4 }, 2: { count: 1 }, 3: { count: 1 }, 4: { count: 1 },
  5: { count: 2 }, 6: { count: 1 }, 7: { count: 1 }, 8: { count: 1 },
  9: { count: 2 }, 10: { count: 1 }, 11: { count: 1 }, 13: { count: 1 },
  15: { count: 1 }, 17: { count: 1 }, 18: { count: 1 }, 19: { count: 1 },
  20: { count: 1 }
};

const HALF_CASTER_PREPARED_CHOICES = {
  1: { count: 2 }, 2: { count: 1 }, 3: { count: 1 }, 4: { count: 1 },
  5: { count: 1 }, 7: { count: 1 }, 9: { count: 2 }, 11: { count: 1 },
  13: { count: 1 }, 15: { count: 1 }, 17: { count: 2 }, 19: { count: 1 }
};

const SORCERER_PREPARED_CHOICES = {
  1: { count: 2 }, 2: { count: 2 }, 3: { count: 2 }, 4: { count: 1 },
  5: { count: 2 }, 6: { count: 1 }, 7: { count: 1 }, 8: { count: 1 },
  9: { count: 2 }, 10: { count: 1 }, 11: { count: 1 }, 13: { count: 1 },
  15: { count: 1 }, 17: { count: 1 }, 18: { count: 1 }, 19: { count: 1 },
  20: { count: 1 }
};

const WARLOCK_PREPARED_CHOICES = {
  1: { count: 2 }, 2: { count: 1 }, 3: { count: 1 }, 4: { count: 1 },
  5: { count: 1 }, 6: { count: 1 }, 7: { count: 1 }, 8: { count: 1 },
  9: { count: 1 }, 11: { count: 1 }, 13: { count: 1 }, 15: { count: 1 },
  17: { count: 1 }, 19: { count: 1 }
};

const WIZARD_SPELLBOOK_CHOICES = {
  1: { count: 6 }, 2: { count: 2 }, 3: { count: 2 }, 4: { count: 2 },
  5: { count: 2 }, 6: { count: 2 }, 7: { count: 2 }, 8: { count: 2 },
  9: { count: 2 }, 10: { count: 2 }, 11: { count: 2 }, 12: { count: 2 },
  13: { count: 2 }, 14: { count: 2 }, 15: { count: 2 }, 16: { count: 2 },
  17: { count: 2 }, 18: { count: 2 }, 19: { count: 2 }, 20: { count: 2 }
};

const BASE_CLASS_SPELLCASTERS = {
  druid: {
    label: "Druida", ability: "wis", list: "class:druid",
    cantrip: { id: "dsaDruCantrip001", choices: { 1: { count: 2 }, 4: { count: 1 }, 10: { count: 1 } } },
    prepared: { id: "dsaDruSpells0001", choices: FULL_CASTER_PREPARED_CHOICES }
  },
  sorcerer: {
    label: "Hechicero", ability: "cha", list: "class:sorcerer",
    cantrip: { id: "dsaSorCantrip001", choices: { 1: { count: 4 }, 4: { count: 1 }, 10: { count: 1 } } },
    prepared: { id: "dsaSorSpells0001", choices: SORCERER_PREPARED_CHOICES }
  },
  warlock: {
    label: "Brujo", ability: "cha", list: "class:warlock",
    cantrip: { id: "dsaWarCantrip001", choices: { 1: { count: 2 }, 4: { count: 1 }, 10: { count: 1 } } },
    prepared: { id: "dsaWarSpells0001", choices: WARLOCK_PREPARED_CHOICES }
  },
  ranger: {
    label: "Explorador", ability: "wis", list: "class:ranger",
    prepared: { id: "dsaRanSpells0001", choices: HALF_CASTER_PREPARED_CHOICES }
  },
  paladin: {
    label: "Paladín", ability: "cha", list: "class:paladin",
    prepared: { id: "dsaPalSpells0001", choices: HALF_CASTER_PREPARED_CHOICES }
  },
  wizard: {
    label: "Mago", ability: "int", list: "class:wizard",
    cantrip: { id: "dsaWizCantrip001", choices: { 1: { count: 3 }, 4: { count: 1 }, 10: { count: 1 } } },
    spellbook: { id: "dsaWizSpells0001", choices: WIZARD_SPELLBOOK_CHOICES }
  }
};

const THIRD_CASTER_PREPARED_CHOICES = {
  3: { count: 3 }, 4: { count: 1 }, 7: { count: 1 }, 8: { count: 1 },
  10: { count: 1 }, 11: { count: 1 }, 13: { count: 1 }, 14: { count: 1 },
  16: { count: 1 }, 19: { count: 1 }, 20: { count: 1 }
};

const SUBCLASS_SPELLCASTERS = {
  "Compendium.dnd-players-handbook.classes.Item.phbftrEldritchKn": {
    label: "Caballero arcano",
    cantripId: "dsaEKCantrips001",
    spellsId: "dsaEKSpells00001"
  },
  "Compendium.dnd-players-handbook.classes.Item.phbrgeArcaneTric": {
    label: "Tramposo arcano",
    cantripId: "dsaATCantrips001",
    spellsId: "dsaATSpells00001",
    mageHandId: "dsaATMageHand001"
  }
};

/**
 * Incrementos de las elecciones de conjuros preparados del Clérigo 2024.
 * Las claves son niveles de clase, no niveles de conjuro.
 */
const CLERIC_PREPARED_SPELL_CHOICES = {
  1: { count: 4 },
  2: { count: 1 },
  3: { count: 1 },
  4: { count: 1 },
  5: { count: 2 },
  6: { count: 1 },
  7: { count: 1 },
  8: { count: 1 },
  9: { count: 2 },
  10: { count: 1 },
  11: { count: 1 },
  13: { count: 1 },
  15: { count: 1 },
  17: { count: 1 },
  18: { count: 1 },
  19: { count: 1 },
  20: { count: 1 }
};

/** Incrementos anteriores a Secretos mágicos (Bardo 2024). */
const BARD_PREPARED_SPELL_CHOICES = {
  1: { count: 4 },
  2: { count: 1 },
  3: { count: 1 },
  4: { count: 1 },
  5: { count: 2 },
  6: { count: 1 },
  7: { count: 1 },
  8: { count: 1 },
  9: { count: 2 }
};

/** Incrementos que Secretos mágicos permite elegir de cuatro listas. */
const BARD_MAGICAL_SECRETS_CHOICES = {
  10: { count: 1 },
  11: { count: 1 },
  13: { count: 1 },
  15: { count: 1 },
  17: { count: 1 },
  18: { count: 1 },
  19: { count: 1 },
  20: { count: 1 }
};

/**
 * @returns {object[]} Datos fuente de los avances que aporta este módulo.
 */
function clericAdvancements() {
  return [
    {
      _id: CLERIC_CANTRIPS_ID,
      type: "ItemChoice",
      name: "Clérigo: trucos",
      configuration: {
        allowDrops: true,
        choices: {
          1: { count: 3 },
          4: { count: 1 },
          10: { count: 1 }
        },
        pool: [],
        restriction: {
          level: "0",
          list: ["class:cleric"],
          school: [],
          subtype: "",
          type: ""
        },
        sorting: "a",
        spell: {
          ability: ["wis"],
          method: "spell",
          prepared: 2,
          uses: { max: "", per: "", requireSlot: false }
        },
        type: "spell"
      },
      value: { added: {}, replaced: {} }
    },
    {
      _id: CLERIC_SPELLS_ID,
      type: "ItemChoice",
      name: "Clérigo: conjuros preparados",
      configuration: {
        allowDrops: true,
        choices: CLERIC_PREPARED_SPELL_CHOICES,
        pool: [],
        restriction: {
          level: "availableNoCantrips",
          list: ["class:cleric"],
          school: [],
          subtype: "",
          type: ""
        },
        sorting: "a",
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
  ];
}

/**
 * @returns {object[]} Datos fuente de los avances de Bardo 2024.
 */
function bardAdvancements() {
  const bardSpell = (prepared=1) => ({
    ability: ["cha"],
    method: "spell",
    prepared,
    uses: { max: "", per: "", requireSlot: false }
  });

  return [
    {
      _id: BARD_CANTRIPS_ID,
      type: "ItemChoice",
      name: "Bardo: trucos",
      configuration: {
        allowDrops: true,
        choices: { 1: { count: 2 }, 4: { count: 1 }, 10: { count: 1 } },
        pool: [],
        restriction: {
          level: "0",
          list: ["class:bard"],
          school: [],
          subtype: "",
          type: ""
        },
        sorting: "a",
        spell: bardSpell(2),
        type: "spell"
      },
      value: { added: {}, replaced: {} }
    },
    {
      _id: BARD_SPELLS_ID,
      type: "ItemChoice",
      name: "Bardo: conjuros preparados",
      configuration: {
        allowDrops: true,
        choices: BARD_PREPARED_SPELL_CHOICES,
        pool: [],
        restriction: {
          level: "availableNoCantrips",
          list: ["class:bard"],
          school: [],
          subtype: "",
          type: ""
        },
        sorting: "a",
        spell: bardSpell(),
        type: "spell"
      },
      value: { added: {}, replaced: {} }
    },
    {
      _id: BARD_SECRETS_ID,
      type: "ItemChoice",
      name: "Bardo: Secretos mágicos",
      configuration: {
        allowDrops: true,
        choices: BARD_MAGICAL_SECRETS_CHOICES,
        pool: [],
        restriction: {
          level: "availableNoCantrips",
          list: ["class:bard", "class:cleric", "class:druid", "class:wizard"],
          school: [],
          subtype: "",
          type: ""
        },
        sorting: "a",
        spell: bardSpell(),
        type: "spell"
      },
      value: { added: {}, replaced: {} }
    }
  ];
}

/**
 * Crea datos de ItemChoice para un conjuro, con objetos nuevos para cada
 * advancement (los DataModels de D&D5e pueden normalizar sus datos fuente).
 */
function spellChoice({ id, name, choices, list, ability, level, prepared }) {
  return {
    _id: id,
    type: "ItemChoice",
    name,
    configuration: {
      allowDrops: true,
      choices: Object.fromEntries(Object.entries(choices).map(([key, value]) => [key, { ...value }])),
      pool: [],
      restriction: { level, list: [list], school: [], subtype: "", type: "" },
      sorting: "a",
      spell: {
        ability: [ability],
        method: "spell",
        prepared,
        uses: { max: "", per: "", requireSlot: false }
      },
      type: "spell"
    },
    value: { added: {}, replaced: {} }
  };
}

/**
 * @param {Item} item
 * @returns {object[]|null}
 */
function baseClassAdvancements(item) {
  const profile = BASE_CLASS_SPELLCASTERS[item?.system?.identifier];
  if (!profile || item?.type !== "class") return null;

  const advancements = [];
  if (profile.cantrip) {
    advancements.push(spellChoice({
      id: profile.cantrip.id,
      name: `${profile.label}: trucos`,
      choices: profile.cantrip.choices,
      list: profile.list,
      ability: profile.ability,
      level: "0",
      prepared: 2
    }));
  }
  if (profile.prepared) {
    advancements.push(spellChoice({
      id: profile.prepared.id,
      name: `${profile.label}: conjuros preparados`,
      choices: profile.prepared.choices,
      list: profile.list,
      ability: profile.ability,
      level: "availableNoCantrips",
      prepared: 1
    }));
  }
  if (profile.spellbook) {
    advancements.push(spellChoice({
      id: profile.spellbook.id,
      name: "Mago: libro de conjuros",
      choices: profile.spellbook.choices,
      list: profile.list,
      ability: profile.ability,
      level: "availableNoCantrips",
      prepared: 0
    }));
  }
  return advancements;
}

/**
 * @param {Item} item
 * @returns {string|null}
 */
function sourceId(item) {
  return item?.getFlag?.("dnd5e", "sourceId") ?? item?._stats?.compendiumSource ?? null;
}

/**
 * @param {Item} item
 * @returns {object[]|null}
 */
function subclassAdvancements(item) {
  const profile = SUBCLASS_SPELLCASTERS[sourceId(item)];
  if (!profile || item?.type !== "subclass") return null;

  const advancements = [
    spellChoice({
      id: profile.cantripId,
      name: `${profile.label}: trucos`,
      choices: { 3: { count: 2 }, 10: { count: 1 } },
      list: "class:wizard",
      ability: "int",
      level: "0",
      prepared: 2
    }),
    spellChoice({
      id: profile.spellsId,
      name: `${profile.label}: conjuros preparados`,
      choices: THIRD_CASTER_PREPARED_CHOICES,
      list: "class:wizard",
      ability: "int",
      level: "availableNoCantrips",
      prepared: 1
    })
  ];

  if (profile.mageHandId) {
    advancements.unshift({
      _id: profile.mageHandId,
      type: "ItemGrant",
      name: "Tramposo arcano: Mano de mago",
      level: 3,
      configuration: {
        items: [{ uuid: "Compendium.dnd5e.spells24.Item.phbsplMageHand00", optional: false }],
        optional: false,
        spell: {
          ability: ["int"],
          method: "spell",
          prepared: 2,
          uses: { max: "", per: "", requireSlot: false }
        }
      },
      value: {}
    });
  }
  return advancements;
}

/**
 * @param {Item} item
 * @returns {boolean}
 */
function isClericClass(item) {
  return (item?.type === "class") && (item.system.identifier === CLERIC_IDENTIFIER);
}

/**
 * @param {Item} item
 * @returns {boolean}
 */
function isBardClass(item) {
  return (item?.type === "class") && (item.system.identifier === BARD_IDENTIFIER);
}

/**
 * @param {Item} item
 * @returns {object[]|null}
 */
function advancementsForClass(item) {
  if (isClericClass(item)) return clericAdvancements();
  if (isBardClass(item)) return bardAdvancements();
  return baseClassAdvancements(item) ?? subclassAdvancements(item);
}

/**
 * Añade a una clase compatible los avances ausentes y abre el gestor nativo de D&D5e.
 * No escribe nada si ambos avances ya existen.
 *
 * @param {Item} classItem Ítem de clase embebido en un Actor.
 * @returns {Promise<{status: string, manager?: object}>}
 */
async function configureClass(classItem) {
  const advancementsData = advancementsForClass(classItem);
  if (!advancementsData || !classItem.actor) {
    throw new Error("Se requiere un ítem de clase compatible embebido en un Actor.");
  }

  if (!classItem.actor.system.metadata?.supportsAdvancement) {
    return { status: "unsupported-actor" };
  }

  const missing = advancementsData
    .filter(data => !classItem.system.advancement.get(data._id));
  if (!missing.length) return { status: "already-configured" };

  const ItemChoice = CONFIG.DND5E.advancementTypes.ItemChoice?.documentClass;
  const AdvancementManager = dnd5e.applications.advancement.AdvancementManager;
  if (!ItemChoice || !AdvancementManager) {
    throw new Error("La API de avances ItemChoice de D&D5e no está disponible.");
  }

  const advancements = missing.map(data => new ItemChoice(data, { parent: classItem }));
  const manager = AdvancementManager.forNewAdvancement(classItem.actor, classItem.id, advancements);
  if (!manager.steps.length) return { status: "no-steps", manager };

  await manager.render(true);
  return { status: "rendered", manager };
}

/** @param {Item} classItem */
async function configureCleric(classItem) {
  if (!isClericClass(classItem)) {
    throw new Error("Se requiere un ítem de clase con identificador 'cleric'.");
  }
  return configureClass(classItem);
}

/** @param {Item} classItem */
async function configureBard(classItem) {
  if (!isBardClass(classItem)) {
    throw new Error("Se requiere un ítem de clase con identificador 'bard'.");
  }
  return configureClass(classItem);
}

/**
 * Localiza y configura el único Clérigo de un Actor.
 *
 * @param {Actor} actor
 * @returns {Promise<{status: string, manager?: object}>}
 */
async function configureActorCleric(actor) {
  const cleric = actor?.itemTypes?.class?.find(isClericClass);
  if (!cleric) throw new Error("El Actor no tiene una clase con identificador 'cleric'.");
  return configureCleric(cleric);
}

/**
 * Localiza y configura el Bardo de un Actor.
 *
 * @param {Actor} actor
 * @returns {Promise<{status: string, manager?: object}>}
 */
async function configureActorBard(actor) {
  const bard = actor?.itemTypes?.class?.find(isBardClass);
  if (!bard) throw new Error("El Actor no tiene una clase con identificador 'bard'.");
  return configureBard(bard);
}

/**
 * Localiza y configura una clase base compatible por su identificador estable.
 * @param {Actor} actor
 * @param {string} identifier
 * @returns {Promise<{status: string, manager?: object}>}
 */
async function configureActorClass(actor, identifier) {
  const classItem = actor?.itemTypes?.class?.find(item => item.system.identifier === identifier);
  if (!classItem || !advancementsForClass(classItem)) {
    throw new Error(`El Actor no tiene una clase compatible con identificador '${identifier}'.`);
  }
  return configureClass(classItem);
}

/**
 * Configura una subclase compatible mediante su UUID de origen.
 * @param {Actor} actor
 * @param {string} origin UUID de compendio de la subclase.
 * @returns {Promise<{status: string, manager?: object}>}
 */
async function configureActorSubclass(actor, origin) {
  const subclass = actor?.itemTypes?.subclass?.find(item => sourceId(item) === origin);
  if (!subclass || !advancementsForClass(subclass)) {
    throw new Error(`El Actor no tiene una subclase compatible con origen '${origin}'.`);
  }
  return configureClass(subclass);
}

Hooks.once("ready", () => {
  game.modules.get(MODULE_ID).api = {
    configureCleric,
    configureActorCleric,
    configureBard,
    configureActorBard,
    configureActorClass,
    configureActorSubclass
  };
});

Hooks.on("createItem", (item, _options, userId) => {
  if ((userId !== game.user.id) || !item.actor?.isOwner || !advancementsForClass(item)) return;

  // La creación puede proceder de un AdvancementManager de D&D5e. Esperamos
  // al siguiente ciclo para no solaparnos con su confirmación final.
  setTimeout(() => {
    configureClass(item).catch(error => {
      console.error(`${MODULE_ID} | No se pudo configurar la clase`, error);
      ui.notifications.error("No se pudo iniciar la selección de conjuros de la clase. Consulta la consola.");
    });
  }, 0);
});
