import Dexie from 'dexie';

export const llmPromptTemplatesDb = new Dexie('s3haim-llm-prompts');

llmPromptTemplatesDb.version(1).stores({
  templates: 'id, name, updatedAt',
});

/**
 * @typedef {Object} LlmPromptTemplate
 * @property {string} id
 * @property {string} name
 * @property {string} instruction
 * @property {number} updatedAt
 */

export function createEmptyLlmPromptTemplate() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: '',
    instruction: '',
    updatedAt: Date.now(),
  };
}

/** @returns {Promise<LlmPromptTemplate[]>} */
export async function listLlmPromptTemplates() {
  return llmPromptTemplatesDb.templates.orderBy('updatedAt').reverse().toArray();
}

/** @param {LlmPromptTemplate} template */
export async function saveLlmPromptTemplate(template) {
  const record = {
    ...template,
    name: (template.name || '').trim(),
    instruction: (template.instruction || '').trim(),
    updatedAt: Date.now(),
  };
  await llmPromptTemplatesDb.templates.put(record);
  return record;
}

/** @param {string} id */
export async function deleteLlmPromptTemplate(id) {
  await llmPromptTemplatesDb.templates.delete(id);
}
