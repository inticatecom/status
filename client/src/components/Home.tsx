"use client";
// Definitions
import type {ServerResponse} from "@/app/api/server/route";
import type {EndpointResponse} from "@/app/api/endpoints/route";
import type {CalloutProps} from "@/lib/definitions";

// Components
import {Callout} from "@/components/View";
import {Status, StatusCategory, StatusEntry} from "@/components/Status";

/**
 * The client-side version of the home page doing the behind the scene actions like
 * making the requests to the backend server.
 */
export default function Home({endpoints, server, status}: { endpoints: EndpointResponse, server: ServerResponse, status: CalloutProps["type"] }) {
    // Variables
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const dateStr = startYear !== currentYear ? `${startYear} - ${currentYear}` : String(startYear);

    return (
        <>
            <Callout className={"w-full mb-3"} type={status}>
                <div className={"flex justify-between items-center mb-1"}>
                    <p className={"font-semibold"}>{status === "success" ? "All Systems Operational" : status === "warning" ? "Partial System Outage" : "All Systems Offline"}</p>
                    <p className={"text-end"}>Updated a few moments ago</p>
                </div>
                <p className={"text-sm text-pretty"}>Some services are currently unavailable. Please read the categories
                    below to
                    identify which services have been affected.</p>
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
                    <p>Copyright &copy; {dateStr} | {server.region}</p>
                    <p>Powered by Inticate</p>
                </div>
            </Status>
        </>
    );
}