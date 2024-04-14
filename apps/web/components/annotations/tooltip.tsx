import { AnnotationHandler, InlineAnnotationComponent } from "codehike/code"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from "@/components/ui/tooltip"

export const tooltip: AnnotationHandler = {
  name: "Tooltip",
  Inline: ({ children, annotation }) => {
    const { query, data } = annotation
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger className="underline decoration-dashed cursor-pointer">
            {children}
          </TooltipTrigger>
          <TooltipContent className="bg-zinc-900" sideOffset={0}>
            {data?.children || query}
            <TooltipArrow className="fill-zinc-800" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
}
