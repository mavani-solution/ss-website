import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-11 w-full rounded-xl border border-[rgb(118_73_121/22%)] bg-white px-3 py-2 text-base text-[#2d2430] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[rgb(45_36_48/45%)] focus-visible:border-[#764979] focus-visible:ring-2 focus-visible:ring-[#764979]/25 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = "Input"

export { Input }
