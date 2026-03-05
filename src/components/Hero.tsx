import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import introManImg from "../images/intro_man.png";
import introAudioFile from "../audio/intro_complete.mp3";

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentGridRef = useRef<HTMLDivElement>(null);
    const audioImageRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const parallaxItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 })
                .fromTo(contentGridRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.8")
                .fromTo(arrowRef.current, { opacity: 0 }, { opacity: 0.4, duration: 1 }, "-=0.5");

            parallaxItemsRef.current.forEach((item, i) => {
                if (!item) return;
                gsap.to(item, {
                    y: i % 2 === 0 ? -30 : 30,
                    repeat: -1,
                    yoyo: true,
                    duration: 3 + i,
                    ease: "sine.inOut"
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleAudioClick = () => {
        if (!audioRef.current || !audioImageRef.current) return;
        gsap.to(audioImageRef.current, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    return (
        <section ref={containerRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] px-6">

            {/* Декор фона */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
                <div ref={el => { parallaxItemsRef.current[0] = el }} className="absolute top-[15%] left-[10%] text-8xl">☁️</div>
                <div ref={el => { parallaxItemsRef.current[1] = el }} className="absolute top-[20%] right-[15%] text-7xl">🎈</div>
                <div ref={el => { parallaxItemsRef.current[2] = el }} className="absolute bottom-[25%] left-[20%] text-6xl">🕊️</div>
                <div ref={el => { parallaxItemsRef.current[3] = el }} className="absolute bottom-[15%] right-[10%] text-8xl">☁️</div>
            </div>

            {/* Контент */}
            <div className="relative z-20 flex flex-col items-center gap-12 text-center max-w-6xl pb-24">
                <h1 ref={titleRef} className="bg-gradient-to-r from-violet-600 via-blue-500 to-emerald-500 bg-clip-text text-5xl font-extrabold leading-tight text-transparent sm:text-7xl md:text-8xl">
                    История возникновения денег
                </h1>

                <div ref={contentGridRef} className="relative group cursor-pointer select-none" onClick={handleAudioClick}>

                    {/* Кнопка управления звуком парит отдельно */}
                    <div className={cn(
                        "absolute -top-10 -right-10 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:scale-110",
                        isPlaying ? "animate-pulse ring-4 ring-blue-400" : "ring-2 ring-slate-200"
                    )}>
                        <span className="text-3xl">{isPlaying ? "⏸️" : "🔊"}</span>
                    </div>

                    {/* ПЕРСОНАЖ: Без фона, без границ, только PNG с контурной тенью */}
                    <div ref={audioImageRef} className="relative">
                        <img
                            src={introManImg}
                            alt="Путешественник"
                            className={cn(
                                "h-auto w-full max-w-2xl md:max-w-3xl lg:max-w-4xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-700",
                                isPlaying ? "brightness-110 scale-[1.02]" : "brightness-100"
                            )}
                        />

                        {/* Мягкое свечение только когда персонаж "говорит" */}
                        <div className={cn(
                            "absolute inset-0 bg-blue-400/30 blur-[120px] -z-10 transition-opacity duration-700 rounded-full",
                            isPlaying ? "opacity-100" : "opacity-0"
                        )} />
                    </div>

                    <audio ref={audioRef} src={introAudioFile} onEnded={() => setIsPlaying(false)} preload="metadata" />
                </div>
            </div>

            {/* Стрелка */}
            <div ref={arrowRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-40">
                <svg className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Волна в самом низу */}
            <div className="absolute bottom-0 left-0 w-full leading-[0] z-10">
                <svg className="h-24 w-full fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
                </svg>
            </div>
        </section>
    );
}