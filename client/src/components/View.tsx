// Resources
import { cn } from "@/lib/utility";

// Definitions
import type { CalloutProps } from "@/lib/definitions";

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
