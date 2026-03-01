import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Hero section at the top of the page.
 * Animated heading that invites the user to scroll down.
 * Features a split layout on desktop with introductory text
 * and an interactive image that plays an audio greeting.
 */
export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentGridRef = useRef<HTMLDivElement>(null); // New ref for the two-column grid
    const audioImageRef = useRef<HTMLButtonElement>(null); // Ref for the audio image/button
    const audioRef = useRef<HTMLAudioElement>(null); // Ref for the actual audio element
    const arrowRef = useRef<HTMLDivElement>(null);

    // Audio playing state
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1 }
            );

            tl.fromTo(
                contentGridRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                "-=0.5" // Start slightly before the title ends
            );

            // Simple entry animation for the audio button itself
            tl.fromTo(
                audioImageRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.4"
            );

            tl.fromTo(
                arrowRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.3"
            );

            // bouncing arrow loop
            gsap.to(arrowRef.current, {
                y: 12,
                repeat: -1,
                yoyo: true,
                duration: 0.8,
                ease: "power1.inOut",
                delay: 1.5,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    /**
     * Toggles audio play/pause and executes a quick "pop" animation.
     */
    const handleAudioClick = () => {
        if (!audioRef.current || !audioImageRef.current) return;

        // Trigger click animation with GSAP
        gsap.timeline({ defaults: { duration: 0.1, ease: "power1.inOut" } })
            .to(audioImageRef.current, { scale: 0.96 })
            .to(audioImageRef.current, { scale: 1.05 }) // overshoot slightly
            .to(audioImageRef.current, { scale: 1 });

        // Handle audio logic
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // If played from the start, we might want to reset other audios
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    /**
     * Reset state when audio finishes naturally
     */
    const handleAudioEnd = () => {
        setIsPlaying(false);
    };

    return (
        <div
            ref={containerRef}
            className="relative flex min-h-[90vh] flex-col items-center justify-center gap-12 px-6 pt-24 pb-16 text-center md:pt-32"
        >
            {/* decorative background blobs */}
            <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -top-10 right-1/4 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />

            {/* Title */}
            <h1
                ref={titleRef}
                className="mb-4 bg-gradient-to-r from-violet-600 via-blue-500 to-emerald-500 bg-clip-text text-5xl font-extrabold leading-tight text-transparent sm:text-6xl md:text-7xl"
                style={{ opacity: 0 }}
            >
                История возникновения денег
            </h1>

            {/* Main Content (Split Layout) */}
            <div
                ref={contentGridRef}
                className="content-container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:text-left"
                style={{ opacity: 0 }}
            >
                {/* Left Column: Text */}
                <div className="space-y-6 text-lg text-slate-600 sm:text-xl md:max-w-2xl">
                    <p className="font-semibold text-violet-700 md:text-2xl">
                        Здравствуйте, ребята! 🌟
                    </p>
                    <p>
                        Я — весёлый сказочный Путешественник по Времени, и сегодня я
                        приглашаю вас в удивительное приключение! Хотите узнать, откуда
                        появились деньги и почему люди ими пользуются?
                    </p>
                    <p>
                        Давным-давно никаких монет и купюр не было, и люди обменивались тем,
                        что умели делать сами. Это было непросто, но очень интересно! Мы с
                        вами отправимся в прошлое, познакомимся с древними людьми, увидим
                        первые монеты и даже узнаем, как появились бумажные деньги.
                    </p>
                    <p>
                        Я расскажу вам эту историю просто и понятно, с секретами и
                        маленькими чудесами. Готовы открыть тайну денег?
                    </p>
                    <p className="font-semibold text-emerald-700 md:text-2xl">
                        Тогда вперёд — наше путешествие начинается! 🚀✨
                    </p>
                </div>

                <div className="flex items-center justify-center md:justify-end">
                    <div
                        ref={audioImageRef}
                        onClick={handleAudioClick}
                        /* role="button" and tabIndex still used for accessibility without visual button styling */
                        role="button"
                        tabIndex={0}
                        className="group relative cursor-pointer"
                        style={{ opacity: 0 }} // Controlled by your GSAP timeline
                    >
                        {/* Clean image, no frame, no padding, no ring */}
                        <img
                            src="src/images/intro_man.png"
                            alt="Friendly Time Traveler"
                            className="h-auto w-full max-w-sm transform rounded-2xl md:max-w-md"
                        />

                        {/* The hidden audio engine */}
                        <audio
                            ref={audioRef}
                            src="src/audio/intro.mp3"
                            onEnded={handleAudioEnd}
                            preload="metadata"
                        />
                    </div>
                </div>
            </div>

            {/* scroll-down arrow */}
            <div ref={arrowRef} className="mt-8" style={{ opacity: 0 }}>
                <svg
                    className="h-8 w-8 text-slate-400 md:h-12 md:w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    );
}