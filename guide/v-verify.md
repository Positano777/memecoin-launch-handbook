# V - Verify rather than certify

Check the public state with more than one independent view where practical: mint identity, supply, decimals, authorities, metadata, creator settings, pool addresses, and treasury receipts. Keep the evidence and the time of observation.

An explorer listing or a green dashboard score is not an audit. A source-to-bytecode match says something about provenance, not every runtime behavior. A simulation can help explain a transaction, but execution conditions can differ. Describe each check by what it establishes and what it leaves unknown.

When program interface files change, compare pinned versions and test the changed decoders/builders. [IDL Drift Watch](https://github.com/Positano777/idl-drift-watch) can identify structural differences; it does not verify deployed code. Use the [tool catalog](https://github.com/Positano777/awesome-pumpfun-open-source) to find foundations with their license and review limits.

**Deliverable:** a dated verification log with explicit incomplete checks.

---

[Handbook index](../README.md) · [Previous: U](u-users.md) · [Next: W](w-watch.md)
