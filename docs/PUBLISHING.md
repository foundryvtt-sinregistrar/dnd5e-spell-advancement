# Publicación

## Alta inicial en Foundry VTT

En <https://foundryvtt.com/creators/submit/>, completar el formulario con:

| Campo | Valor o acción |
| --- | --- |
| **Package Type** | `Add-on Module` |
| **Package ID** | `dnd5e-spell-advancement` |
| **Package Title** | `D&D5e Spell Advancement` |
| **Package URL** | `https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement` |
| **Discord Username** | El usuario de Discord del autor con el que desea recibir el rol Developer. No inventarlo ni dejar un usuario ajeno. |
| **Description** | La descripción pública revisada del módulo; debe indicar las clases soportadas, D&D5e 6.0.5 y sus límites funcionales. |
| **Generative AI Content Declaration** | Dejarla vacía sólo si procede conforme a la política vigente. Si el paquete requiere declaración, describir de forma exacta el uso de IA y el contenido de cara al usuario afectado. |
| **Limited License Agreement** | El autor debe leerlo y marcar la aceptación. |
| **Copyright acknowledgement** | El autor debe confirmar que tiene derecho a distribuir todo el contenido. |
| **AI Content Policy acknowledgement** | El autor debe revisar la política vigente y confirmar su cumplimiento. |

No enviar el formulario hasta que la release versionada esté pública y se hayan
verificado sus URLs. La aceptación de las tres declaraciones y el envío son
acciones personales del autor; no deben automatizarse ni deducirse.

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

4. Crea y sube el tag `v<versión>` en el commit exacto de `main`. El tag debe
   coincidir exactamente con la versión de `module.json`.
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
- La versión del Marketplace coincide exactamente con `module.json`.
- **Required Core Version:** `14.367`; **Compatible Core Version:** `14.368`.
- **Package Manifest URL de esta versión:**
  `https://github.com/foundryvtt-sinregistrar/dnd5e-spell-advancement/releases/download/v<versión>/module.json`
- **Release Notes URL:** la sección de la versión correspondiente de `CHANGELOG.md` o la página de la GitHub Release.
- La ficha explica que requiere D&D5e 6.0.5 y que no incluye contenido oficial de Dungeons & Dragons.
- La ficha enlaza a `LICENSE`, al repositorio y al rastreador de incidencias.

La URL `manifest` dentro del módulo queda apuntada a `main` para que las instalaciones reciban actualizaciones. La URL de *Package Manifest* que se introduce en Marketplace debe apuntar a la release concreta, para que Foundry pueda conservar el historial de versiones.
