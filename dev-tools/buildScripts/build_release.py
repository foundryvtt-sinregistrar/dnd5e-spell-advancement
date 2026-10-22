#!/usr/bin/env python3
"""Build clean Foundry VTT release ZIPs from a committed Git ref."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from pathlib import Path


def run(command: list[str], cwd: Path) -> str:
    result = subprocess.run(command, cwd=cwd, check=True, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return result.stdout.strip()


def repository_root(start: Path) -> Path:
    return Path(run(["git", "rev-parse", "--show-toplevel"], start)).resolve()


def ensure_clean_worktree(root: Path) -> None:
    if run(["git", "status", "--porcelain"], root):
        raise RuntimeError("El árbol de trabajo contiene cambios. Haz commit o usa --allow-dirty.")


def load_manifest(root: Path, ref: str) -> tuple[str, str]:
    """Read package identity from the exact Git ref that will be archived."""
    data = json.loads(run(["git", "show", f"{ref}:module.json"], root))
    module_id, version = str(data.get("id", "")).strip(), str(data.get("version", "")).strip()
    if not module_id or not version:
        raise ValueError("module.json debe contener id y version.")
    return module_id, version


def archive(root: Path, ref: str, destination: Path, prefix: str) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["git", "archive", "--format=zip", f"--prefix={prefix}/", "-o", str(destination), ref], cwd=root, check=True)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dist", default="dist", help="Directorio de salida.")
    parser.add_argument("--ref", default="HEAD", help="Commit o tag que se empaqueta.")
    parser.add_argument("--allow-dirty", action="store_true")
    args = parser.parse_args()
    try:
        root = repository_root(Path.cwd())
        module_id, version = load_manifest(root, args.ref)
        if not args.allow_dirty:
            ensure_clean_worktree(root)
        output = (root / args.dist).resolve()
        versioned = output / f"{module_id}-{version}.zip"
        alias = output / f"{module_id}.zip"
        archive(root, args.ref, versioned, module_id)
        archive(root, args.ref, alias, module_id)
        checksums = output / "SHA256SUMS.txt"
        checksums.write_text(
            f"{sha256(alias)}  {alias.name}\n{sha256(versioned)}  {versioned.name}\n",
            encoding="utf-8",
        )
        print(f"OK: {alias}\nOK: {versioned}\nOK: {checksums}\nRef: {args.ref}")
        return 0
    except (subprocess.CalledProcessError, OSError, ValueError, RuntimeError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
