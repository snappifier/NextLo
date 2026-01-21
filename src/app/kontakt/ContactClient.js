'use client'
import {useState} from "react";
import {AnimatePresence, motion} from "motion/react";

export default function ContactClient({contactData}) {
    const info = contactData["Dane"];
    const [loading, setLoading] = useState(true);
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
                    <div className="relative max-w-xl w-full h-105 shrink-0 rounded-xl overflow-hidden drop-shadow-xl/20 bg-gray-200">
                        <AnimatePresence >
                            {loading && (
                              <motion.div className={`absolute inset-0 z-10 overflow-hidden bg-slate-300 select-none pointer-events-none`}
                                          initial={{opacity: 1}}
                                          exit={{opacity: 0}}
                                          transition={{duration: 0.3, ease: "easeOut"}}
                              >
                                  <div className="absolute inset-0 bg-linear-to-r from-slate-300 via-slate-200 to-slate-300 animate-shimmer" />
                              </motion.div>
                            )}
                        </AnimatePresence>
                        <iframe
                            src={contactData["MapaLink"]}
                            className="w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa I LO Zamość"
                            onLoad={() => {setLoading(false);}}
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}