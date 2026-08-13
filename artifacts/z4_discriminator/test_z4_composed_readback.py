"""Z4 composed discriminator (assay-from-trace, not Brudo checkout).

Replicates only relations documented in CODEBASE_INTRFACE_34.txt:
- unique (capability_id, capability_sha256) WHERE disposition='CONSUMED'  (mig 070)
- append-only other dispositions
- StateLedger.latest() reads last appended *state*, not transition receipts
  (test_control_snapshot_is_order_independent_of_receipt_records)

Not a novelty proof. Not the live repository.
"""

from __future__ import annotations

import sqlite3
import unittest


SCHEMA = """
CREATE TABLE successor_durable_nullifier (
    nullifier_event_id INTEGER PRIMARY KEY,
    capability_id TEXT NOT NULL,
    capability_sha256 TEXT NOT NULL,
    successor_contract_sha256 TEXT NOT NULL,
    predecessor_state_sha256 TEXT NOT NULL,
    consequence_scope_sha256 TEXT NOT NULL,
    authority_epoch_sha256 TEXT NOT NULL,
    disposition TEXT NOT NULL CHECK (
        disposition IN ('CONSUMED', 'REJECTED_REPLAY', 'REJECTED_INVALID')
    )
);
CREATE UNIQUE INDEX successor_durable_nullifier_capability_idx
ON successor_durable_nullifier(capability_id, capability_sha256)
WHERE disposition = 'CONSUMED';
"""

H = "a" * 64
FIELDS = (
    "capability_sha256",
    "successor_contract_sha256",
    "predecessor_state_sha256",
    "consequence_scope_sha256",
    "authority_epoch_sha256",
)


def connect():
    db = sqlite3.connect(":memory:")
    db.execute("PRAGMA foreign_keys=ON")
    db.executescript(SCHEMA)
    return db


def claim(db, *, disposition, capability_id="cap-1", **overrides):
    row = {
        "capability_id": capability_id,
        "capability_sha256": H,
        "successor_contract_sha256": H,
        "predecessor_state_sha256": H,
        "consequence_scope_sha256": H,
        "authority_epoch_sha256": H,
        "disposition": disposition,
    }
    row.update(overrides)
    db.execute(
        """
        INSERT INTO successor_durable_nullifier (
            capability_id, capability_sha256, successor_contract_sha256,
            predecessor_state_sha256, consequence_scope_sha256,
            authority_epoch_sha256, disposition
        ) VALUES (:capability_id, :capability_sha256, :successor_contract_sha256,
                  :predecessor_state_sha256, :consequence_scope_sha256,
                  :authority_epoch_sha256, :disposition)
        """,
        row,
    )
    return row


def audit(db, capability_id="cap-1"):
    return db.execute(
        "SELECT disposition FROM successor_durable_nullifier WHERE capability_id=? ORDER BY nullifier_event_id",
        (capability_id,),
    ).fetchall()


def control_from_ledger(states):
    """Mirror StateLedger.latest(): last appended state only."""
    return states[-1] if states else None


class Z4ComposedReadback(unittest.TestCase):
    def test_wrapper_sequence_db_and_ledger_split(self):
        db = connect()
        states = [("baseline", "ADMITTED")]
        claim(db, disposition="REJECTED_INVALID", successor_contract_sha256="d" * 64)
        # Invalid is stored as nullifier row, NOT appended as ledger state
        # (matches fixture after they stopped appending audit as state).
        claim(db, disposition="CONSUMED", successor_contract_sha256="e" * 64)
        states.append(("valid-successor", "CONSUMED"))

        self.assertEqual(
            [d[0] for d in audit(db)],
            ["REJECTED_INVALID", "CONSUMED"],
        )
        self.assertEqual(control_from_ledger(states), ("valid-successor", "CONSUMED"))
        self.assertNotIn("REJECTED_INVALID", str(control_from_ledger(states)))

    def test_durable_invalid_not_required_for_control_exclusion(self):
        """C \\ {durable invalid row}: control exclusion still holds."""
        states = [("baseline", "ADMITTED"), ("valid-successor", "CONSUMED")]
        self.assertEqual(control_from_ledger(states), ("valid-successor", "CONSUMED"))

    def test_unique_on_all_dispositions_burns_capability(self):
        """C \\ {CONSUMED-only unique} = 069: later valid cannot consume."""
        db = connect()
        db.execute("DROP INDEX successor_durable_nullifier_capability_idx")
        db.execute(
            """
            CREATE UNIQUE INDEX successor_durable_nullifier_capability_idx
            ON successor_durable_nullifier(capability_id, capability_sha256)
            """
        )
        claim(db, disposition="REJECTED_INVALID")
        with self.assertRaises(sqlite3.IntegrityError):
            claim(db, disposition="CONSUMED", successor_contract_sha256="e" * 64)

    def test_later_reopen_is_ordinary_consequence_of_partial_unique(self):
        db = connect()
        claim(db, disposition="REJECTED_INVALID")
        claim(db, disposition="CONSUMED", successor_contract_sha256="e" * 64)
        with self.assertRaises(sqlite3.IntegrityError):
            claim(db, disposition="CONSUMED", successor_contract_sha256="f" * 64)

    def test_mutate_non_index_fields_does_not_create_second_consume(self):
        """Claimed five-field identity: only capability pair is unique on CONSUMED."""
        db = connect()
        claim(db, disposition="CONSUMED")
        for field in (
            "successor_contract_sha256",
            "predecessor_state_sha256",
            "consequence_scope_sha256",
            "authority_epoch_sha256",
        ):
            with self.subTest(field=field):
                with self.assertRaises(sqlite3.IntegrityError):
                    claim(db, disposition="CONSUMED", **{field: "b" * 64})

    def test_mutate_capability_sha256_escapes_consume_slot(self):
        db = connect()
        claim(db, disposition="CONSUMED")
        claim(db, disposition="CONSUMED", capability_sha256="b" * 64)

    def test_mutate_capability_id_escapes_consume_slot(self):
        db = connect()
        claim(db, disposition="CONSUMED")
        claim(db, disposition="CONSUMED", capability_id="cap-2")

    def test_control_exclusion_does_not_depend_on_invalid_receipt(self):
        """If invalid were appended as ledger state, latest() WOULD become it.

        StateLedger.latest() is last state append. Exclusion is write-policy,
        not a property of retaining the nullifier row.
        """
        leaked = [("baseline", "ADMITTED"), ("invalid-successor", "REJECTED_INVALID")]
        self.assertEqual(control_from_ledger(leaked)[1], "REJECTED_INVALID")


if __name__ == "__main__":
    unittest.main(verbosity=2)
