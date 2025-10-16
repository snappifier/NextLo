export default function Loading() {
    return (
        <div className="w-full min-h-screen pt-36 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-600 font-light">Ładowanie...</p>
            </div>
        </div>
    );
}