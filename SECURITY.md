# Security

No signing material is needed by this repository. Tools read local public JSON and print a fixed-shape report. They do not contact RPCs, upload metadata, create wallets, or submit transactions. Documentation commands are for a disposable devnet exercise and were not executed using a wallet during preparation.

Never put private keys, recovery phrases, API tokens, or authenticated RPC URLs in plans, examples, issues, or screenshots. The local checker blocks some obvious credential fields/URLs but is not a comprehensive secret scanner. Review output before sharing; names and paths are user-supplied.

Run a redacted Gitleaks history check before release: `gitleaks git --redact=100 --log-opts="--all" .`. If a real credential leaks, revoke/rotate it first with its provider. Do not reproduce it in a public issue. Use a privately agreed reporting channel or GitHub private reporting if enabled.

Passing a plan check, test suite, or secret scan does not establish launch safety, code audit status, legal compliance, live authorities, or economic outcomes.
