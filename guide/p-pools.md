# P - Pools, price, and liquidity control

A self-managed token needs a separate market route if you want a DEX pool. Identify the exact token and quote mints, pool type, fee tier, initial amounts, opening settings, and supported token extensions. Verify the pool and both vault mints after creation.

The opening ratio influences the displayed price. Price multiplied by total supply can produce a large fully diluted value even when little quote liquidity is available. That value is not cash raised and does not describe what holders could realize by selling. Explain liquidity inventory separately from the operating budget.

Record who controls the pool position and what they can withdraw or change. Burning tokens, burning an LP receipt, transferring a position, and locking a position are different actions; pool designs have different ownership representations. Name the exact mechanism and evidence rather than claiming universal “locked liquidity.”

For pump.fun, inspect canonical migration behavior first; creating an unrelated pool is not the same as platform graduation.

Sources: [Raydium CPMM creation flow](https://github.com/raydium-io/raydium-docs-v1/blob/main/user-flows/create-cpmm-pool.mdx), [PumpSwap program](https://github.com/pump-fun/pump-public-docs/blob/main/docs/PUMP_SWAP_README.md).

---

[Handbook index](../README.md) · [Previous: O](o-ownership-final.md) · [Next: Q](q-quality-gates.md)
