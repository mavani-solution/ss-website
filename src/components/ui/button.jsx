import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#764979]/35 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-[#764979] text-white shadow hover:bg-[#5e3a62]",
                secondary: "bg-[#d4c4a8] text-[#2d2430] shadow hover:brightness-105",
                outline:
                    "border border-[rgb(118_73_121/25%)] bg-white text-[#2d2430] shadow-sm hover:bg-[rgb(118_73_121/6%)]",
                ghost: "text-[#764979] hover:bg-[rgb(118_73_121/8%)]",
                link: "text-[#764979] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-6 py-2.5",
                sm: "h-9 rounded-full px-4 text-xs",
                lg: "h-11 rounded-full px-8 text-base",
                icon: "size-10 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button }
