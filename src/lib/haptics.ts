/**
 * Micro-tactile haptic feedback utility.
 * Triggers subtle physical vibration on mobile/touch devices supporting the Vibration API.
 * Safe for SSR and strictly non-intrusive.
 */
export function triggerHaptic(durationMs = 8): void {
  if (typeof window !== "undefined" && typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(durationMs);
    } catch {
      // Ignore if blocked by browser policy or unfocused window
    }
  }
}
