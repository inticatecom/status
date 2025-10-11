// Components
import Image from "next/image";
import {Callout} from "@/components/View";
import Status from "@/components/Status";

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
          <Status.Category title={"Services"}>
            <Status.Entry website={"https://lucastranks.com"}>Website</Status.Entry>
            <Status.Entry website={"https://lucastranks.com"}>Backend API</Status.Entry>
          </Status.Category>
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