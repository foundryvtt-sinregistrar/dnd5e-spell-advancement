# Validación de Spell Advancement con D&D5e 6.1.1

Fecha: 2026-11-27. Rama: `compat/dnd5e-6.1.1`.

## Entorno confirmado en ejecución

| Componente | Versión |
| --- | --- |
| Foundry VTT | 14.370 |
| D&D5e | 6.1.1 |
| Spell Advancement activo | 1.14.6 |
| Player's Handbook | 3.0.0 |

Prueba realizada como Gamemaster en `http://localhost:31471/game`, mediante
el navegador integrado. El canal de control de Chrome no estaba disponible.

## Caso y resultados

Se creó el Actor temporal `mjqPnBb2beYUkq0U`, de tipo personaje, con copias
de Pícaro a nivel 3, Tramposo Arcano y su rasgo Lanzamiento de conjuros
procedentes del compendio oficial de clases de PHB. No se modificaron los
documentos originales del compendio ni Actores existentes.

1. `configureActorSubclass` devolvió `rendered` y abrió el gestor nativo
   para el avance `dsaATSpells00001`, con tres conjuros preparados pendientes.
   No añadió las elecciones de trucos que ya cubre el rasgo nativo.
2. **Select Spell** abrió el Compendium Browser nativo. La configuración
   observada bloqueó `class:wizard` y los límites de nivel 1–1; el selector
   admitía de una a tres elecciones.
3. Se marcaron las casillas de Magic Missile, Mage Armor y Shield de PHB
   2024 y se pulsó **Select**. El gestor mostró **Chosen: 3 of 3**.
4. Al pulsar **Complete**, el flujo nativo creó exactamente tres Items de
   conjuro y guardó sus elecciones en `value.added.3` del Advancement.
5. Tras una recarga completa de la página, se verificaron los mismos IDs
   de Item, UUID de origen, referencias en `value.added.3`, aptitud `int`,
   método `spell`, preparación `1` y origen
   `phbrgeArcaneTric.dsaATSpells00001` en los tres conjuros.
6. Al reabrir la ficha y su pestaña **Spells**, aparecieron los tres conjuros
   bajo Arcane Trickster, con **Prepared 3 / 3**.
7. Repetir `configureActorSubclass` devolvió `already-configured`, sin abrir
   otro gestor ni duplicar los conjuros.

| Conjuro PHB | ID persistido en Actor | UUID de origen |
| --- | --- | --- |
| Magic Missile | `pJUF2dHfYtceKJQn` | `Compendium.dnd-players-handbook.spells.Item.phbsplMagicMissi` |
| Mage Armor | `SlukPMDIMBxdsKV2` | `Compendium.dnd-players-handbook.spells.Item.phbsplMageArmor0` |
| Shield | `6ZkS80zyyrYRbqsc` | `Compendium.dnd-players-handbook.spells.Item.phbsplShield0000` |

Resultado: **PASS**. Queda cubierta la selección en navegador nativo y su
persistencia en el Actor, pendientes de la validación anterior. Se actualiza
`relationships.systems[dnd5e].compatibility.verified` a `6.1.1` sin cambiar
la versión publicada del módulo ni su código de ejecución.

Comprobaciones locales finales: `node --test tests/arcane-trickster.test.mjs`
(2/2), `node dev-tools/buildScripts/validate-release.mjs` y `git diff --check`
superadas.

## Alcance y limpieza

Esta prueba cubre una elección del Tramposo Arcano a nivel 3; no representa
una repetición de todas las clases, niveles o flujos de reemplazo diario.
Se retiró el Actor temporal después de comprobar la persistencia. No se
cambiaron los módulos activos ni las preferencias del mundo.

## Ficha de reanudación

- Spell Advancement: comprobación pendiente completada.
- Rama local: `compat/dnd5e-6.1.1`; compatibilidad verificada: `6.1.1`.
- Evidencia: selección nativa, tres conjuros, recarga, ficha y repetición sin duplicados.
- Continúan pendientes los otros cuatro módulos del plan previo.
- No se ha publicado una release ni enviado cambios a un remoto.
