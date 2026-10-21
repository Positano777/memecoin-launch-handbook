# Validation

- Original handbook text and templates, with official technical source links checked 2026-10-21.
- Eighteen unit and CLI tests cover exact BigInt units, precision/range, allocations, route separation, review flags, authority-policy consistency, and credential-field/URL suppression.
- Local documentation checks verify all 26 chapter files, relative links, JSON parsing, and sample-plan behavior.
- Devnet CLI commands were compared with official documentation but not run against a wallet. No token, pool, fee configuration, or on-chain authority was created or modified.
- The checker is a limited offline planning aid. Its boolean review flags are self-reported; they do not prove a review happened. Live fees, metadata availability, signing behavior, and platform compatibility remain outside runtime validation.
- Redacted current-source and history scans are performed before publication; reviewed results are summarized in the release notes. Scanning is not proof that every possible secret encoding is absent.
