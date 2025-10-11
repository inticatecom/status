// Components
import Image from "next/image";
import Home from "@/components/Home";

// Definitions
import type {Metadata} from "next";
import type {ResolvingMetadata} from "next/types.js";

/**
 * The root page for the application.
 */
export default function RootPage() {
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
        <Home/>
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