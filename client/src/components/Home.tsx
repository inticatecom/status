"use client";
// Resources
import ky from "ky";

// Definitions
import type {ServerResponse} from "@/app/api/server/route";
import type {EndpointResponse} from "@/app/api/endpoints/route";

// Hooks
import {useQuery} from "@tanstack/react-query";

// Components
import {Callout} from "@/components/View";
import {Status, StatusCategory, StatusEntry} from "@/components/Status";

/**
 * The client-side version of the home page doing the behind the scene actions like
 * making the requests to the backend server.
 */
export default function Home() {
    // Hooks
    const {data: server, isLoading: serverLoading} = useQuery({
        queryKey: ["server"],
        queryFn: async () => {
            return await (await ky.get<ServerResponse>("/api/server")).json()
        }
    })
    const {data: endpoints} = useQuery({
        queryKey: ["endpoints"],
        queryFn: async () => {
            return (await ky.get<EndpointResponse>("/api/endpoints")).json()
        }
    })

    // Variables
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const dateStr = startYear !== currentYear ? `${startYear} - ${currentYear}` : String(startYear);

    return (
        <>
            <Callout className={"flex justify-between items-center w-full mb-3"}>
                <p className={"font-semibold"}>All Systems Operational</p>
                <p>Updated a few moments ago</p>
            </Callout>
            <Status>
                <StatusCategory title={"Services"} position={"top"}>
                    {
                        endpoints &&
                        Object.keys(endpoints).map((endpointUrl, index) => (
                            <StatusEntry key={index} data={endpoints[endpointUrl]}>
                                {endpointUrl}
                            </StatusEntry>
                        ))
                    }
                </StatusCategory>
                <StatusCategory title={"Services"} position={"bottom"}>
                    {/*<StatusEntry website={"https://lucastranks.com"}>Website</StatusEntry>*/}
                    {/*<StatusEntry website={"https://lucastranks.com"}>Backend API</StatusEntry>*/}
                </StatusCategory>
                <div className={"w-full flex justify-between items-center text-white/70 mt-5"}>
                    <p>Copyright &copy; {dateStr} | {!serverLoading && server ? server.region : "N/A"}</p>
                    <p>Powered by Inticate</p>
                </div>
            </Status>
        </>
    );
}