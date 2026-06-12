export const STATIC_ORIGIN =
  import.meta.env.VITE_API_STATIC_URL || 'https://project1-backend.truongbvn.online';

export const toAssetUrl = (u?: string) =>
  !u ? '' : (u.startsWith('http') ? u : `${STATIC_ORIGIN}${u}`);
