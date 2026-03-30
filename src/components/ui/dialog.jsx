import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay ref={ref} className={cn("absolute inset-0 bg-black/55", className)} {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/**
 * Centered on all viewports: flex wrapper + relative content (avoids mobile translate bugs).
 */
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center",
                "p-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] sm:p-4"
            )}
        >
            <DialogOverlay />
            <DialogPrimitive.Content
                ref={ref}
                className={cn(
                    "dialog-content relative z-50 flex max-h-[min(88dvh,calc(100dvh-2rem))] w-full max-w-lg flex-col gap-4 overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-[rgb(118_73_121/15%)] bg-white shadow-2xl",
                    "min-h-0 min-w-0",
                    "px-4 pt-12 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:px-6 sm:pb-6 sm:pt-14",
                    className
                )}
                {...props}
            >
                {children}
                <DialogPrimitive.Close className="absolute top-[max(0.75rem,calc(0.5rem+env(safe-area-inset-top,0px)))] right-[max(0.75rem,calc(0.5rem+env(safe-area-inset-right,0px)))] cursor-pointer rounded-full p-1.5 text-white/85 transition-colors hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/30 focus:outline-none sm:top-4 sm:right-4">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
            </DialogPrimitive.Content>
        </div>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }) => (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }) => (
    <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "pr-10 font-['Playfair_Display',Georgia,serif] text-lg font-semibold tracking-tight text-[#2d2430] sm:pr-8 sm:text-2xl",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-base leading-relaxed text-[rgb(45_36_48/78%)]", className)}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
