// Resources
import ky from "ky";

// Components
import Image from "next/image";
import Home from "@/components/Home";

// Definitions
import type {ServerResponse} from "@/app/api/server/route";
import type {EndpointResponse} from "@/app/api/endpoints/route";
import type {Metadata} from "next";
import type {ResolvingMetadata} from "next/types.js";
import type {CalloutProps} from "@/lib/definitions";

/**
 * The root page for the application.
 */
export default async function RootPage() {
  // Variables
  const server = await (await ky.get<ServerResponse>("http://localhost:3000/api/server")).json();
  const endpoints = await (await ky.get<EndpointResponse>("http://localhost:3000/api/endpoints")).json()

  const states = Object.keys(endpoints).map(endpointName => {
    return endpoints[endpointName].online;
  });

  let status: CalloutProps["type"];

  if (states.every(state => state)) {
    status = "success";
  } else if (states.every(state => !state)) {
    status = "error";
  } else {
    status = "warning";
  }

  console.log(states.every(state => state));
  console.log(states);
  console.log(status);

  return (
    <div className={"flex flex-col justify-center items-start max-w-2/5 my-20 mx-auto"}>
      <div className={"w-full flex flex-col justify-center items-center"}>
        <Image
          className={"pointer-events-none mb-10"}
          src={"/assets/images/banner.png"}
          alt={"Inticate Logo"}
          unoptimized
          width={400} height={100}
          priority
        />
        <Home server={server} endpoints={endpoints} status={status}/>
      </div>
    </div>
  )
}

/**
 * Set the websites title based on the current status of the services.
 */
export async function generateMetadata(_: object, parent: ResolvingMetadata): Promise<Metadata> {
  const templateStr = (await parent).title?.template || ""

  return {
    title: templateStr.replace("%s", "Services Online")
  }
}