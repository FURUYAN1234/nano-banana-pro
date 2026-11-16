"""Strictly verify an extracted release. Standard library only; no writes."""
import argparse
import hashlib
import json
import os
import re
from pathlib import Path

MANIFEST = "SHA256SUMS.json"


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError("Duplicate manifest key: " + key)
        result[key] = value
    return result


def linked(path):
    return path.is_symlink() or getattr(path, "is_junction", lambda: False)()


def verify_package(root):
    root = Path(root).absolute()
    if linked(root) or not root.is_dir():
        raise ValueError("Package root must be an unlinked directory")
    manifest = root / MANIFEST
    if linked(manifest):
        raise ValueError("Linked manifest rejected")
    data = json.loads(manifest.read_text(encoding="utf-8-sig"), object_pairs_hook=unique_object)
    if not isinstance(data, dict) or data.get("schemaVersion") != 1 or data.get("algorithm") != "sha256" or not isinstance(data.get("files"), dict) or not data["files"]:
        raise ValueError("Invalid SHA256 manifest")
    expected = data["files"]
    folded = set()
    for name, digest in expected.items():
        if not isinstance(name, str) or name == MANIFEST or "\\" in name or ":" in name or "\x00" in name or name.startswith("/") or any(part in ("", ".", "..") for part in name.split("/")):
            raise ValueError("Unsafe manifest path: " + str(name))
        if name.casefold() in folded:
            raise ValueError("Case-colliding manifest path: " + name)
        folded.add(name.casefold())
        if not isinstance(digest, str) or not re.fullmatch(r"[a-f0-9]{64}", digest):
            raise ValueError("Invalid SHA256: " + name)
    actual = {}
    for directory, dirs, files in os.walk(root, followlinks=False):
        for name in dirs + files:
            path = Path(directory) / name
            if linked(path):
                raise ValueError("Linked package path rejected: " + str(path.relative_to(root)))
        for name in files:
            path = Path(directory) / name
            relative = path.relative_to(root).as_posix()
            if relative == MANIFEST:
                continue
            if not path.is_file():
                raise ValueError("Non-file package entry: " + relative)
            digest = hashlib.sha256()
            with path.open("rb") as stream:
                for block in iter(lambda: stream.read(1024 * 1024), b""):
                    digest.update(block)
            actual[relative] = digest.hexdigest()
    missing = sorted(set(expected) - set(actual))
    extra = sorted(set(actual) - set(expected))
    changed = sorted(name for name in expected.keys() & actual.keys() if expected[name] != actual[name])
    if missing or extra or changed:
        raise ValueError(json.dumps({"missing": missing, "extra": extra, "hashMismatch": changed}, ensure_ascii=False))
    return {"pass": True, "files": len(actual), "strict": True}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", nargs="?", default=".")
    parser.add_argument("--strict", action="store_true", help="Explicit strict mode; strict verification is always used")
    args = parser.parse_args()
    try:
        print(json.dumps(verify_package(args.directory), ensure_ascii=False))
    except (OSError, ValueError, TypeError) as error:
        print("PACKAGE_INVALID: " + str(error))
        raise SystemExit(1)
