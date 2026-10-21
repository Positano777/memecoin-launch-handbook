# O - Observe final authority state

After the intended supply and metadata are correct, compare the actual authority state with the policy matrix. Revoking mint authority is different from revoking freeze authority, changing metadata control, revoking an account delegate, or changing liquidity ownership.

For a self-managed devnet rehearsal, you can inspect the authority command and, after minting is complete, practice removing mint authority:

```sh
spl-token authorize --help
spl-token --url devnet authorize <REHEARSAL_MINT> mint --disable
spl-token --url devnet display <REHEARSAL_MINT>
```

This revocation is an irreversible action for the selected role when no restoring mechanism exists. Do not copy it to mainnet before resolving supply, roles, and recovery consequences. For a platform mint, inspect what the program actually configured rather than assuming you can change the same roles.

**Deliverable:** final public role/state entries and transaction signatures. A “renounced” image is not evidence. Sources: [Set Authority](https://solana.com/docs/tokens/basics/set-authority), [CLI authority commands](https://solana.com/docs/references/spl-token-cli).

---

[Handbook index](../README.md) · [Previous: N](n-rehearse.md) · [Next: P](p-pools.md)
