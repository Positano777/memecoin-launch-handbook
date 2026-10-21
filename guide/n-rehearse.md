# N - Network rehearsal and evidence

Record the network, public signer, token program, tool versions, source revisions, expected state, and expected balance changes before a rehearsal. Compare the actual output with that expectation. Test metadata rendering and a small transfer as well as token creation.

For self-managed tokens, devnet is useful for operational practice, but it does not reproduce mainnet liquidity, fees, ordering, or third-party support. For a platform route, do not claim an official devnet deployment exists unless the platform documents it. Local simulation and the separate SPL exercise can test pieces without establishing platform end-to-end compatibility.

Test failure paths: insufficient funds, wrong program selected, invalid URI, duplicate submission, missing historical data, and an unavailable signer. If a transaction result is ambiguous, inspect the signature/state before retrying.

**Deliverable:** [rehearsal record](../templates/rehearsal.md), including unsuccessful cases and what remains untested. A local plan checker is not a substitute for this record.

---

[Handbook index](../README.md) · [Previous: M](m-mint-devnet.md) · [Next: O](o-ownership-final.md)
