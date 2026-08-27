export type MlxVlmImageInput = {
  mimeType: string;
  dataBase64: string;
};

export type MlxVlmWorkerImagePayload = {
  mime_type: string;
  data_base64: string;
};

export function normalizeMlxVlmImages(
  images?: MlxVlmImageInput[] | null,
): MlxVlmImageInput[] {
  if (!Array.isArray(images)) return [];
  return images.filter(
    (img) =>
      img &&
      typeof img.mimeType === 'string' &&
      img.mimeType.trim() &&
      typeof img.dataBase64 === 'string' &&
      img.dataBase64.trim(),
  );
}

export function toMlxVlmWorkerImagePayload(
  images: MlxVlmImageInput[],
): MlxVlmWorkerImagePayload[] {
  return images.map((img) => ({
    mime_type: img.mimeType.trim(),
    data_base64: img.dataBase64.trim(),
  }));
}
