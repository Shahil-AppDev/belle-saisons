/**
 * Limiteur de débit très simple, en mémoire de processus.
 *
 * Suffisant pour dissuader un envoi automatisé répété sans infrastructure
 * dédiée (Redis, etc.). Limite connue : sur un déploiement serverless
 * multi-instance, chaque instance a son propre compteur — la protection
 * n'est donc pas strictement globale. À renforcer avec un store partagé
 * (Upstash/Redis) si le volume de spam le justifie un jour.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { allowed: true };
}
