import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1.5 p-1.5", className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  );
}

function SelectTrigger({ className, size = "default", children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
  "flex h-12 w-full items-center justify-between rounded-2xl px-4",

  "border border-emerald-200/70 dark:border-emerald-800/40",

  "bg-white/70 dark:bg-emerald-950/40",

  "backdrop-blur-2xl",

  "text-slate-800 dark:text-white",

  "shadow-lg shadow-emerald-100/30 dark:shadow-black/30",

  "transition-all duration-300",

  "hover:border-green-500",

  "focus-visible:ring-2 focus-visible:ring-green-500/30",

  "focus-visible:border-green-500",

  "data-placeholder:text-slate-500 dark:data-placeholder:text-slate-400",

  "[&_svg]:text-green-600 dark:[&_svg]:text-green-400",

  className
)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none h-4 w-4 transition-transform duration-300 group-data-[popup-open]:rotate-180" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "relative z-50",

            "max-h-80",

            "overflow-hidden",

            "rounded-2xl",

            "border",

            "border-emerald-200/70 dark:border-emerald-800/40",

            "bg-white/75 dark:bg-[#0b1d13]/90",

            "backdrop-blur-3xl",

            "shadow-[0_20px_60px_rgba(22,163,74,.18)]",

            "text-slate-800 dark:text-white",

            "data-open:animate-in",

            "data-open:fade-in-0",

            "data-open:zoom-in-95",

            "data-closed:animate-out",

            "data-closed:fade-out-0",

            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-3 py-2.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative",

        "flex",

        "cursor-pointer",

        "items-center",

        "rounded-xl",

        "px-4",

        "py-3",

        "text-sm",

        "font-medium",

        "transition-all",

        "text-slate-700 dark:text-slate-200",

        "hover:bg-gradient-to-r",

        "hover:from-green-600",

        "hover:to-lime-500",

        "hover:text-white",

        "focus:bg-gradient-to-r",

        "focus:from-green-600",

        "focus:to-lime-500",

        "focus:text-white",

        "data-disabled:pointer-events-none",

        "data-disabled:opacity-50",

        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="h-4 w-4 text-green-500" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none -mx-1.5 my-1.5 h-px bg-border",
        className,
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
