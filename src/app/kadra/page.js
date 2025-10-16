import { Suspense } from "react";
import {strapiFetch} from "@/app/lib/strapi";
import Kadra from "@/app/kadra/KadraClient";

async function getKadra() {
    const json = await strapiFetch("/api/kadras");
    return json?.data ?? {};
}

export default async function Page(){
    return (
        <Suspense fallback={
            <div className="w-full pt-36 pb-16 flex items-center justify-center">
                <div className="animate-pulse">
                    <div className="h-12 w-64 bg-slate-200 rounded mb-6" />
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="h-40 bg-slate-100 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        }>
            <KadraAsync />
        </Suspense>
    );
}

async function KadraAsync() {
    const kadra = await getKadra();
    return <Kadra kadra={kadra} />;
}