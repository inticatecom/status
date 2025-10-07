// Resources
import ky from "ky";

// Definitions
import * as Types from "./definitions.js";

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

/**
 * Fetches the local network's public IP address if possible.
 * @returns The IP address or null if the operation failed.
 */
export async function getLocalNetwork(): Promise<string | null> {
  const data = await (
    await ky.get<{ ip?: string }>(`https://api.ipify.org?format=json`)
  ).json();

  return data.ip || null;
}

export async function getRegion(
  ip: string
): Promise<Types.NetworkRegion | null> {
  const data = await (
    await ky.get<Types.NetworkRegion | object>(
      `https://api.findip.net/${ip}/?token=${process.env.FIND_IP_KEY}`
    )
  ).json();

  if ("country" in data) {
    return data;
  } else {
    return null;
  }
}
