// Defintions
import * as Types from "@/lib/definitions";

// Icons
import {IoMdArrowDropdown} from "react-icons/io";

/**
 * Represents the container for the status page.
 */
export default function Status(props: Types.Children<true>) {
  return <div className={"border-1 rounded-lg w-full p-3 border-white/15"}>{props.children}</div>;
}

/**
 * A category holding status entries.
 */
Status.Category = function StatusCategory(props: Types.StatusCategoryProps) {
  return (
    <div className={"flex flex-col gap-1"}>
      <div className={"flex items-center gap-1"}>
        <button className={"text-lg cursor-pointer"}>
          <IoMdArrowDropdown/>
        </button>
        <h3 className={"font-semibold text-xl mb-1"}>{props.title}</h3>
      </div>
      <div className={"w-full flex gap-3 items-start"}>
        <IoMdArrowDropdown className={"text-lg opacity-0"}/>
        <div className={"w-full flex flex-col gap-1"}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

/**
 * A status entry holding information of a site and it's current status.
 */
Status.Entry = function StatusEntry(props: Types.StatusEntryProps) {
  return <div className={"w-full flex justify-between items-center"}>
    <p className={"text-lg"}>{props.children}</p>
    <p className={"text-green-300/70"}>Operational</p>
  </div>;
};
