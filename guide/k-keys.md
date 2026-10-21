# K - Keep credentials out of launch material

A public launch plan never needs a private key, recovery phrase, API credential, or authenticated RPC URL. Store secrets outside Git and do not paste them into help tickets or screenshots. Public mint addresses and transaction signatures are not private signing keys.

Review downloaded tools before supplying a signer. Check source, current license, dependency versions, destination addresses, external requests, and unsigned transaction contents. Do not infer safety from stars, a passing scanner, or the words “official SDK” in an unrelated repository.

Run a redacted history scan before publishing and after adding examples. If a real credential is exposed, revoke or rotate it with its provider before considering history cleanup. Deleting the latest file does not invalidate a key.

**Deliverable:** a secret-free public repo and an incident contact. This handbook contains no signing code; see [SECURITY.md](../SECURITY.md).

---

[Handbook index](../README.md) · [Previous: J](j-journey-route.md) · [Next: L](l-pumpfun.md)
