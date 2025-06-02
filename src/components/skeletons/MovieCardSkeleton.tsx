export const MovieCardSkeleton = () => {
    return (
        <div className="text-center text-sm group relative animate-pulse">
            <div className="absolute top-2 right-2 z-10 w-8 h-8 bg-slate-300 dark:bg-slate-700 rounded-full" />

            <div className="block w-full h-[300px] bg-slate-300 dark:bg-slate-700 rounded-md" />

            <div className="mt-2 h-5 w-3/4 mx-auto bg-slate-300 dark:bg-slate-700 rounded" />

            <div className="mt-1 h-4 w-1/4 mx-auto bg-slate-300 dark:bg-slate-700 rounded" />
        </div>
    )
}
