# Source and recheck register

Checked 2026-10-21. These are primary references, not copied or vendored software. Recheck live instructions and fees before any production action. No permanent fee table or fixed platform supply is asserted here.

| Area | Primary source | Why / recheck trigger |
| --- | --- | --- |
| SPL mint state | [Solana create mint](https://solana.com/docs/tokens/basics/create-mint) | Program, supply, decimals; before choosing the route |
| Authority state | [Solana set authority](https://solana.com/docs/tokens/basics/set-authority) | Distinct roles and irreversible revocation; before authority changes |
| CLI examples | [SPL CLI reference](https://solana.com/docs/references/spl-token-cli) | Version-specific options and UI amount units; compare installed help |
| Network costs | [Solana fees](https://solana.com/docs/core/fees) | Fee components; do not equate creation price with total cost |
| Metadata | [Solana Metaplex metadata](https://solana.com/docs/tokens/metaplex) | Metadata account model |
| Token-2022 metadata | [Metadata extensions](https://solana.com/docs/tokens/extensions/metadata) | Extension initialization and authority semantics |
| Fresh fungible token | [Metaplex tutorial](https://www.metaplex.com/docs/tokens/create-a-token) | Current SDK/CLI workflow; use an explicit devnet setup |
| Metaplex RPC setup | [CLI RPC configuration](https://www.metaplex.com/docs/dev-tools/cli/config/rpcs) | Independent CLI network configuration |
| Pump interfaces | [Official program docs](https://github.com/pump-fun/pump-public-docs) | Current IDs, SDK pointers, breaking changes |
| Pump creation | [COIN_CREATION](https://github.com/pump-fun/pump-public-docs/blob/main/docs/instructions/COIN_CREATION.md) | create_v2, creator, quote, and optional settings |
| Pump fees | [Current fee schedule](https://pump.fun/docs/fees) | Platform terms may change; contracts determine charged fees |
| Fee sharing | [CREATOR_FEE_SHARING](https://github.com/pump-fun/pump-public-docs/blob/main/docs/instructions/CREATOR_FEE_SHARING.md) | Beneficiary setup and mutability; never infer from a third-party dashboard |
| Fee collection | [COLLECT_CREATOR_FEE](https://github.com/pump-fun/pump-public-docs/blob/main/docs/instructions/COLLECT_CREATOR_FEE.md) | Claims and receipts |
| PumpSwap | [Program reference](https://github.com/pump-fun/pump-public-docs/blob/main/docs/PUMP_SWAP_README.md) | Canonical market route; separate from custom pools |
| Self-managed CPMM | [Raydium creation flow](https://github.com/raydium-io/raydium-docs-v1/blob/main/user-flows/create-cpmm-pool.mdx) | Pool choices, initial inventory, and post-creation verification |

Older Pump help articles and the newer fee schedule describe costs differently. The handbook deliberately does not combine them into a universal SOL amount. Interface limits also differ between Metaplex and Pump; confirm the selected route rather than copying a generic ticker limit.

Source links are not endorsements of every dependent product. Legal/tax classification, licensing questions, custody arrangements, and economic suitability are outside this technical source check.
