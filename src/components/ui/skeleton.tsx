import React from "react";
import { cn } from "../../lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-md",
        className
      )}
      {...props}
    />
  )
);

Skeleton.displayName = "Skeleton";

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, ...props }, ref) => (
    <div ref={ref} className="space-y-2" {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 rounded",
            i === lines - 1 && "w-4/5"
          )}
        />
      ))}
    </div>
  )
);

SkeletonText.displayName = "SkeletonText";

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "space-y-4 p-4 border border-slate-200 rounded-lg bg-white",
        className
      )}
      {...props}
    >
      <Skeleton className="h-12 w-12 rounded" />
      <SkeletonText lines={2} />
      <div className="flex gap-2 pt-4">
        <Skeleton className="h-8 flex-1 rounded" />
        <Skeleton className="h-8 flex-1 rounded" />
      </div>
    </div>
  )
);

SkeletonCard.displayName = "SkeletonCard";
