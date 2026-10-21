# E - Explain every authority

Treat each authority as a separate permission. Mint authority can issue additional tokens. Freeze authority can freeze token accounts. Token-account owners control their accounts; a delegate can have a bounded spending allowance. Metadata has its own update controls. Token-2022 can add further authorities.

Make a public matrix: role, current public address, planned final address/state, reason retained, rotation process, and transaction evidence. A statement such as “ownership renounced” is too vague to describe these distinct powers. A multisig reduces reliance on one signer but does not remove the power it controls.

**Deliverable:** [authority matrix](../templates/authority-matrix.md). Explain a retained authority plainly. Do not claim fixed supply while silently retaining an ordinary mint authority. Revoking an authority can be permanent; rehearse the exact intended state before changing it.

Source: [Solana authority semantics](https://solana.com/docs/tokens/basics/set-authority).

---

[Handbook index](../README.md) · [Previous: D](d-decimals.md) · [Next: F](f-funding-wallets.md)
