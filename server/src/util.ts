/**
 * Converts an object to an array and then filters it based on the provided
 * filter function.
 * @param object The object.
 * @param filter The filter function.
 * @returns The filtered array of values from the object.
 */
export function filterObject<T extends Record<string, unknown>>(
  object: T,
  filter: (value: keyof T, index: number) => boolean
): Partial<T> {
  return Object.keys(object)
    .filter(filter)
    .reduce((value, index) => {
      (value as Record<string, unknown>)[index] = object[index];
      return value;
    }, {} as Partial<T>);
}
