/**
 * Limiteur de débit anti-spam, avec une interface volontairement neutre
 * vis-à-vis du stockage.
 *
 * L'implémentation par défaut est en mémoire de processus : suffisante
 * pour dissuader un envoi automatisé répété sans infrastructure dédiée,
 * mais avec une limite connue sur un déploiement serverless
 * multi-instance (chaque instance a son propre compteur, la protection
 * n'est donc pas strictement globale).
 *
 * Pour passer à un store partagé (ex. Upstash Redis) le jour où le volume
 * de spam le justifie, il suffit d'implémenter RateLimiter (une méthode
 * `check`) et de remplacer `defaultRateLimiter` ci-dessous — aucun appelant
 * (lib/actions/*) n'a besoin de changer.
 */
export type RateLimitResult = { allowed: boolean; retryAfterMs?: number };

export interface RateLimiter {
  check(key: string, limit: number, windowMs: number): RateLimitResult;
}

class InMemoryRateLimiter implements RateLimiter {
  private buckets = new Map<string, { count: number; resetAt: number }>();

  check(key: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const bucket = this.buckets.get(key);

    if (!bucket || now > bucket.resetAt) {
      this.buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true };
    }

    if (bucket.count >= limit) {
      return { allowed: false, retryAfterMs: bucket.resetAt - now };
    }

    bucket.count += 1;
    return { allowed: true };
  }
}

const defaultRateLimiter: RateLimiter = new InMemoryRateLimiter();

export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): RateLimitResult {
  return defaultRateLimiter.check(key, limit, windowMs);
}
