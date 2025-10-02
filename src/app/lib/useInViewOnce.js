"use client"
import {useEffect, useRef, useState} from "react";

export function useInViewOnce(options = { root: null, rootMargin: "0px", threshold: 0.09 }) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!ref.current || inView) return; // nie obserwuj ponownie, gdy już raz weszło
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                obs.disconnect();
            }
        }, options);
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [inView, options]);

    return { ref, inView };
}