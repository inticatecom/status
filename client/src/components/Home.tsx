"use client";
// Resources
import ky from "ky";

// Definitions
import type {ServerResponse} from "@/app/api/server/route";
import type {EndpointResponse} from "@/app/api/endpoints/route";
import type {CalloutProps} from "@/lib/definitions";

// Hooks
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";

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
    const {data: endpoints, isLoading: endpointsLoading} = useQuery({
        queryKey: ["endpoints"],
        queryFn: async () => {
            return (await ky.get<EndpointResponse>("/api/endpoints")).json()
        }
    })

    // States
    const [status, setStatus] = useState<CalloutProps["type"]>("success");

    // Variables
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const dateStr = startYear !== currentYear ? `${startYear} - ${currentYear}` : String(startYear);

    /**
     * Run global filter check across all endpoint's and their status's so we can determine
     * if there is a global system outage or not.
     */
    useEffect(() => {
        if (!endpoints || endpointsLoading) return; // If endpoints are still loading, then don't run rest of logic.

        // Converts object to array of booleans containing their status's.
        const states = Object.keys(endpoints || {}).map((endpointName) => {
            return endpoints && endpoints[endpointName].online;
        });

        // Set status based on population of states array.
        if (states.every(state => state)) {
            setStatus("success");
        } else if (states.every(state => !state)) {
            setStatus("error");
        } else {
            setStatus("warning");
        }
    }, [endpoints, endpointsLoading]);

    return (
        <>
            <Callout className={"flex justify-between items-center w-full mb-3"} type={status}>
                <p className={"font-semibold"}>{status === "success" ? "All Systems Operational" : status === "warning" ? "Partial System Outage" : "All Systems Offline"}</p>
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