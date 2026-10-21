# H - Host durable public assets

Choose how the metadata JSON, image, documentation, and project website will be maintained. Test URLs from an independent browser with no login. Check content type, file size, spelling, image rendering, and whether the JSON references the expected image.

An immutable pointer does not automatically make an ordinary web server permanent. An IPFS reference needs availability; an ordinary HTTPS domain needs renewal and hosting. Record who can update each resource and what migration would require. Keep source artwork and the exact published JSON under version control, without credentials.

Treat token metadata as untrusted input when building tooling. A read-only checker should not automatically fetch arbitrary private-network URLs or execute returned content. The supplied plan checker parses URI structure but makes no network request and cannot establish that content exists.

**Deliverable:** an asset manifest with URI, content hash, publisher, and independent retrieval date. See [launch receipts](../templates/launch-receipt.md).

---

[Handbook index](../README.md) · [Previous: G](g-metadata.md) · [Next: I](i-identity-rights.md)
