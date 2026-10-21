# F - Funding and wallet roles

Separate the roles of deployer, transaction fee payer, community treasury, and personal holdings. They need not always be separate addresses, but their responsibilities must be explicit. Publish relevant public addresses and transaction links; never publish their signing material.

Use a disposable devnet signer for the exercises. Keep any production signing material outside the repository and use a signing arrangement appropriate to the value and permissions controlled. A hardware wallet, offline workflow, or multisig changes the operational process; test recovery and signer availability before relying on it.

Document the source of initial funding and any developer purchase. Sending funds through many wallets does not make the underlying allocation transparent. Do not describe fee-payer identity as definitive proof of developer identity when a service or platform may pay.

**Deliverable:** [wallet-role register](../templates/wallet-register.md), containing public information only.

---

[Handbook index](../README.md) · [Previous: E](e-authority-design.md) · [Next: G](g-metadata.md)
