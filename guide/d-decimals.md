# D - Decimals and exact units

Token amounts have display units and integer base units. With six decimals, 1.25 displayed tokens represents 1,250,000 base units. Changing the number of decimals does not create economic value. Read each tool's amount convention: SPL CLI amounts are displayed token amounts, while SDK arguments often use base units.

Use decimal strings and BigInt for conversions. JavaScript Number can lose precision before a large integer reaches an SDK. The checker verifies a self-managed supply against the SPL u64 base-unit range and its supported 0-9 decimal range. That is a planning check, not a live mint read.

**Exercise:** the sample self-managed plan has 1,000,000,000 display tokens at six decimals, or 1,000,000,000,000,000 base units. Run [the checker](../tools/preflight.mjs) and compare the exact string. The allocation percentages in the sample are illustrative, not a recommended token distribution.

Sources: [mint state](https://solana.com/docs/tokens/basics/create-mint), [CLI amount convention](https://solana.com/docs/references/spl-token-cli).

---

[Handbook index](../README.md) · [Previous: C](c-chain-program.md) · [Next: E](e-authority-design.md)
