// Resources
import ky from "ky";

// Definitions
export type EndpointResponse = Record<string, {
    online: boolean;
    latency: boolean;
    lastPinged: string;
    region: string;
}>

/**
 * Fetch all the endpoints and their status's configured in the backend.
 */
export async function GET() {
    const data = await (await ky.get<EndpointResponse>("http://localhost:3001/endpoints")).json();
    return Response.json(data);
}