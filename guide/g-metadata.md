# G - Give the token accurate metadata

Prepare the name, symbol, description, image, and canonical links. Use original or properly licensed artwork. Check spelling in a wallet-sized preview and make the description match current functionality. Name/symbol limits differ by route; do not apply a generic limit to every launch platform.

The mint address, not the ticker or image, identifies the asset. Metadata can live in a Metaplex metadata account or in an appropriate Token-2022 configuration. The off-chain JSON and image are separate resources. Validate both before signing a creation/update transaction.

**Deliverable:** [metadata JSON example](../templates/token-metadata.example.json) with real reviewed URIs substituted locally. For a platform upload flow, inspect the returned URI and created mint afterward; do not assume a local file was published successfully.

Sources: [Metaplex metadata model](https://solana.com/docs/tokens/metaplex), [Token-2022 metadata](https://solana.com/docs/tokens/extensions/metadata).

---

[Handbook index](../README.md) · [Previous: F](f-funding-wallets.md) · [Next: H](h-hosting.md)
