import { useRef, useState } from "react";
import gsap from "gsap";
import finalManImg from "../images/final_man.png";
import finalAudioFile from "../audio/final.mp3";

/**
 * Helper to combine Tailwind classes.
 */
function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export function Footer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const travelerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleTravelerClick = () => {
        if (!audioRef.current || !travelerRef.current) return;

        // Visual feedback
        gsap.to(travelerRef.current, {
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
        <footer className="relative pt-32 pb-20 overflow-hidden bg-white">
            {/* 1. SEAMLESS TRANSITION WAVE (Connects to the timeline) */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-[100px]"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        fill="#dcfce7" /* Light green from the bottom of timeline */
                    ></path>
                </svg>
            </div>

            {/* 2. DECORATIVE BACKGROUND ELEMENTS */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <span className="absolute left-[10%] bottom-1/4 text-4xl animate-bounce">🌱</span>
                <span className="absolute right-[15%] top-1/3 text-5xl animate-pulse">🪻</span>
                <span className="absolute left-1/2 bottom-10 text-3xl opacity-20">🐞</span>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

                {/* 3. THE TRAVELER (Clickable with Audio) */}
                <div className="mb-8 flex flex-col items-center">
                    <div
                        className="relative group cursor-pointer"
                        onClick={handleTravelerClick}
                    >
                        {/* Audio Indicator */}
                        <div className={cn(
                            "absolute top-0 -right-2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 group-hover:scale-110",
                            isPlaying ? "animate-pulse ring-4 ring-green-400" : "ring-2 ring-slate-100"
                        )}>
                            <span className="text-xl">{isPlaying ? "⏸️" : "🔊"}</span>
                        </div>

                        {/* Character Image */}
                        <div ref={travelerRef} className="relative transition-transform duration-500 group-hover:scale-[1.03]">
                            <img
                                src={finalManImg}
                                alt="Путешественник"
                                className={cn(
                                    "h-80 w-auto object-contain drop-shadow-xl transition-all duration-700",
                                    isPlaying ? "brightness-110" : "brightness-100"
                                )}
                            />
                            {/* Glow Effect when playing */}
                            <div className={cn(
                                "absolute inset-0 bg-green-400/20 blur-[60px] -z-10 transition-opacity duration-500 rounded-full",
                                isPlaying ? "opacity-100" : "opacity-0"
                            )} />
                        </div>

                        <audio
                            ref={audioRef}
                            src={finalAudioFile}
                            onEnded={() => setIsPlaying(false)}
                            preload="metadata"
                        />
                    </div>

                    <p className="mt-6 text-xl font-medium text-slate-700 max-w-md">
                        «Ты отлично справился! Давай закрепим знания в играх?»
                    </p>
                </div>

                {/* 4. GAME BUTTONS GRID */}
                <div className="flex flex-wrap justify-center gap-6">
                    {[
                        {
                            name: "Денежное мемо",
                            url: "https://learningapps.org/watch?v=p5xmn78pc26",
                            color: "from-blue-500 to-indigo-600",
                            shadow: "shadow-blue-500/30",
                            icon: "🪙"
                        },
                        {
                            name: "Чем оплатим покупку?",
                            url: "https://learningapps.org/display?v=p49mdzdit26",
                            color: "from-emerald-500 to-teal-600",
                            shadow: "shadow-emerald-500/30",
                            icon: "🛒"
                        },
                        {
                            name: "Найди пару",
                            url: "https://learningapps.org/display?v=p9amshxhk26",
                            color: "from-violet-500 to-fuchsia-600",
                            shadow: "shadow-violet-500/30",
                            icon: "🧩"
                        },
                        {
                            name: "Что сначала — что потом",
                            url: "https://learningapps.org/display?v=pr3mkx0d326",
                            color: "from-pink-500 to-rose-600",
                            shadow: "shadow-pink-500/30",
                            icon: "⏳"
                        }
                    ].map((game) => (
                        <a
                            key={game.name}
                            href={game.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative px-8 py-5 rounded-3xl bg-gradient-to-br ${game.color} 
                                text-white font-bold text-lg shadow-xl ${game.shadow}
                                hover:shadow-2xl hover:-translate-y-2 active:scale-95
                                transition-all duration-300 ease-out flex items-center gap-3`}
                        >
                            <span className="text-2xl group-hover:rotate-12 transition-transform">{game.icon}</span>
                            <span>{game.name}</span>
                            <span className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}