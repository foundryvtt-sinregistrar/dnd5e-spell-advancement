const MODULE_ID = "dnd5e-spell-advancement";
const DETAILED_CONSOLE_LOG_SETTING = "detailedConsoleLog";

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
 * Registra diagnóstico detallado sólo si el GM lo ha activado en Ajustes de
 * partida. Los errores y advertencias no usan este filtro.
 *
 * @param {...unknown} args
 */
function detailedLog(...args) {
  if (game.settings.get(MODULE_ID, DETAILED_CONSOLE_LOG_SETTING)) console.info(...args);
}

/**
 * @param {Item} item
 * @returns {string|null}
 */
function sourceDocumentId(item) {
  return sourceId(item)?.match(/\.Item\.([^.]+)$/)?.[1] ?? null;
}

/** @param {Actor} actor @returns {Set<string>} */
function existingSpellSourceIds(actor) {
  return new Set(actor?.itemTypes?.spell
    ?.map(sourceId)
    .filter(uuid => typeof uuid === "string" && uuid.startsWith("Compendium.")) ?? []);
}

/**
 * El último segmento de un UUID de Item es el ID estable del documento en el
 * compendio. D&D5e lo reutiliza entre sus paquetes de contenido 2024, aunque
 * cambie el paquete que contiene el conjuro.
 *
 * @param {Actor} actor
 * @returns {Set<string>}
 */
function existingSpellSourceDocumentIds(actor) {
  return new Set(existingSpellSourceIds(actor)
    .map(uuid => uuid.match(/\.Item\.([^.]+)$/)?.[1])
    .filter(Boolean));
}

/**
 * UUIDs de compendio distintos pueden representar el mismo conjuro entre
 * compendios o ediciones. D&D5e conserva `system.identifier` como la
 * identidad semántica estable del conjuro y el Compendium Browser lo indexa.
 *
 * @param {Actor} actor
 * @returns {Set<string>}
 */
function existingSpellIdentifiers(actor) {
  return new Set(actor?.itemTypes?.spell
    ?.map(spell => spell.system.identifier)
    .filter(identifier => typeof identifier === "string" && identifier.length) ?? []);
}

/**
 * Conserva los prerrequisitos nativos y añade una invalidación compatible con
 * el Compendium Browser para equivalentes que un índice de compendio antiguo
 * no pueda excluir por `system.identifier`.
 *
 * @param {Item} item
 * @param {Actor} actor
 * @param {number} level
 * @param {Set<string>} identifiers
 * @param {Set<string>} sourceDocumentIds
 * @returns {Map<string, {label: string, valid: boolean}>|undefined}
 */
function validateSpellChoice(item, actor, level, identifiers, sourceDocumentIds) {
  const results = item.system.validatePrerequisites?.({ actor, level }) ?? new Map();
  const isExistingSpell = identifiers.has(item.identifier)
    || sourceDocumentIds.has(item.id);
  if ((item.type === "spell") && isExistingSpell) {
    results.set(`${MODULE_ID}.existing-spell`, {
      label: "El Actor ya tiene este conjuro.",
      valid: false
    });
  }
  return results.size ? results : undefined;
}

/**
 * Los filtros bloqueados sustituyen siempre los valores que el usuario elige
 * en el navegador. Este wrapper conserva un intervalo duro en una opción del
 * navegador, pero deja que el usuario reduzca el intervalo visible.
 */
function installSpellLevelRangeControls() {
  const Browser = dnd5e.applications.CompendiumBrowser;
  if (!Browser || Browser.prototype._onChangeForm?.dsaSpellLevelRangeControls) return;

  const originalChange = Browser.prototype._onChangeForm;
  Browser.prototype._onChangeForm = function(formConfig, event) {
    const range = this.options.dsaSpellLevelRange;
    const input = event.target;
    if (range && /^additional\.level\.(min|max)$/.test(input?.name)) {
      if (input.value !== "") {
        const value = Number(input.value);
        if (Number.isFinite(value)) input.value = Math.min(range.max, Math.max(range.min, value));
      }
    }
    return originalChange.call(this, formConfig, event);
  };
  Browser.prototype._onChangeForm.dsaSpellLevelRangeControls = true;

  const originalAttachPartListeners = Browser.prototype._attachPartListeners;
  Browser.prototype._attachPartListeners = function(partId, htmlElement, options) {
    originalAttachPartListeners.call(this, partId, htmlElement, options);
    const range = this.options.dsaSpellLevelRange;
    if (!range || (partId !== "filters")) return;
    for (const input of htmlElement.querySelectorAll('input[name^="additional.level."]')) {
      input.min = range.min;
      input.max = range.max;
    }
  };
}

/**
 * @param {string} restriction Nivel configurado por el advancement.
 * @param {number} maxAvailable Nivel máximo de espacio del actor.
 * @returns {{min: number, max: number}|null}
 */
function spellLevelRange(restriction, maxAvailable) {
  if (restriction === "") return null;
  if (restriction === "available") return { min: 0, max: maxAvailable };
  if (restriction === "availableNoCantrips") return { min: 1, max: maxAvailable };
  const level = Number(restriction);
  return { min: level, max: level };
}

/**
 * Devuelve una identidad semántica para no contar dos veces copias del mismo
 * conjuro importado desde compendios o paquetes distintos.
 *
 * @param {Item} spell
 * @returns {string}
 */
function spellIdentity(spell) {
  if (spell.system.identifier) return `identifier:${spell.system.identifier}`;
  if (sourceDocumentId(spell)) return `document:${sourceDocumentId(spell)}`;
  if (sourceId(spell)) return `source:${sourceId(spell)}`;
  return `item:${spell.id}`;
}

/**
 * Agrupa los conjuros importados de una clase o subclase por su nivel de
 * conjuro. Sólo conserva Items con procedencia de compendio, necesaria para
 * registrarlos como elecciones históricas de ItemChoice.
 *
 * @param {Item} classItem
 * @param {string} identifier
 * @returns {Map<number, Item[]>}
 */
function importedClassSpellsByLevel(classItem, identifier) {
  const byLevel = new Map();
  const identities = new Set();
  const spells = classItem.actor?.itemTypes?.spell ?? [];

  for (const spell of spells) {
    const belongsToClass = spell.system.sourceItem === `class:${identifier}`
      || spell.system.classIdentifier === identifier;
    if (!belongsToClass || !sourceId(spell)) continue;

    const identity = spellIdentity(spell);
    if (identities.has(identity)) continue;
    identities.add(identity);

    const level = Number(spell.system.level);
    if (!Number.isInteger(level) || level < 0) continue;
    const bucket = byLevel.get(level) ?? [];
    bucket.push(spell);
    byLevel.set(level, bucket);
  }

  for (const bucket of byLevel.values()) {
    bucket.sort((left, right) => left.name.localeCompare(right.name));
  }
  return byLevel;
}

/**
 * Registra como elecciones históricas los conjuros de clase ya importados.
 * No reclama conjuros innatos, de dotes, ni de otra clase: D&D5e expone la
 * procedencia de un conjuro de clase mediante `sourceItem`.
 *
 * @param {Item} classItem
 * @param {object[]} advancements
 * @returns {object[]}
 */
function seedImportedSpellChoices(classItem, advancements) {
  const identifier = classItem.type === "subclass"
    ? classItem.system.classIdentifier
    : classItem.system.identifier;
  if (!identifier) return advancements;

  const byLevel = importedClassSpellsByLevel(classItem, identifier);
  const available = {
    cantrips: [...(byLevel.get(0) ?? [])],
    spells: Array.from(byLevel.entries())
      .filter(([spellLevel]) => spellLevel > 0)
      .sort(([left], [right]) => left - right)
      .flatMap(([, spells]) => spells)
  };
  const currentLevel = classItem.system.levels ?? 0;

  for (const advancement of advancements) {
    if ((advancement.type !== "ItemChoice") || (advancement.configuration?.type !== "spell")) continue;
    const spellLevel = advancement.configuration.restriction.level;
    const bag = spellLevel === "0" ? available.cantrips : available.spells;
    for (const [level, choice] of Object.entries(advancement.configuration.choices)
      .sort(([left], [right]) => Number(left) - Number(right))) {
      if (Number(level) > currentLevel) continue;
      const selected = bag.splice(0, choice.count);
      if (!selected.length) continue;
      advancement.value.added[level] = Object.fromEntries(selected.map(spell => [spell.id, sourceId(spell)]));
    }
  }
  return advancements;
}

/**
 * Calculates the choices that would remain empty after reconciling imported
 * spells. It uses the same two bags as the manager: cantrips and level 1+.
 * This helper does not write anything to the Actor.
 *
 * @param {Item} classItem
 * @param {object[]} advancements
 * @returns {{id: string, required: number, assigned: number, deficit: number}[]}
 */
function importedSpellChoiceDeficits(classItem, advancements) {
  const currentLevel = classItem.system.levels ?? 0;
  return seedImportedSpellChoices(classItem, advancements)
    .filter(advancement => advancement.type === "ItemChoice"
      && advancement.configuration?.type === "spell")
    .map(advancement => {
      let required = 0;
      let assigned = 0;
      for (const [level, choice] of Object.entries(advancement.configuration.choices)) {
        if (Number(level) > currentLevel) continue;
        required += choice.count;
        assigned += Object.keys(advancement.value.added[level] ?? {}).length;
      }
      return {
        id: advancement._id,
        required,
        assigned,
        deficit: Math.max(0, required - assigned)
      };
    });
}

/**
 * D&D5e 6.0.6 revierte todos los Advancements ya aplicados al añadir uno nuevo
 * con `AdvancementManager.forNewAdvancement`. Un ItemGrant importado sin
 * `value.added` no tiene nada que revertir: su `reverse` devuelve undefined,
 * pero el gestor intenta restaurarlo inmediatamente y D&D5e accede a
 * `undefined.items`.
 *
 * Eliminar exclusivamente esos pares automáticos reverse/restore conserva el
 * ItemGrant vacío tal como estaba y deja que el gestor nativo procese el nuevo
 * ItemChoice de conjuros.
 *
 * @param {object} manager Gestor nativo de Advancement de D&D5e.
 * @returns {number} Número de pasos automáticos omitidos.
 */
function removeEmptyItemGrantRestoreSteps(manager) {
  let removed = 0;
  manager.steps = manager.steps.filter(step => {
    const advancement = step.flow?.advancement;
    const isEmptyItemGrant = advancement?.type === "ItemGrant"
      && !Object.keys(advancement.value?.added ?? {}).length;
    const isUnsafeRestore = isEmptyItemGrant && ["reverse", "restore"].includes(step.type);
    if (isUnsafeRestore) removed += 1;
    return !isUnsafeRestore;
  });
  return removed;
}

/**
 * D&D5e 6.0.6 no expone una exclusión de UUIDs en ItemChoice. El Browser sí
 * admite filtros arbitrarios y usa el mismo patrón para excluir clases ya
 * presentes. Se conserva el Browser nativo; sólo se añade `NOT uuid IN` para
 * los conjuros embebidos que el Actor ya posee.
 */
function installExistingSpellExclusion() {
  const ItemChoice = CONFIG.DND5E.advancementTypes.ItemChoice?.documentClass;
  const Flow = ItemChoice?.metadata?.apps?.flow;
  const Browser = dnd5e.applications.CompendiumBrowser;
  const originalBrowse = Flow?.DEFAULT_OPTIONS?.actions?.browse;
  if (!Flow || !Browser || !originalBrowse || originalBrowse.dsaExcludesExistingSpells) return;
  installSpellLevelRangeControls();

  const browse = async function(event, target) {
    const config = this.advancement.configuration;
    const { current, max } = this.counts;
    if (current >= max) {
      ui.notifications.warn("DND5E.ADVANCEMENT.ItemChoice.Warning.MaxSelected", { localize: true });
      return;
    }
    const filters = { locked: { additional: {}, documentClass: "Item", exclusive: true } };
    let allowedSpellLevelRange = null;
    if (config.type) {
      filters.locked.types = new Set([config.type]);
      if ((config.type === "feat") && config.restriction.type) {
        const typeConfig = CONFIG.DND5E.featureTypes[config.restriction.type];
        const subtype = typeConfig.subtypes?.[config.restriction.subtype];
        filters.locked.additional.category = { [config.restriction.type]: 1 };
        if (subtype) filters.locked.additional.subtype = { [config.restriction.subtype]: 1 };
      }
    } else filters.locked.types = this.advancement.constructor.VALID_TYPES;

    if (config.type === "feat") {
      filters.locked.arbitrary = [{ k: "system.prerequisites.level", o: "lte", v: this.featureLevel }];
    } else if (config.type === "spell") {
      const levelRange = spellLevelRange(config.restriction.level, this._maxSpellSlotLevel());
      if (levelRange) {
        // `initial` es editable; `arbitrary` siempre se aplica al buscar y
        // no se puede ampliar desde la interfaz del navegador.
        filters.initial = { additional: { level: { ...levelRange } } };
        filters.locked.arbitrary = [
          { k: "system.level", o: "gte", v: levelRange.min },
          { k: "system.level", o: "lte", v: levelRange.max }
        ];
        allowedSpellLevelRange = levelRange;
      }
    }
    if ((config.type === "spell") && config.restriction.list.size) {
      filters.locked.additional.spelllist = config.restriction.list.reduce((result, list) => {
        result[list] = 1;
        return result;
      }, {});
    }
    if ((config.type === "spell") && config.restriction.school.size) {
      filters.locked.additional.school = config.restriction.school.reduce((result, school) => {
        result[school] = 1;
        return result;
      }, {});
    }

    const existing = existingSpellSourceIds(this.advancement.actor);
    if ((config.type === "spell") && existing.size) {
      filters.locked.arbitrary ??= [];
      filters.locked.arbitrary.push({ o: "NOT", v: { k: "uuid", o: "in", v: existing } });
    }
    const existingIdentifiers = existingSpellIdentifiers(this.advancement.actor);
    if ((config.type === "spell") && existingIdentifiers.size) {
      filters.locked.arbitrary ??= [];
      filters.locked.arbitrary.push({
        o: "NOT",
        v: { k: "system.identifier", o: "in", v: existingIdentifiers }
      });
    }
    const existingSourceDocumentIds = existingSpellSourceDocumentIds(this.advancement.actor);
    const result = await Browser.select({
      filters,
      dsaSpellLevelRange: allowedSpellLevelRange,
      prerequisites: {
        validate: item => validateSpellChoice(
          item, this.advancement.actor, this.featureLevel,
          existingIdentifiers, existingSourceDocumentIds
        )
      },
      selection: { min: 1, max: max - current }
    }, this.manager?._detachOptions());
    if (!result?.size) return;
    await this.advancement.apply(this.level, { selected: Array.from(result).filter(uuid => !this.selected.has(uuid)) });
    this.render();
  };
  browse.dsaExcludesExistingSpells = true;
  Flow.DEFAULT_OPTIONS.actions.browse = browse;
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

  const missing = seedImportedSpellChoices(classItem, advancementsData)
    .filter(data => !classItem.system.advancement.get(data._id));
  if (!missing.length) return { status: "already-configured" };

  const ItemChoice = CONFIG.DND5E.advancementTypes.ItemChoice?.documentClass;
  const AdvancementManager = dnd5e.applications.advancement.AdvancementManager;
  if (!ItemChoice || !AdvancementManager) {
    throw new Error("La API de avances ItemChoice de D&D5e no está disponible.");
  }

  const advancements = missing.map(data => new ItemChoice(data, { parent: classItem }));
  const manager = AdvancementManager.forNewAdvancement(classItem.actor, classItem.id, advancements);
  const skippedItemGrantSteps = removeEmptyItemGrantRestoreSteps(manager);
  if (skippedItemGrantSteps) {
    console.warn(`${MODULE_ID} | ${classItem.actor.name}: se omitieron ${skippedItemGrantSteps} pasos `
      + `de restauraci\u00f3n de ItemGrant sin datos para ${classItem.name}.`);
  }
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

/**
 * Revisa los avances ausentes sin modificar Actores. Las entradas cubiertas
 * por conjuros importados se devuelven separadas para que no abran el selector.
 *
 * @param {Iterable<Actor>} [actors=game.actors]
 * @returns {{pending: object[], reconciled: object[]}}
 */
function reviewExistingActorSpellAdvancements(actors=game.actors, { log=false }={}) {
  const pending = [];
  const reconciled = [];
  for (const actor of actors) {
    if (!actor?.isOwner || !actor.system.metadata?.supportsAdvancement) continue;
    const classItems = [...(actor.itemTypes?.class ?? []), ...(actor.itemTypes?.subclass ?? [])];
    for (const item of classItems) {
      const advancements = advancementsForClass(item);
      if (!advancements) continue;
      const missing = advancements
        .filter(advancement => !item.system.advancement.get(advancement._id))
        .map(advancement => advancement._id);
      if (!missing.length) continue;

      const deficits = importedSpellChoiceDeficits(item, advancements);
      const deficit = deficits.reduce((total, entry) => total + entry.deficit, 0);
      const hasNonSpellAdvancement = advancements.some(advancement => missing.includes(advancement._id)
        && ((advancement.type !== "ItemChoice") || (advancement.configuration?.type !== "spell")));
      const entry = { actor, item, missing, deficits, deficit };
      const status = (deficit || hasNonSpellAdvancement) ? "pending-choice" : "reconciled";
      if (status === "pending-choice") pending.push(entry);
      else reconciled.push(entry);
      if (log) {
        detailedLog(`${MODULE_ID} | Revisión: ${actor.name} (${actor.id}) — ${item.name} (${item.id}); `
          + `estado=${status}; nivel=${item.system.levels ?? 0}; déficit=${deficit}; `
          + `avances ausentes=${missing.join(", ")}.`, {
          status,
          classLevel: item.system.levels ?? 0,
          missingAdvancements: missing,
          spellChoices: deficits,
          totalDeficit: deficit,
          hasNonSpellAdvancement
        });
      }
    }
  }
  if (log) {
    detailedLog(`${MODULE_ID} | Resumen de revisión: ${pending.length} con selección pendiente, ${reconciled.length} sin selección necesaria.`);
  }
  return { pending, reconciled };
}

/**
 * Returns only entries requiring a manual choice. This preserves the original
 * public API for existing macros while the settings UI also exposes entries
 * reconciled without a selector.
 *
 * @param {Iterable<Actor>} [actors=game.actors]
 * @returns {object[]}
 */
function findExistingActorSpellAdvancements(actors=game.actors) {
  return reviewExistingActorSpellAdvancements(actors).pending;
}

/**
 * Instala los ItemChoice ya cubiertos como historial del Item de clase. No
 * ejecuta un AdvancementManager porque no hay ninguna elección que solicitar:
 * los UUID ya guardados en `value.added` apuntan a los conjuros existentes.
 *
 * Se usa la API pública de D&D5e `Item#createAdvancement` para que se apliquen
 * las mismas validaciones y migraciones que desde la hoja del Item.
 *
 * @param {{actor: Actor, item: Item}} entry
 * @returns {Promise<{status: string, count?: number}>}
 */
async function reconcileCoveredSpellAdvancements(entry) {
  const { actor, item: classItem } = entry;
  const advancementsData = advancementsForClass(classItem);
  if (!advancementsData || !actor.system.metadata?.supportsAdvancement) {
    return { status: "unsupported-actor" };
  }

  const seeded = seedImportedSpellChoices(classItem, advancementsData);
  const missing = seeded.filter(data => !classItem.system.advancement.get(data._id));
  const deficits = importedSpellChoiceDeficits(classItem, seeded);
  const deficit = deficits.reduce((total, choice) => total + choice.deficit, 0);
  const hasUnsupportedAdvancement = missing.some(data => (data.type !== "ItemChoice")
    || (data.configuration?.type !== "spell"));
  if (deficit || hasUnsupportedAdvancement) return { status: "requires-choice" };
  if (!missing.length) return { status: "already-configured" };

  for (const advancement of missing) {
    await classItem.createAdvancement(advancement.type, advancement, { renderSheet: false });
  }
  detailedLog(`${MODULE_ID} | Perfil reconciliado: ${actor.name} (${actor.id}) — ${classItem.name} (${classItem.id}).`, {
    installedAdvancements: missing.map(advancement => advancement._id),
    spellChoices: deficits
  });
  return { status: "reconciled", count: missing.length };
}

/** @type {{queue: object[], cursor: number, current: object|null, completed: object[], reconciled: object[], skipped: object[], errors: object[]}|null} */
let existingActorBatch = null;

/** @param {object} batch */
function existingActorBatchStatus(batch) {
  return {
    status: batch.current ? "awaiting-choice" : (batch.cursor < batch.queue.length ? "running" : "complete"),
    total: batch.queue.length,
    current: batch.current ? { actor: batch.current.actor.name, item: batch.current.item.name } : null,
    completed: batch.completed.map(entry => ({ actor: entry.actor.name, item: entry.item.name })),
    reconciled: batch.reconciled.map(entry => ({ actor: entry.actor.name, item: entry.item.name })),
    skipped: batch.skipped.map(entry => ({ actor: entry.actor.name, item: entry.item.name, status: entry.status })),
    errors: batch.errors.map(entry => ({ actor: entry.actor.name, item: entry.item.name, error: entry.error.message })),
    pending: batch.queue.slice(batch.cursor + (batch.current ? 1 : 0))
      .map(entry => ({ actor: entry.actor.name, item: entry.item.name }))
  };
}

/**
 * Abre el siguiente gestor nativo de la cola. No avanza mientras haya una
 * elección visible: el usuario conserva siempre la selección de conjuros.
 *
 * @param {object} batch
 * @returns {Promise<object>}
 */
async function advanceExistingActorBatch(batch) {
  if (existingActorBatch !== batch) return existingActorBatchStatus(batch);
  if (batch.current?.manager?.rendered) return existingActorBatchStatus(batch);
  batch.current = null;

  while (batch.cursor < batch.queue.length) {
    const entry = batch.queue[batch.cursor];
    try {
      detailedLog(`${MODULE_ID} | Procesando cola ${batch.cursor + 1}/${batch.queue.length}: ${entry.actor.name} (${entry.actor.id}) — ${entry.item.name} (${entry.item.id}).`, {
        missingAdvancements: entry.missing,
        spellChoices: entry.deficits,
        totalDeficit: entry.deficit
      });
      const result = await configureClass(entry.item);
      if (result.status === "rendered") {
        batch.current = { ...entry, manager: result.manager };
        detailedLog(`${MODULE_ID} | Selector nativo abierto para ${entry.actor.name} — ${entry.item.name}.`);
        ui.notifications.info(`${MODULE_ID} | ${entry.actor.name}: selecciona los conjuros de ${entry.item.name}.`);
        return existingActorBatchStatus(batch);
      }
      batch.skipped.push({ ...entry, status: result.status });
      detailedLog(`${MODULE_ID} | Entrada omitida: ${entry.actor.name} — ${entry.item.name} (${result.status}).`);
    } catch (error) {
      console.error(`${MODULE_ID} | No se pudo configurar ${entry.actor.name}: ${entry.item.name}`, error);
      batch.errors.push({ ...entry, error });
    }
    batch.cursor += 1;
  }

  existingActorBatch = null;
  detailedLog(`${MODULE_ID} | Procesamiento masivo terminado.`, {
    configured: batch.completed.length,
    reconciled: batch.reconciled.length,
    skipped: batch.skipped.length,
    errors: batch.errors.length
  });
  ui.notifications.info(`${MODULE_ID} | Procesamiento masivo terminado: ${batch.completed.length} configurados, ${batch.reconciled.length} perfiles reconciliados, ${batch.skipped.length} omitidos, ${batch.errors.length} errores.`);
  return existingActorBatchStatus(batch);
}

/**
 * Inicia una cola de Actores existentes. No añade conjuros automáticamente;
 * cada entrada abre el AdvancementManager nativo para que el usuario elija.
 *
 * @param {Iterable<Actor>} [actors=game.actors]
 * @returns {Promise<object>}
 */
async function configureExistingActors(actors=game.actors) {
  if (existingActorBatch) return existingActorBatchStatus(existingActorBatch);
  const review = reviewExistingActorSpellAdvancements(actors, { log: true });
  const reconciled = [];
  const errors = [];
  for (const entry of review.reconciled) {
    try {
      const result = await reconcileCoveredSpellAdvancements(entry);
      if (result.status === "reconciled") reconciled.push({ ...entry, count: result.count });
      else detailedLog(`${MODULE_ID} | Perfil no reconciliado: ${entry.actor.name} — ${entry.item.name} (${result.status}).`);
    } catch (error) {
      console.error(`${MODULE_ID} | No se pudo reconciliar ${entry.actor.name}: ${entry.item.name}`, error);
      errors.push({ ...entry, error });
    }
  }

  // Relee la cola tras guardar los perfiles: si un Actor cambió durante el
  // proceso, el selector sólo se abrirá para sus déficits actuales.
  const pending = reviewExistingActorSpellAdvancements(actors, { log: true }).pending;
  existingActorBatch = {
    queue: pending,
    cursor: 0,
    current: null,
    completed: [],
    reconciled,
    skipped: [],
    errors
  };
  if (!existingActorBatch.queue.length) {
    const result = existingActorBatchStatus(existingActorBatch);
    existingActorBatch = null;
    ui.notifications.info(`${MODULE_ID} | No hay selecciones pendientes. Se reconciliaron ${reconciled.length} perfiles.`);
    return result;
  }
  return advanceExistingActorBatch(existingActorBatch);
}

/**
 * Reintenta la entrada actual tras cerrar o cancelar su selector nativo.
 * @returns {Promise<object>}
 */
async function resumeExistingActorBatch() {
  if (!existingActorBatch) throw new Error("No hay ningún procesamiento masivo pendiente.");
  return advanceExistingActorBatch(existingActorBatch);
}

/** @returns {object|null} */
function cancelExistingActorBatch() {
  if (!existingActorBatch) return null;
  const result = existingActorBatchStatus(existingActorBatch);
  existingActorBatch = null;
  ui.notifications.info(`${MODULE_ID} | Procesamiento masivo cancelado.`);
  return result;
}

/** Actualiza las ventanas abiertas del menú de procesamiento masivo. */
function refreshExistingActorBatchConfig() {
  foundry.applications.instances.forEach(app => {
    if (app instanceof ExistingActorBatchConfig) app.render();
  });
}

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Menú de Ajustes de partida para revisar y ejecutar la cola de Actores
 * existentes. La interfaz sólo controla la cola; las elecciones se resuelven
 * siempre en el AdvancementManager nativo de D&D5e.
 */
class ExistingActorBatchConfig extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-existing-actors`,
    classes: ["dnd5e-spell-advancement"],
    window: {
      title: "Procesar Actores existentes",
      icon: "fas fa-wand-magic-sparkles"
    },
    position: {
      width: 560,
      height: "auto"
    },
    actions: {
      scan: ExistingActorBatchConfig.#onScan,
      start: ExistingActorBatchConfig.#onStart,
      resume: ExistingActorBatchConfig.#onResume,
      cancel: ExistingActorBatchConfig.#onCancel
    }
  };

  static PARTS = {
    content: {
      template: `modules/${MODULE_ID}/templates/existing-actors-config.hbs`
    }
  };

  /** @override */
  async _prepareContext(options) {
    const review = reviewExistingActorSpellAdvancements();
    return {
      ...await super._prepareContext(options),
      pending: review.pending.map(entry => ({
        actor: entry.actor.name,
        item: entry.item.name,
        count: entry.missing.length,
        deficit: entry.deficit
      })),
      reconciled: review.reconciled.map(entry => ({
        actor: entry.actor.name,
        item: entry.item.name,
        count: entry.missing.length
      })),
      batch: existingActorBatch ? existingActorBatchStatus(existingActorBatch) : null
    };
  }

  /** @this {ExistingActorBatchConfig} */
  static async #onScan() {
    reviewExistingActorSpellAdvancements(game.actors, { log: true });
    return this.render({ force: true });
  }

  /** @this {ExistingActorBatchConfig} */
  static async #onStart() {
    await configureExistingActors();
    return this.render({ force: true });
  }

  /** @this {ExistingActorBatchConfig} */
  static async #onResume() {
    try {
      await resumeExistingActorBatch();
    } catch (error) {
      ui.notifications.warn(error.message);
    }
    return this.render({ force: true });
  }

  /** @this {ExistingActorBatchConfig} */
  static async #onCancel() {
    cancelExistingActorBatch();
    return this.render({ force: true });
  }
}

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, DETAILED_CONSOLE_LOG_SETTING, {
    name: "Mostrar registro detallado en consola",
    hint: "Registra el análisis y la cola de Actores con sus cupos, déficit y decisiones.",
    scope: "world",
    config: true,
    restricted: true,
    type: Boolean,
    default: true
  });

  game.settings.registerMenu(MODULE_ID, "existingActorBatch", {
    name: "Procesar Actores existentes",
    hint: "Detecta y procesa en cola los avances de conjuros pendientes en Actores importados.",
    label: "Abrir procesamiento",
    icon: "fas fa-wand-magic-sparkles",
    type: ExistingActorBatchConfig,
    restricted: true
  });
});

Hooks.once("ready", () => {
  installExistingSpellExclusion();
  game.modules.get(MODULE_ID).api = {
    configureCleric,
    configureActorCleric,
    configureBard,
    configureActorBard,
    configureActorClass,
    configureActorSubclass,
    findExistingActorSpellAdvancements,
    reviewExistingActorSpellAdvancements,
    configureExistingActors,
    resumeExistingActorBatch,
    cancelExistingActorBatch
  };
});

Hooks.on("dnd5e.advancementManagerComplete", manager => {
  const batch = existingActorBatch;
  if (!batch?.current || (batch.current.manager !== manager)) return;
  batch.completed.push(batch.current);
  batch.cursor += 1;
  batch.current = null;
  refreshExistingActorBatchConfig();
  setTimeout(() => {
    advanceExistingActorBatch(batch).catch(error => {
      console.error(`${MODULE_ID} | No se pudo continuar el procesamiento masivo`, error);
      ui.notifications.error("No se pudo continuar el procesamiento masivo. Consulta la consola.");
    }).finally(() => {
      refreshExistingActorBatchConfig();
    });
  }, 0);
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
