export default function Loading() {
    return (
        <div className="w-full pt-36 pb-16 flex flex-col items-center">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex flex-col">
                <div className="animate-pulse space-y-4">
                    <div className="h-12 bg-slate-200 rounded w-64" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-slate-100 rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}