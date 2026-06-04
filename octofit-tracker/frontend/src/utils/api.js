export const CODESPACE_NAME = (import.meta.env.VITE_CODESPACE_NAME ?? '').trim();

export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const buildApiUrl = (resource) => `${API_BASE_URL}/${resource}`;

export const normalizeListResponse = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (payload.data && Array.isArray(payload.data)) return payload.data;
  if (payload.results && Array.isArray(payload.results)) return payload.results;
  if (payload.items && Array.isArray(payload.items)) return payload.items;
  if (payload.docs && Array.isArray(payload.docs)) return payload.docs;
  return [payload];
};

export const getEnvironmentNotice = () => {
  if (CODESPACE_NAME) {
    return `Using codespace host ${CODESPACE_NAME}-8000.app.github.dev/api`;
  }
  return 'VITE_CODESPACE_NAME is not defined. Falling back to local API at http://localhost:8000/api.';
};
