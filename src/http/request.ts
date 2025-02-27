/**
 * 合并多个 AbortSignals
 *
 * ```ts
 * cosnt maybeSignal: AbortSignal | null = null;
 * mergeAbortSignals(new AbortController, AbortSignal.timeout(5000), maybeSignal);
 * // AbortSignal.any([new AbortController, AbortSignal.timeout(5000)])
 * ```
 *
 * @param signals
 * @returns {AbortSignal | undefined}
 */
export const mergeAbortSignals = (
  ...signals: (AbortSignal | undefined | null)[]
): AbortSignal | undefined => {
  const items = signals.filter(Boolean) as AbortSignal[];
  const size = items.length;
  if (size === 1) return items[0];
  // @ts-ignore AbortSignal.any
  if (size > 1) return AbortSignal.any(signals);
};
