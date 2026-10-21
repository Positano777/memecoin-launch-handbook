# Q - Quality gates before a public launch

Use an evidence-based go/no-go review. Confirm the canonical mint/network, metadata, supply and allocations, actual authority state, platform settings, liquidity control, disclosure page, incident contact, and independent transaction review. Assign an owner to every unresolved item.

Run the local plan checker, read its warnings, and attach its report to the review. A structurally consistent plan can still describe a dangerous or incorrect launch; the tool has no live state and its review flags are self-reported. Do not rename its result “approved” in a screenshot.

Before any production signing, compare the transaction the wallet is actually signing with the reviewed plan. Recheck amounts, recipients, network, programs, and permissions. If the transaction differs, stop and update the review rather than assuming the earlier approval covers it.

**Deliverable:** [launch checklist](../templates/launch-checklist.md) with links to receipts and unresolved blockers.

---

[Handbook index](../README.md) · [Previous: P](p-pools.md) · [Next: R](r-receipts.md)
