# M - Mint a rehearsal token on devnet

See [disposable devnet setup](devnet-setup.md) for the signer, faucet, and separate Metaplex wizard path. Replace every angle-bracket placeholder before running a command.

This exercise creates a **bare original-program SPL token on devnet**, not a pump.fun coin and not a mainnet launch. Install a supported Solana/Agave and SPL Token CLI through official instructions. Use an already configured disposable devnet signer, fund it with devnet SOL, and inspect local help. No wallet is created or funded by this repository.

```sh
solana --version
spl-token --version
spl-token create-token --help
spl-token --url devnet create-token --decimals 6
spl-token --url devnet create-account <MINT_FROM_PREVIOUS_COMMAND>
spl-token --url devnet mint <MINT_FROM_PREVIOUS_COMMAND> 1000000
spl-token --url devnet supply <MINT_FROM_PREVIOUS_COMMAND>
spl-token --url devnet display <MINT_FROM_PREVIOUS_COMMAND>
```

Save the mint and signatures. Confirm one million display tokens and six decimals. This isolated exercise uses a different amount from the larger planning template. Do not rerun minting while diagnosing a display delay without checking whether the previous transaction succeeded.

A bare mint has no project image/name metadata. To create a fresh devnet mint with metadata instead, follow [the Metaplex creation tutorial](https://www.metaplex.com/docs/tokens/create-a-token) using explicit devnet configuration. To attach metadata to an existing mint, select the appropriate existing-mint workflow rather than blindly creating another mint. The commands here were documentation-checked, not executed against a wallet.

Source: [official CLI reference](https://solana.com/docs/references/spl-token-cli).

---

[Handbook index](../README.md) · [Previous: L](l-pumpfun.md) · [Next: N](n-rehearse.md)
