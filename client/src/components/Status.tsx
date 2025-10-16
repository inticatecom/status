"use client";
// Resources
import { cn } from "@/lib/utility";

// Hooks
import { useState, useCallback } from "react";

// Definitions
import type * as Types from "@/lib/definitions";

// Icons
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

/**
 * Represents the container for the status page.
 */
export function Status(props: Types.Children<true>) {
  return <div className={"flex flex-col w-full"}>{props.children}</div>;
}

/**
 * A category holding status entries.
 */
export function StatusCategory(props: Types.StatusCategoryProps) {
  // States
  const [expanded, setExpanded] = useState(true);

  /**
   * Handles the operation of expanding and hiding a category.
   */
  const handleExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded, setExpanded]);

  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-3 border-1 border-white/15",
        props.position === "top"
          ? "rounded-t-lg"
          : props.position === "bottom"
          ? "rounded-b-lg border-t-0"
          : props.position === "both"
          ? "rounded-lg"
          : ""
      )}>
      <button
        className={"flex items-center gap-1 cursor-pointer w-fit"}
        onClick={handleExpand}>
        {expanded ? (
          <IoMdArrowDropdown className={"text-lg"} />
        ) : (
          <IoMdArrowDropup className={"text-lg"} />
        )}
        <h3 className={"font-semibold text-xl mb-1"}>{props.title}</h3>
      </button>
      {expanded && (
        <div className={"w-full flex gap-3 items-start"}>
          <IoMdArrowDropdown className={"text-lg opacity-0"} />
          <div className={"w-full flex flex-col gap-1"}>{props.children}</div>
        </div>
      )}
    </div>
  );
}

/**
 * A status entry holding information of a site and it's current status.
 */
export function StatusEntry(props: Types.StatusEntryProps) {
  // Variables
  const style = props.data.online ? "text-green-300/70" : "text-red-400/70";

  return (
    <div className={"w-full flex justify-between items-center"}>
      <p className={"text-lg"}>{props.children}</p>
      <p className={cn("text-end", style)}>
        {props.data.online ? "Operational" : "Offline"} ({props.data.latency}ms)
      </p>
    </div>
  );
}
