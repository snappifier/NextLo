import {strapiFetch} from "@/app/lib/strapi";

async function getData() {
    const populateObj = {
        populate: "*",
    };

    const response = await strapiFetch("/api/kontakt", {
        query: populateObj,
    });

    return response;
}

export default async function Contact() {
    const data = await getData();
    const contactData = data.data;
    const info = contactData["Dane"];
    return (
        <div className="w-full h-max border pt-30 md:pt-35 pb-22 flex justify-center">
            <div className="w-[94%] sm:w-[90%] lg:w-[80%] flex flex-col h-max p-2 py-5 gap-5 md:gap-8">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extralight w-max">
                    {contactData["Naglowek"]}
                </p>
                <div className="flex flex-col md:flex-row w-full h-full justify-between gap-5">
                    <div className="w-full h-full lg:w-max flex flex-col gap-10">
                        <div className="flex flex-col gap-3 md:gap-6">
                            <p className="text-2xl/8 lg:text-3xl/12 font-semibold max-w-2xl md:max-w-4xl">{contactData["NazwaSzkoly"]}</p>
                            <div className="flex flex-col gap-4 font-light text-md md:text-lg">
                                {
                                    info.map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <p className="font-medium">{item["Nazwa"]}</p>
                                            <p>{item["Wartosc"]}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="max-w-xl w-full h-105 shrink-0 rounded-xl overflow-hidden drop-shadow-xl/20 bg-gray-200">
                        <iframe
                            src={contactData["MapaLink"]}
                            className="w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa I LO Zamość"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}