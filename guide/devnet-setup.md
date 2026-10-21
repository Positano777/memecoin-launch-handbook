# Disposable devnet setup

These commands are for a reader who has installed a supported Solana CLI using the [official setup guide](https://solana.com/docs/intro/installation/solana-cli-basics). Check OS support there; do not run an unreviewed installer copied from a social post. This repository does not execute these commands.

Choose a private file path **outside every Git repository**, replace the placeholder, and keep the output/recovery material private:

```sh
solana-keygen new --outfile <PRIVATE_DEVNET_KEYPAIR_PATH>
solana config set --keypair <PRIVATE_DEVNET_KEYPAIR_PATH> --url devnet
solana config get
solana address
solana --url devnet airdrop 1
solana --url devnet balance
```

The configuration command changes the reader's active CLI settings. Check them before every session. The signer is disposable test infrastructure, not a treasury wallet. Devnet airdrops can be rate-limited; use the [official faucet](https://faucet.solana.com/) rather than sending real funds to a stranger promising test SOL.

Continue with [the bare SPL exercise](m-mint-devnet.md), or choose the separate fresh-mint metadata route below. Do not accidentally create two different mints and present them as one asset.

## Fresh token with metadata through Metaplex CLI

After following [official installation and wallet setup](https://www.metaplex.com/docs/dev-tools/cli/config/wallets), explicitly configure the Metaplex CLI's own wallet and network. Its configuration is separate from the Solana CLI:

```sh
mplx config wallets add rehearsal <PRIVATE_DEVNET_KEYPAIR_PATH>
mplx config wallets set rehearsal
mplx config rpcs add devnet https://api.devnet.solana.com
mplx config rpcs set devnet
mplx config rpcs list
mplx toolbox token create --help
mplx toolbox token create --wizard
```

Inspect the active devnet RPC and public signer before opening the wizard. Review the name, symbol, decimals, amount convention, metadata upload, and transaction instructions for your installed version. The [current creation reference](https://www.metaplex.com/docs/dev-tools/cli/toolbox/token-create) documents that its mint-amount flag uses smallest units, unlike the SPL CLI display-unit examples. Follow its exact current prompts rather than treating the two amount conventions as interchangeable.

Record the resulting mint and signatures, verify metadata retrieval, then follow [rehearsal](n-rehearse.md) and [authority review](o-ownership-final.md). These command sequences were documentation-checked, not wallet-executed.

[Handbook index](../README.md)
