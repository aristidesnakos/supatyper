/**
 * Removes punctuation and converts text to lowercase for comparison
 */
export function normalizeWord(word: string): string {
  return word.replace(/[^\w\s]/g, '').toLowerCase();
}

/**
 * Compares two words ignoring punctuation and case
 */
export function compareWords(original: string, typed: string): boolean {
  return normalizeWord(original) === normalizeWord(typed);
}

/**
 * Splits text into words
 */
export function splitIntoWords(text: string): string[] {
  return text.split(/\s+/).filter(word => word.length > 0);
}

/**
 * Formats time in seconds to MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
