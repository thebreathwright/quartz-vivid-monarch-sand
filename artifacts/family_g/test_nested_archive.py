"""Family G live nested-archive discriminator.

Reads UP2SPEED.zip in place. Hashes the container and the declared member
from zip memory. Does not extractall. Does not write /tmp.

Not a novelty proof.
"""

from __future__ import annotations

import hashlib
import json
import zipfile
from pathlib import Path

ROOT = Path("/workspace")
ARCHIVE = ROOT / "attachments" / "UP2SPEED.zip"
MEMBER = (
    "ALEF_v0.4_schema_validated_package/"
    "CANONICAL_RECONSTRUCTION_SYSTEM/"
    "03_claim_registry.seed.jsonl"
)
EXTRACT = ROOT / "src" / "lib" / "canon" / "claims.json"
RESULT = ROOT / "artifacts" / "family_g" / "nested_archive_result.json"

EXPECTED_ARCHIVE = "7b1e4af5a750682dbd4a8d4e82fffbc69ca8e983c83dbe0523db26320982e591"
EXPECTED_MEMBER = "783eadf6a209e64ee2e9908f54692297a8bcbd08ee5e4a652e98dbe482256495"
EXPECTED_COUNT = 60


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> int:
    failures: list[str] = []
    if not ARCHIVE.is_file():
        payload = {"passed": False, "failures": ["ARCHIVE_ABSENT"], "temp_files": False}
        RESULT.write_text(json.dumps(payload, indent=2) + "\n")
        print(json.dumps(payload))
        return 1

    archive_sha = sha256_file(ARCHIVE)
    with zipfile.ZipFile(ARCHIVE) as zf:
        names = [name for name in zf.namelist() if name == MEMBER]
        if not names:
            failures.append("MEMBER_ABSENT")
            member_bytes = b""
        else:
            member_bytes = zf.read(MEMBER)

    member_sha = hashlib.sha256(member_bytes).hexdigest() if member_bytes else None
    records = [json.loads(line) for line in member_bytes.decode("utf-8").splitlines() if line.strip()] if member_bytes else []
    ids = [row["id"] for row in records]
    expected_ids = [f"RAC-CLM-{i:03d}" for i in range(1, EXPECTED_COUNT + 1)]
    extract = json.loads(EXTRACT.read_text()) if EXTRACT.is_file() else []

    if archive_sha != EXPECTED_ARCHIVE:
        failures.append("CONTAINER_DIGEST_MISMATCH")
    if member_sha != EXPECTED_MEMBER:
        failures.append("MEMBER_DIGEST_MISMATCH")
    if ids != expected_ids:
        failures.append("ID_SEQUENCE_INVALID")
    if records != extract:
        failures.append("EXTRACT_PAYLOAD_MISMATCH")
    if archive_sha == member_sha:
        failures.append("CONTAINER_MEMBER_COLLAPSED")

    payload = {
        "passed": not failures,
        "failures": failures,
        "temp_files": False,
        "extractall": False,
        "archive": str(ARCHIVE),
        "member": MEMBER,
        "archive_sha256": archive_sha,
        "member_sha256": member_sha,
        "count": len(records),
        "first_id": ids[0] if ids else None,
        "last_id": ids[-1] if ids else None,
        "payload_equal_to_extract": records == extract,
    }
    RESULT.parent.mkdir(parents=True, exist_ok=True)
    RESULT.write_text(json.dumps(payload, indent=2) + "\n")
    print(json.dumps(payload, indent=2))
    return 0 if payload["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
