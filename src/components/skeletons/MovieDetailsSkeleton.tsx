export const MovieDetailsSkeleton = () => {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                {/* Poster */}
                <div className="w-full max-w-md mx-auto lg:mx-0">
                    <div className="w-full h-[450px] rounded-lg bg-slate-300 dark:bg-slate-700 animate-pulse" />
                </div>

                {/* Details */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="h-10 w-3/4 rounded bg-slate-300 dark:bg-slate-700 animate-pulse" />

                    <div className="h-6 w-1/2 rounded bg-slate-300 dark:bg-slate-700 animate-pulse" />

                    <div className="flex flex-wrap gap-3">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-6 w-20 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse"
                            />
                        ))}
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="h-6 w-12 rounded bg-slate-300 dark:bg-slate-700 animate-pulse" />
                        <div className="h-6 w-24 rounded bg-slate-300 dark:bg-slate-700 animate-pulse" />
                    </div>

                    <div className="h-10 w-36 rounded bg-slate-300 dark:bg-slate-700 animate-pulse" />

                    <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-4 w-full rounded bg-slate-300 dark:bg-slate-700 animate-pulse"
                            />
                        ))}
                    </div>

                    <div>
                        <div className="h-6 w-24 mb-2 rounded bg-slate-300 dark:bg-slate-700 animate-pulse" />
                        <div className="h-4 w-3/4 rounded bg-slate-300 dark:bg-slate-700 animate-pulse" />
                    </div>
                </div>
            </section>
        </main>
    )
}
