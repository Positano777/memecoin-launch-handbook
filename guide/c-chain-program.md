# C - Choose chain and token program

This edition is Solana-first. A normal fungible token can use an existing token program; creating a bespoke program adds work and risk that a conventional memecoin usually does not need. Decide whether the original Token Program, Token-2022, or a launch platform owns the creation workflow.

Token-2022 extensions add capabilities and compatibility considerations. A transfer fee, hook, permanent delegate, pause feature, or non-transferability setting changes what buyers and integrations can do. Do not enable an extension because its name sounds useful. List each extension, its authority, and the wallets/pools that must support it.

**Deliverable:** a program/route decision with the required integrations checked. The plan checker intentionally supports only a simple subset; it does not validate every extension combination.

Sources: [mint accounts and program choice](https://solana.com/docs/tokens/basics/create-mint), [extension documentation](https://solana.com/docs/tokens/extensions).

---

[Handbook index](../README.md) · [Previous: B](b-budget.md) · [Next: D](d-decimals.md)
