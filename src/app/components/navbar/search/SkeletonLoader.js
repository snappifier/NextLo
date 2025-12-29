export default function SkeletonLoader() {
    return (
        <div className="relative w-full h-20 bg-zinc-400/80 rounded-md overflow-hidden animate-pulse">
            <div className="h-full flex items-center justify-start">
                <div className="size-12 m-2 rounded-full bg-zinc-500  "/>
                <div className="flex flex-col items-start justify-start gap-2 ml-2">
                    <div className="w-30 h-3 rounded-full bg-zinc-500 "/>
                    <div className="w-20 h-2 rounded-full bg-zinc-500/70"/>
                </div>
            </div>
        </div>
    )
}