"use client";
// Hooks
import {useEffect} from "react";

// Components
import {Callout} from "@/components/View";
import {Status, StatusCategory, StatusEntry} from "@/components/Status";

/**
 * The client-side version of the home page doing the behind the scene actions like
 * making the requests to the backend server.
 */
export default function Home() {
    // Variables
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const dateStr = startYear !== currentYear ? `${startYear} - ${currentYear}` : String(startYear);

    /**
     * Make initial API request to fetch all endpoint's and their status's.
     */
    useEffect(() => {
        console.log("hello there!");
    }, [])

    return <>
        <Callout className={"flex justify-between items-center w-full mb-3"}>
            <p className={"font-semibold"}>All Systems Operational</p>
            <p>Updated a few moments ago</p>
        </Callout>
        <Status>
            <StatusCategory title={"Services"} position={"top"}>
                <StatusEntry website={"https://lucastranks.com"}>Website</StatusEntry>
                <StatusEntry website={"https://lucastranks.com"}>Backend API</StatusEntry>
            </StatusCategory>
            <StatusCategory title={"Services"} position={"bottom"}>
                <StatusEntry website={"https://lucastranks.com"}>Website</StatusEntry>
                <StatusEntry website={"https://lucastranks.com"}>Backend API</StatusEntry>
            </StatusCategory>
            <div className={"w-full flex justify-between items-center text-white/70 mt-5"}>
                <p>Copyright &copy; {dateStr}</p>
                <p>Powered by Inticate</p>
            </div>
        </Status>
    </>
}