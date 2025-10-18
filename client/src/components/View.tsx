// Resources
import { cn } from "@/lib/utility";

// Definitions
import type { CalloutProps, TooltipProps } from "@/lib/definitions";
import { useCallback, useState } from "react";

/**
 * The callout component, used to alert an important message to the user.
 */
export function Callout({
  type = "success",
  children,
  className,
}: CalloutProps) {
  // Variables
  let style = "";

  // Create style based on callout type.
  switch (type) {
    case "success":
      style = "bg-green-400/10 border-green-400/20";
      break;
    case "warning":
      style = "bg-orange-400/10 border-orange-400/20";
      break;
    case "error":
      style = "bg-red-400/10 border-red-400/20";
      break;
  }

  return (
    <div
      className={cn(
        "text-lg border-1 rounded-lg p-3 text-white/70",
        style,
        className
      )}>
      {children}
    </div>
  );
}

export function Tooltip(props: TooltipProps) {
  // States
  const [active, setActive] = useState(false);

  const setState = useCallback(
    (state: boolean) => {
      setActive(state);
    },
    [setActive]
  );

  return (
    <button
      className="relative block cursor-pointer"
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}>
      {active && (
        <span className="absolute text-sm bg-[#070707] border-1 border-white/15 px-2 py-1 rounded-md z-10 text-nowrap left-full top-[125%]">
          {props.label}
        </span>
      )}
      {props.children}
    </button>
  );
}
