import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Вспомогательная функция для объединения классов Tailwind.
 */
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

            // 1. Входная анимация элементов
            tl.fromTo(titleRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.2 }
            )
                .fromTo(contentGridRef.current,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 1 },
                    "-=0.8"
                )
                .fromTo(arrowRef.current,
                    { opacity: 0 },
                    { opacity: 0.4, duration: 1 }, // Прозрачность как в стилях (opacity-40)
                    "-=0.5"
                );

            // 2. Анимация плавающих элементов фона (Параллакс)
            parallaxItemsRef.current.forEach((item, i) => {
                if (!item) return;
                gsap.to(item, {
                    y: i % 2 === 0 ? -30 : 30,
                    repeat: -1,
                    yoyo: true,
                    duration: 3 + i, // Чуть медленнее для спокойствия
                    ease: "sine.inOut"
                });
            });

            // ПРИМЕЧАНИЕ: Анимация подпрыгивания стрелки удалена по запросу.
            // Она теперь статична и служит визуальным указателем.

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleAudioClick = () => {
        if (!audioRef.current || !audioImageRef.current) return;

        // Легкая пульсация при клике
        gsap.to(audioImageRef.current, {
            scale: 0.98,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] px-6"
        >
            {/* ПАРАЛЛАКС ДЕКОР */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30">
                <div ref={el => { parallaxItemsRef.current[0] = el }} className="absolute top-[15%] left-[10%] text-8xl">☁️</div>
                <div ref={el => { parallaxItemsRef.current[1] = el }} className="absolute top-[20%] right-[15%] text-7xl">🎈</div>
                <div ref={el => { parallaxItemsRef.current[2] = el }} className="absolute bottom-[25%] left-[20%] text-6xl">🕊️</div>
                <div ref={el => { parallaxItemsRef.current[3] = el }} className="absolute bottom-[15%] right-[10%] text-8xl">☁️</div>
            </div>

            {/* Текстура бумаги */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

            {/* Основной контент */}
            <div className="relative z-20 flex flex-col items-center gap-8 text-center max-w-6xl pb-24">
                <h1
                    ref={titleRef}
                    className="bg-gradient-to-r from-violet-600 via-blue-500 to-emerald-500 bg-clip-text text-5xl font-extrabold leading-tight text-transparent sm:text-7xl md:text-8xl"
                >
                    История денег
                </h1>

                <p className="max-w-2xl text-lg text-slate-600 md:text-xl">
                    Нажми на путешественника, чтобы начать наше увлекательное приключение сквозь время!
                </p>

                <div
                    ref={contentGridRef}
                    className="relative group cursor-pointer"
                    onClick={handleAudioClick}
                >
                    {/* Индикатор звука */}
                    <div className={cn(
                        "absolute -top-6 -right-6 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl transition-all duration-300 group-hover:scale-110",
                        isPlaying ? "animate-pulse border-4 border-blue-400" : "border-4 border-transparent"
                    )}>
                        <span className="text-3xl">{isPlaying ? "⏸️" : "🔊"}</span>
                    </div>

                    <div
                        ref={audioImageRef}
                        className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-2xl transition-transform duration-500 group-hover:rotate-1"
                    >
                        <img
                            src="src/images/intro_man.png"
                            alt="Путешественник"
                            className="h-auto w-full max-w-4xl transition-all duration-700 group-hover:scale-105"
                        />
                        <div className={cn(
                            "absolute inset-0 bg-blue-500/10 transition-opacity duration-500",
                            isPlaying ? "opacity-100" : "opacity-0"
                        )} />
                    </div>

                    <audio
                        ref={audioRef}
                        src="src/audio/intro.mp3"
                        onEnded={() => setIsPlaying(false)}
                        preload="metadata"
                    />
                </div>
            </div>

            {/* СТАТИЧНАЯ СТРЕЛКА (z-20: выше фона и волны, но ниже таймлайна) */}
            <div
                ref={arrowRef}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pb-6 flex flex-col items-center opacity-40 pointer-events-none"
            >
                <svg
                    className="h-10 w-10 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* SVG Wave (z-10: самый нижний слой декора) */}
            <div className="absolute bottom-0 left-0 w-full leading-[0] z-10">
                <svg className="h-24 w-full fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
                </svg>
            </div>
        </section>
    );
}