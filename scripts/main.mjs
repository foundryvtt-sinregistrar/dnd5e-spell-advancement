const MODULE_ID = "dnd5e-spell-advancement";

const CLERIC_IDENTIFIER = "cleric";
const CLERIC_CANTRIPS_ID = "dsaClericCantrip";
const CLERIC_SPELLS_ID = "dsaClericSpellsX";

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
 * @param {Item} item
 * @returns {boolean}
 */
function isClericClass(item) {
  return (item?.type === "class") && (item.system.identifier === CLERIC_IDENTIFIER);
}

/**
 * Añade al Clérigo los avances ausentes y abre el gestor nativo de D&D5e.
 * No escribe nada si ambos avances ya existen.
 *
 * @param {Item} classItem Ítem de clase Cleric embebido en un Actor.
 * @returns {Promise<{status: string, manager?: object}>}
 */
async function configureCleric(classItem) {
  if (!isClericClass(classItem) || !classItem.actor) {
    throw new Error("Se requiere un ítem de clase con identificador 'cleric' embebido en un Actor.");
  }

  if (!classItem.actor.system.metadata?.supportsAdvancement) {
    return { status: "unsupported-actor" };
  }

  const missing = clericAdvancements()
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

Hooks.once("ready", () => {
  game.modules.get(MODULE_ID).api = {
    configureCleric,
    configureActorCleric
  };
});

Hooks.on("createItem", (item, _options, userId) => {
  if ((userId !== game.user.id) || !item.actor?.isOwner || !isClericClass(item)) return;

  // La creación puede proceder de un AdvancementManager de D&D5e. Esperamos
  // al siguiente ciclo para no solaparnos con su confirmación final.
  setTimeout(() => {
    configureCleric(item).catch(error => {
      console.error(`${MODULE_ID} | No se pudo configurar el Clérigo`, error);
      ui.notifications.error("No se pudo iniciar la selección de conjuros del Clérigo. Consulta la consola.");
    });
  }, 0);
});
