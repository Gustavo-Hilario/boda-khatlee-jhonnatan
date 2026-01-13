/**
 * Get the correct asset path that works with Vite's base URL configuration.
 * This handles both development (/) and production (/repo-name/) base paths.
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present, as BASE_URL already ends with /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}
