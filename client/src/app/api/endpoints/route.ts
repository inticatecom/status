// Resources
import ky from "ky";

// Definitions
export type EndpointResponse = Record<
  string,
  Record<
    string,
    {
      online: boolean;
      latency: boolean;
      lastPinged: string;
      region: string;
    }
  >
>;

/**
 * Fetch all the endpoints and their status's configured in the backend.
 */
export async function GET() {
  const data = await (
    await ky.get<EndpointResponse>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/endpoints`
    )
  ).json();
  return Response.json(data);
}
