
import Profil from "@/components/home/Profile/Profil";
import Profill from "@/components/home/Profile/Profil2";


const KIERUNKI = [
    { t: "matematyczno-fizyczny", k: "Profil", d: "Rozszerzona matematyka i fizyka, przygotowanie pod kierunki techniczne." },
    { t: "biologiczno-chemiczny", k: "Profil", d: "Biologia i chemia dla przyszłych medyków i nauk przyrodniczych." },
    { t: "humanistyczny",        k: "Profil", d: "Język polski i historia z akcentem na kulturę i media." },
    { t: "informatyczny",        k: "Profil", d: "Algorytmika, programowanie i nowoczesne technologie." },
    { t: "językowy",             k: "Profil", d: "Języki obce, konwersacje, zajęcia z native speakerami." },
    { t: "geograficzno-mat.",    k: "Profil", d: "Geografia z matematyką dla kierunków ekonomicznych i geoinf." },
    { t: "artystyczny",          k: "Profil", d: "Sztuki wizualne, projektowanie i historia sztuki." },
];

// Kolory tylko NA HOVERZE + kolor ikony
const PALETTE = [
    { tint: "rgba(125,211,252,0.18)", icon: "#38bdf8" },  // sky
    { tint: "rgba(110,231,183,0.18)", icon: "#10b981" },  // emerald
    { tint: "rgba(253,164,175,0.20)", icon: "#f43f5e" },  // rose
    { tint: "rgba(165,180,252,0.20)", icon: "#6366f1" },  // indigo
    { tint: "rgba(196,181,253,0.20)", icon: "#8b5cf6" },  // violet
    { tint: "rgba(251,191,36,0.20)",  icon: "#f59e0b" },  // amber
    { tint: "rgba(240,171,252,0.20)", icon: "#d946ef" },  // fuchsia
];

const easeSoft = [0.22, 1, 0.36, 1];

export function extractD(pathString) {
    if (typeof pathString !== "string") return null;
    const m = pathString.match(/<path\b[^>]*\sd=(["'])(.*?)\1/i);
    return m ? m[2] : null;
}

const Profile = ({data, id}) => {
    return (
        <div className="font-[poppins] w-full h-max flex justify-center items-center mt-10">
            <div className="h-max w-[94%] sm:w-[90%] lg:w-[80%] flex flex-col gap-6">
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight">Nasze profile</h2>

                {/* 1 kol (mobile) → 2 kol (md) → 3 kol (xl); niższe rzędy (bardziej kompaktowo) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 auto-rows-[11rem] sm:auto-rows-[12.5rem] lg:auto-rows-[14rem]">
                    {data["Profile"].map((item, i) => {
                        const { tint, icon } = PALETTE[i % PALETTE.length];
                        const raw = item.IconPath;
                        const d = extractD(raw);
                        return (
		                        <Profill key={item.id || i} item={item} d={d} tint={tint} />

                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Profile;
