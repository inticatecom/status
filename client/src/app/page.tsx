"use server";
// Resources
import ky from "ky";

// Components
import Image from "next/image";
import Home from "@/components/Home";

// Definitions
import type { ServerResponse } from "@/app/api/server/route";
import type { EndpointResponse } from "@/app/api/endpoints/route";
import type { Metadata } from "next";
import type { ResolvingMetadata } from "next/types.js";
import type { CalloutProps } from "@/lib/definitions";

// Variables
const { NEXT_PUBLIC_CLIENT_URL } = process.env;

/**
 * The root page for the application.
 */
export default async function RootPage() {
  // Variables
  const server = await (
    await ky.get<ServerResponse>(`${NEXT_PUBLIC_CLIENT_URL}/api/server`)
  ).json();
  const endpoints = await (
    await ky.get<EndpointResponse>(`${NEXT_PUBLIC_CLIENT_URL}/api/endpoints`)
  ).json();

  return (
    <div
      className={
        "flex flex-col justify-center items-start my-20 mx-auto 2xl:max-w-2/5 lg:max-w-3/5 sm:max-w-4/5 max-w-11/12"
      }>
      <div className={"w-full flex flex-col justify-center items-center"}>
        <Image
          className={"pointer-events-none mb-10"}
          src={"/assets/images/banner.png"}
          alt={"Inticate Logo"}
          unoptimized
          width={400}
          height={100}
          priority
        />
        <Home
          server={server}
          endpoints={endpoints}
          status={getGlobalStatus(endpoints)}
        />
      </div>
    </div>
  );
}

/**
 * Set the websites title based on the current status of the services.
 */
export async function generateMetadata(
  _: object,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const templateStr = (await parent).title?.template || "";
  const endpoints = await (
    await ky.get<EndpointResponse>("http://localhost:3000/api/endpoints")
  ).json();
  const status = getGlobalStatus(endpoints);

  return {
    title: templateStr.replace(
      "%s",
      status === "success"
        ? "Systems Operational"
        : status === "warning"
        ? "Partial System Outage"
        : "System Outage"
    ),
  };
}

/**
 * Fetches the global status of all services.
 * @param endpoints The endpoints to check.
 * @returns The status type for all the endpoints.
 */
function getGlobalStatus(endpoints: EndpointResponse): CalloutProps["type"] {
  const states = Object.values(endpoints).flatMap((categoryEndpoints) =>
    Object.values(categoryEndpoints).map((endpoint) => endpoint.online)
  );

  let status: CalloutProps["type"];

  if (states.every((state) => state)) {
    status = "success";
  } else if (states.every((state) => !state)) {
    status = "error";
  } else {
    status = "warning";
  }

  return status;
}
