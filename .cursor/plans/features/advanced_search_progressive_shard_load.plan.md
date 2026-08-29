# Advanced Search — progressive shard loading (future)

Status: **planned only** (not implemented). Do **not** lazy-open Lucivy on first search (#3 is explicitly out of scope).

## Problem

Even with `.advanced-search/luce/` directory layout and Tauri in-place open, a large single-shard index can still spike CPU/RAM when `ShardedHandle::open` maps segment files. Splitting vault storage alone does not fix this unless **runtime** also loads shards incrementally.

## Goal

Allow search to become available in stages:

1. Open shard 0 → partial search OK (with “index warming” UI).
2. Load shard 1…N sequentially with yields between shards.
3. Full index ready → merge results across shards (or single query when all open).

## Prerequisites (done / in progress)

- Vault persist as on-disk shard dir: `.advanced-search/luce/` (`_shard_config.json`, `shard_0/`, …).
- Tauri local: in-place open on vault path (no gzip import copy).

## Proposed architecture

### Build time

- Increase Lucivy `SchemaConfig.shards` (e.g. 4–8) based on doc count / vault size.
- `export_to_snapshot` / directory persist already supports multi-shard LUCE v2 layout.

### Load time (Tauri)

- New `as_index_open_from_directory_progressive(dir, opts)`:
  - `ShardedHandle::open` only shard 0 first (needs lucivy-core API or partial open wrapper).
  - Background task: for each remaining shard dir, attach + yield (Tauri event `as-index-shard-ready`).
- Engine flag: `lucivyReadyPartial` vs `lucivyReadyFull`.
- `searchContentPageFromIndex` / `runAdvancedSearch`: fan-out to open shards; merge hit lists by score until all shards loaded.

### Load time (WASM / S3)

- Sync vault `luce/shard_*` files to OPFS in batches (yield between files).
- Open shards incrementally via lucivy-wasm (depends on upstream partial-open support).

## UX

- Activity / Settings: “색인 불러오는 중 (shard 2/4)” — not blocking editor.
- Search results banner when `!lucivyReadyFull`: “일부 색인만 검색됨”.
- No change to unlock-time warm policy (still warm after unlock; progressive load reduces per-frame spike).

## Non-goals

- Lazy Lucivy (open only when user searches).
- Federated multi-index (separate indexes per folder) — use Lucivy native shards instead.

## Open questions

1. Does lucivy-core 2.x expose partial `ShardedHandle` open without all shard dirs present?
2. Merge policy for partial results (re-rank when later shards attach?).
3. Incremental queue: pause upserts until `lucivyReadyFull` or allow shard-local writes?

## Files (expected touch)

| Area | Path |
|------|------|
| Tauri session | `src-tauri/src/as_index/session.rs` |
| Commands / events | `src-tauri/src/as_index/commands.rs` |
| Engine warm / status | `src/utils/advancedSearch/engine.ts` |
| Search merge | `src/utils/advancedSearch/query.ts`, `contentSearchPage.ts` |
| UI | Settings / activity indicator components |

## Test plan

- Large vault (~10k docs): unlock → warm; measure max frame time during shard load.
- Search during shard 2/4 load: hits from shard 0 only + banner.
- After full load: same results as monolithic baseline.
- Rebuild + persist multi-shard dir; restart → progressive load from vault dir.
