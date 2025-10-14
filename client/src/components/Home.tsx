"use client";
// Resources
import moment from "moment";

// Definitions
import type { ServerResponse } from "@/app/api/server/route";
import type { EndpointResponse } from "@/app/api/endpoints/route";
import type { CalloutProps } from "@/lib/definitions";

// Components
import { Callout } from "@/components/View";
import { Status, StatusCategory, StatusEntry } from "@/components/Status";

/**
 * The client-side version of the home page doing the behind the scene actions like
 * making the requests to the backend server.
 */
export default function Home({
  endpoints,
  server,
  status,
}: {
  endpoints: EndpointResponse;
  server: ServerResponse;
  status: CalloutProps["type"];
}) {
  // Variables
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const dateStr =
    startYear !== currentYear
      ? `${startYear} - ${currentYear}`
      : String(startYear);
  const statusText = {
    title:
      status === "success"
        ? "All Systems Operational"
        : status === "warning"
        ? "Partial System Outage"
        : "All Systems Offline",
    summary:
      status === "success"
        ? "All services are currently determined to be online and accessible. To view the most up-to-date information, try refreshing the page to see if anything has changed."
        : status === "warning"
        ? "Some services are currently unavailable. Please read the categories below to identify which services have been affected."
        : "All services are currently experiencing an outage. Please check our socials to keep up-to-date with the issues.",
  };

  return (
    <>
      <Callout className={"w-full mb-3"} type={status}>
        <div className={"flex justify-between items-center mb-1"}>
          <p className={"font-semibold"}>{statusText.title}</p>
          <p className={"text-end"}>
            Updated {moment(new Date(server.latestPing)).fromNow()}
          </p>
        </div>
        <p className={"text-sm text-pretty"}>{statusText.summary}</p>
      </Callout>
      <Status>
        {endpoints &&
          Object.entries(endpoints).map(
            ([categoryName, categoryEndpoints], categoryIndex) => (
              <StatusCategory
                key={categoryIndex}
                title={categoryName}
                position={
                  categoryIndex === 0
                    ? "top"
                    : categoryIndex === Object.keys(endpoints).length - 1
                    ? "bottom"
                    : "center"
                }>
                {Object.entries(categoryEndpoints).map(
                  ([endpointName, endpointData], endpointIndex) => (
                    <StatusEntry key={endpointIndex} data={endpointData}>
                      {endpointName}
                    </StatusEntry>
                  )
                )}
              </StatusCategory>
            )
          )}
        <div
          className={
            "w-full flex justify-between items-center text-white/70 mt-5"
          }>
          <p>
            Copyright &copy; {dateStr} | {server.region}
          </p>
          <p>Powered by Inticate</p>
        </div>
      </Status>
    </>
  );
}
