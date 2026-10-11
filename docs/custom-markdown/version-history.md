# Version history (notes + chat edits)

노트 저장본과 채팅 메시지 **수정 이력**을 S3 Object Versioning(가능 시) 또는 vault 앱 스냅샷으로 관리한다.

## 정책

1. **S3 native** — 버킷 Object Versioning = `Enabled` 이고 IAM이 허용하면 `ListObjectVersions` / `GetObject(VersionId)` / `DeleteObject(VersionId)`.
2. **App-managed** — 그 외(버저닝 없음·권한 부족·local/WebDAV/IDB)는 vault에 스냅샷을 쌓는다.
3. **복원** — 목록에서 바로 덮어쓰지 않는다. `VersionRestoreDiffModal`로 현재 vs 선택 버전 diff 확인 후 복원.
4. **파일 영구 삭제** — `DeleteConfirmModal`의 `이전 버전도 함께 삭제`(기본 켜짐). 휴지통 **이동**만 할 때는 버전을 지우지 않는다.

## IAM (S3 native)

| Action | 용도 |
|--------|------|
| `s3:GetBucketVersioning` | Enabled 여부 probe |
| `s3:ListBucketVersions` | 버전 목록 |
| `s3:GetObjectVersion` | 과거 본문 읽기 |
| `s3:DeleteObjectVersion` | 특정 VersionId 영구 삭제 |
| (기존) `s3:GetObject` / `PutObject` / `DeleteObject` | 현재 객체 |

## 키 규약

### 노트 (app)

```text
.versions/<pathHash>/<entryId>/meta.json
.versions/<pathHash>/<entryId>/body.md
```

- 파일당 기본 최대 20개(설정 `docuhaim-version-history-note-max`).
- `.versions/` 는 Advanced Search 인덱스·트리에서 제외.

### 채팅 수정

| 모드 | 키 |
|------|-----|
| native | `.chat-with-myself/edits/<messageId>/current.md` (overwrite → S3 버전에 축적) |
| app | `.chat-with-myself/edits/<messageId>/<ISO>.md` (기존과 동일) |

본문 포맷은 `<!-- chat-edit-version … -->` ([chat-day-file-comments](./chat-day-file-comments.md) / `editHistory.ts`).

## UI

- 노트: 에디터 **파일 관리 → 버전 관리**, 사이드바 컨텍스트 **버전 기록**, Advanced Search `editor-version-history`
- 미리보기 / 복원: `VersionRestoreDiffModal` Split diff (현재 vs 선택 버전)
- 채팅: 기존 수정 기록 모달 + 다중 선택 삭제 + diff 복원
- Settings / AS toggle: `settings-version-history` (앱 스냅샷 master; native는 버킷 설정)

## Implementation

- `src/utils/versionHistory/`
- `src/utils/vault/s3Client.js` — `listObjectVersions`, `getBucketVersioningStatus`, VersionId get/delete
- Modals: `NoteVersionHistoryModal`, `VersionRestoreDiffModal`, `NoteVersionHistoryHost`
