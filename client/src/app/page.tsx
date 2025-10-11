// Components
import Image from "next/image";
import {Callout} from "@/components/View";
import {Status, StatusCategory, StatusEntry} from "@/components/Status";

// Definitions
import {Metadata} from "next";
import {ResolvingMetadata} from "next/types.js";

/**
 * The home page for the application.
 */
export default function Home() {
  return (
    <div className={"flex flex-col justify-center items-start max-w-2/5 my-20 mx-auto"}>
      <div className={"w-full flex flex-col justify-center items-center"}>
        <Image
          className={"pointer-events-none mb-10"}
          src={"/assets/images/banner.png"}
          alt={"Banner Logo"}
          unoptimized
          width={400} height={100}
          priority
        />
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
        </Status>
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