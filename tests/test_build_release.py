from __future__ import annotations

import json
import shutil
import subprocess
import tempfile
import unittest
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class BuildReleaseTests(unittest.TestCase):
    def test_zip_contains_one_module_root_and_manifest(self) -> None:
        dist = Path(tempfile.mkdtemp(prefix="dsa-release-"))
        self.addCleanup(shutil.rmtree, dist, True)
        subprocess.run(
            ["python", "-B", "dev-tools/buildScripts/build_release.py", "--dist", str(dist), "--allow-dirty"],
            cwd=ROOT,
            check=True,
        )
        manifest = json.loads(
            subprocess.run(
                ["git", "show", "HEAD:module.json"],
                cwd=ROOT,
                check=True,
                text=True,
                stdout=subprocess.PIPE,
            ).stdout
        )
        archive = dist / f"{manifest['id']}-{manifest['version']}.zip"
        with zipfile.ZipFile(archive) as package:
            self.assertIn(f"{manifest['id']}/module.json", package.namelist())
            self.assertIn(f"{manifest['id']}/scripts/main.mjs", package.namelist())
            packaged_manifest = json.loads(package.read(f"{manifest['id']}/module.json"))
            self.assertEqual(packaged_manifest["id"], manifest["id"])
            self.assertEqual(packaged_manifest["version"], manifest["version"])


if __name__ == "__main__":
    unittest.main()
