<p align="center">
  <img src="https://testparity.com/brand/testparity-readme-banner.jpg" alt="TestParity" width="100%">
</p>

# Vitest Sample

[![Parity Sample](https://github.com/testparity/vitest-sample/actions/workflows/parity.yml/badge.svg)](https://github.com/testparity/vitest-sample/actions/workflows/parity.yml)

This repository is an end-to-end Parity demo for Vitest. CI runs the real suite, then `parity test` runs each belonging test file in isolation and builds fresh per-test coverage evidence.

## What this sample proves

No coverage result is committed. Vitest emits one Clover report per isolated test file, and Parity normalizes those reports into `.parity/per-test` before checking them.

| Source file | Matching test | All-test file coverage | Matching-test coverage | Other covering tests | Why it matters |
| --- | --- | ---: | ---: | ---: | --- |
| `code/src/formatCurrency.ts` | `code/tests/formatCurrency.test.ts` | 100% | 50% | 1 | Global coverage hides that half of the executable lines are exercised by another test file. |
| `code/src/discount.ts` | `code/tests/discount.test.ts` | 100% | 100% | 0 | The matching test owns this file's coverage. |
| Project total | - | 100% | - | - | Perfect global coverage still does not prove the belonging test owns its source file. |

Parity enforces these thresholds in `parity.yaml`:

- `min_coverage_global: 80` keeps the aggregate project gate.
- `minimum-coverage: 70` keeps every source file above the ordinary coverage floor.
- `matched-coverage: 40` requires the belonging test to cover a meaningful portion itself.
- `coverage-attribution` reports `2|1` for `formatCurrency.ts`: two covering tests, one of them non-matching.

## Run locally

Install the locked sample dependencies and the public Parity package:

```bash
cd code
npm ci
cd ..
composer global require "testparity/parity:^1.2"
```

Run the native suite, then generate and check fresh per-test evidence:

```bash
cd code && npm test && cd ..
parity test --config=parity.yaml --format=json --show-tests
```

Expected highlights from the JSON output:

- `formatCurrency.ts`: `minimum-coverage = 100%`, `matched-coverage = 50%`, `coverage-attribution = 2|1`.
- `discount.ts`: `minimum-coverage = 100%`, `matched-coverage = 100%`, `coverage-attribution = 1|0`.
- `global_coverage = 100` and `passed = true`.

## CI

GitHub Actions runs the full Vitest suite, rejects the old fixture path, clears generated evidence, and then runs:

```bash
parity test --config=parity.yaml --format=json --show-tests
```

The workflow uploads `.parity/per-test` and `parity-result.json` so every green run has inspectable proof. No private token is required.
