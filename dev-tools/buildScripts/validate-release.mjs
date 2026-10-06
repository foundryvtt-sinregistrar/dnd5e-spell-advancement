import { readFile } from "node:fs/promises";

const moduleId = "dnd5e-spell-advancement";
const manifest = JSON.parse(await readFile("module.json", "utf8"));
const required = ["id", "title", "description", "version", "authors", "compatibility", "relationships", "url", "manifest", "download", "bugs", "readme", "changelog", "license", "esmodules"];
const urls = ["url", "manifest", "download", "bugs", "readme", "changelog", "license"];

for (const property of required) {
  if (!manifest[property]) throw new Error(`module.json requiere '${property}'.`);
}
if (manifest.id !== moduleId) throw new Error(`El id debe ser '${moduleId}'.`);
if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(manifest.version)) throw new Error("La versión debe ser semver.");
for (const property of urls) {
  if (!/^https:\/\//.test(manifest[property])) throw new Error(`'${property}' debe usar una URL HTTPS pública.`);
}
if (!manifest.download.endsWith(`/${moduleId}.zip`)) throw new Error("La descarga debe ser el ZIP alias de la release.");
if (!manifest.esmodules.includes("scripts/main.mjs")) throw new Error("Falta scripts/main.mjs.");
await readFile("scripts/main.mjs", "utf8");
await readFile("LICENSE", "utf8");
await readFile("CHANGELOG.md", "utf8");
console.log(`OK: ${moduleId} ${manifest.version}`);
