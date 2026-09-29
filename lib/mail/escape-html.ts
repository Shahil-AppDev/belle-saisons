/**
 * Échappe les caractères HTML spéciaux avant interpolation dans un email
 * HTML. Les champs de formulaire (message libre, nom, ville...) sont du
 * texte utilisateur non fiable : sans cet échappement, une entrée comme
 * `<img src=x onerror=...>` s'exécuterait dans le client mail de l'équipe.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
