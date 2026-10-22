# Publicación

## Artefacto de GitHub

1. Asegura que `main` contiene el commit aprobado y que el árbol de trabajo
   está limpio.
2. Completa y registra las pruebas de [`RELEASE-CHECKLIST.md`](RELEASE-CHECKLIST.md)
   en el entorno declarado por `module.json`.
3. Comprueba que `module.json` contiene la versión que se va a publicar y ejecuta:

   ```powershell
   npm run validate
   npm run test:release
   python -B dev-tools/buildScripts/build_release.py
   ```

4. Crea y sube el tag `v<versión>` en el commit exacto de `main`. Para esta
   entrega, el tag es `v1.14.3`.
5. La acción `Release` crea una GitHub Release en borrador con:
   - `dnd5e-spell-advancement.zip` (el archivo al que apunta el manifiesto);
   - `dnd5e-spell-advancement-<versión>.zip` (archivo inmutable de la versión);
   - `module.json` y `SHA256SUMS.txt`.
6. Verifica los SHA-256, revisa el borrador, publica la release y verifica la
   instalación con la URL `manifest` de `module.json`.

No se debe mover ni sustituir una versión ya publicada. Para una corrección, aumenta la versión y crea un tag nuevo.

## Foundry VTT Marketplace

El Marketplace se administra con una cuenta de Foundry; el repositorio no puede dar de alta el paquete ni aceptar sus condiciones en nombre del autor. Antes de enviarlo en <https://foundryvtt.com/packages>, confirma:

- El repositorio y la GitHub Release son públicos.
- La release publicada contiene el ZIP alias y su `module.json`; el `download` del manifiesto resuelve a ese ZIP.
- La versión del Marketplace coincide exactamente con `module.json` (`1.14.3`).
- **Required Core Version:** `14.367`; **Compatible Core Version:** `14.368`.
- **Package Manifest URL de esta versión:**
  `https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement/releases/download/v1.14.3/module.json`
- **Release Notes URL:** la sección `1.14.3` de `CHANGELOG.md` o la página de la GitHub Release.
- La ficha explica que requiere D&D5e 6.0.5 y que no incluye contenido oficial de Dungeons & Dragons.
- La ficha enlaza a `LICENSE`, al repositorio y al rastreador de incidencias.

La URL `manifest` dentro del módulo queda apuntada a `main` para que las instalaciones reciban actualizaciones. La URL de *Package Manifest* que se introduce en Marketplace debe apuntar a la release concreta, para que Foundry pueda conservar el historial de versiones.
