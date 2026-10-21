# J - Join the right creation route

Choose one primary launch route before using a tutorial. On pump.fun, creation and market behavior are tied to platform instructions and settings. On a self-managed route, mint creation, token metadata, distribution, and opening a liquidity pool are separate tasks. A random SPL mint is not automatically a pump.fun coin.

Do not mix a platform's supply, decimals, fee recipients, or migration behavior with a custom-mint example. For the platform route, read the current creation documentation and inspect the final program state. For the custom route, define supply and authority policies yourself and verify the resulting accounts.

**Deliverable:** one selected route in a public plan. Use [the self-managed plan](../templates/plan.self-managed.example.json) or [the platform plan](../templates/plan.pumpfun.example.json). The platform sample intentionally leaves self-managed supply and decimals unset.

Sources: [Pump creation interface](https://github.com/pump-fun/pump-public-docs/blob/main/docs/instructions/COIN_CREATION.md), [Solana mint model](https://solana.com/docs/tokens/basics/create-mint).

---

[Handbook index](../README.md) · [Previous: I](i-identity-rights.md) · [Next: K](k-keys.md)
