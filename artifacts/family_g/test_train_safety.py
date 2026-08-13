"""Firewall: hot-dry and other blocked modules must not ship public steps."""
from pathlib import Path
import re, sys
src = Path("/workspace/src/lib/train/modules.ts").read_text()
# crude but local: the hot-dry object must contain publicSteps: [] and hypothesis_only
hot = src.split('id: "hot-dry"', 1)[1].split('id: "bruing"', 1)[0]
ok = True
for need in ['render: "hypothesis_only"', "publicSteps: []", "no_public_steps"]:
    if need not in hot:
        print("FAIL missing", need)
        ok = False
if "Sit still indoors" in hot or "Three to five minutes" in hot:
    print("FAIL public analogue steps still present")
    ok = False
print("PASS" if ok else "FAIL")
sys.exit(0 if ok else 1)
