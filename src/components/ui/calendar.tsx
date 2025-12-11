import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

// Define default class names that were previously provided by getDefaultClassNames
const defaultClassNames = {
  root: "rdp",
  months: "rdp-months",
  month: "rdp-month",
  nav: "rdp-nav",
  button_previous: "rdp-nav_button rdp-nav_button_previous",
  button_next: "rdp-nav_button rdp-nav_button_next",
  month_caption: "rdp-caption",
  dropdowns: "rdp-dropdowns",
  dropdown: "rdp-dropdown",
  dropdown_root: "rdp-dropdown_root",
  caption_label: "rdp-caption_label",
  weekdays: "rdp-head",
  weekday: "rdp-head_cell",
  week: "rdp-row",
  day: "rdp-cell",
  day_button: "rdp-button",
  day_range_start: "rdp-day_range_start",
  day_range_end: "rdp-day_range_end",
  day_range_middle: "rdp-day_range_middle",
  day_selected: "rdp-day_selected",
  day_disabled: "rdp-day_disabled",
  day_hidden: "rdp-day_hidden",
  day_outside: "rdp-day_outside",
  day_today: "rdp-day_today",
  footer: "rdp-footer",
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 w-full [&_.rdp-month]:w-full [&_.rdp-table]:w-full [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: date =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative w-full",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        table: "w-full border-collapse",
        nav: cn(
          "flex items-center justify-between w-full absolute top-0 inset-x-0 px-8 py-2",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-7 w-7 p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-7 w-7 p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center absolute inset-x-0 top-0 py-2",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-7 gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium text-sm",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        weekdays: cn("flex w-full", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        day: cn(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        day_range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.day_range_start
        ),
        day_range_middle: cn("rounded-none", defaultClassNames.day_range_middle),
        day_range_end: cn("rounded-r-md bg-accent", defaultClassNames.day_range_end),
        day_selected: cn(
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          defaultClassNames.day_selected
        ),
        day_today: cn(
          "bg-accent text-accent-foreground rounded-md",
          defaultClassNames.day_today
        ),
        day_outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.day_outside
        ),
        day_disabled: cn(
          "text-muted-foreground opacity-50 cursor-not-allowed",
          defaultClassNames.day_disabled
        ),
        day_hidden: cn("invisible", defaultClassNames.day_hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, ...props }) => {
          return (
            <div
              data-slot="calendar"
              className={cn("w-full", className)}
              {...props}
            />
          );
        },
        Chevron: ({ orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className="h-4 w-4" {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className="h-4 w-4"
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className="h-4 w-4" {...props} />
          );
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  onClick,
  ...props
}: React.ComponentProps<"button"> & {
  day: Date;
  modifiers: {
    today?: boolean;
    selected?: boolean;
    disabled?: boolean;
    range_start?: boolean;
    range_end?: boolean;
    range_middle?: boolean;
    outside?: boolean;
    focused?: boolean;
  };
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  // Handle click events properly
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Don't handle clicks on disabled days
    if (modifiers.disabled) {
      e.preventDefault();
      return;
    }
    
    // Call the original onClick handler if provided
    onClick?.(e);
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-8 flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day_button,
        className
      )}
      onClick={handleClick}
      disabled={modifiers.disabled}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };