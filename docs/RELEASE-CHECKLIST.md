# Checklist de validación de release

Esta lista se completa antes de crear el tag de cada versión. La compatibilidad
declarada es Foundry VTT 14.367--14.368 y D&D5e 6.0.6.

## Integridad del artefacto

- [ ] `npm run validate` termina correctamente.
- [ ] `npm run test:release` termina correctamente.
- [ ] El ZIP de `python -B dev-tools/buildScripts/build_release.py` contiene un
  solo directorio `dnd5e-spell-advancement/` y su `module.json`.
- [ ] Los SHA-256 de ambos ZIP coinciden con `SHA256SUMS.txt`.

## Prueba funcional en Foundry

- [ ] En un mundo nuevo, habilitar el módulo con D&D5e 6.0.6 no produce errores
  de consola al iniciar.
- [ ] Crear un Actor con cada clase base admitida abre el `AdvancementManager`
  nativo y el Compendium Browser de D&D5e, sin un selector propio del módulo.
- [ ] Resolver una elección de trucos y otra de nivel 1+ crea el conjuro en el
  Actor con la lista, nivel, aptitud y estado de preparación esperados.
- [ ] Subir de nivel un Actor ya configurado solicita sólo las elecciones de
  ese nivel y conserva las anteriores.
- [ ] Probar Caballero arcano y Tramposo arcano con sus Items oficiales del PHB;
  confirmar en particular la concesión fija de `Mano de mago` del Tramposo.
- [ ] En un Actor importado con elecciones completas, **Procesar Actores
  existentes** registra el historial sin crear, modificar ni eliminar conjuros.
- [ ] En un Actor importado con déficit, la misma herramienta abre el selector
  nativo sólo para las elecciones faltantes; cerrar, reanudar y cancelar la
  cola funcionan sin perder elecciones ya confirmadas.
- [ ] Repetir la prueba de Actor importado que contiene un `ItemGrant` sin
  `value.added`, verificando que la cola no falla durante la restauración.

## Publicación

- [ ] La versión de `module.json`, el encabezado de `CHANGELOG.md`, el tag y la
  versión del Marketplace coinciden exactamente.
- [ ] La release publicada contiene `dnd5e-spell-advancement.zip`, el ZIP
  versionado, `module.json` y `SHA256SUMS.txt`.
- [ ] La URL de manifiesto de la versión del Marketplace apunta a
  `releases/download/v<versión>/module.json`, no a la rama `main`.
- [ ] Una instalación limpia desde esa URL de manifiesto se completa y permite
  activar el módulo.
