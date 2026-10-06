const MODULE_ID = "dnd5e-spell-advancement";

const CLERIC_IDENTIFIER = "cleric";
const CLERIC_CANTRIPS_ID = "dsaClericCantrip";
const CLERIC_SPELLS_ID = "dsaClericSpellsX";
const BARD_IDENTIFIER = "bard";
const BARD_CANTRIPS_ID = "dsaBardCantrip01";
const BARD_SPELLS_ID = "dsaBardSpells001";
const BARD_SECRETS_ID = "dsaBardSecrets01";

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
  return null;
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

Hooks.once("ready", () => {
  game.modules.get(MODULE_ID).api = {
    configureCleric,
    configureActorCleric,
    configureBard,
    configureActorBard
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
