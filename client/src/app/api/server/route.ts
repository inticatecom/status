// Resources
import ky from "ky";

// Definitions
export interface ServerResponse {
    region: string;
    latestPing: string;
}

/**
 * Fetches statistics about the backend status server.
 */
export async function GET() {
    try {
        const data = await (await ky.get<ServerResponse>("http://localhost:3001/server")).json();
        return Response.json(data);
    } catch {
        return new Response("Internal server error.", {status: 500});
    }
}