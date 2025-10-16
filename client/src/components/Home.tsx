"use client";
// Resources
import moment from "moment";

// Definitions
import type { ServerResponse } from "@/app/api/server/route";
import type { EndpointResponse } from "@/app/api/endpoints/route";
import type { CalloutProps } from "@/lib/definitions";

// Hooks
import { useCallback, useState } from "react";

// Components
import { Callout } from "@/components/View";
import { Status, StatusCategory, StatusEntry } from "@/components/Status";
import Link from "next/link";

// Icons
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

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
  // States
  const [expanded, setExpanded] = useState<boolean>(false);

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

  /**
   * Handle expanding and minimizing the notice.
   */
  const handleExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);

  return (
    <>
      <button onClick={handleExpand} className="w-full mb-3 cursor-pointer">
        <Callout
          className={"w-full flex flex-col justify-center gap-1"}
          type={status}>
          <div className="flex justify-between items-center">
            <p className={"text-start font-semibold"}>{statusText.title}</p>
            <div className="flex justify-center items-center gap-1">
              <p className={"text-end"}>
                Updated {moment(new Date(server.latestPing)).fromNow()}
              </p>
              {!expanded ? (
                <IoMdArrowDropdown className="text-lg" />
              ) : (
                <IoMdArrowDropup className="text-lg" />
              )}
            </div>
          </div>
          {expanded && (
            <p className={"text-sm text-start"}>{statusText.summary}</p>
          )}
        </Callout>
      </button>
      <Status>
        {endpoints &&
          Object.entries(endpoints).map(
            ([categoryName, categoryEndpoints], categoryIndex) => (
              <StatusCategory
                key={categoryIndex}
                title={categoryName}
                position={
                  Object.entries(endpoints).length !== 1
                    ? categoryIndex === 0
                      ? "top"
                      : categoryIndex === Object.keys(endpoints).length - 1
                      ? "bottom"
                      : "center"
                    : "both"
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
          <Link href="https://github.com/inticatecom/status" target="_blank">
            Powered by Inticate
          </Link>
        </div>
      </Status>
    </>
  );
}
