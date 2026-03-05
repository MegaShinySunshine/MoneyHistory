import { CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn.ts";

export interface TimelineCardProps {
    imageUrl?: string;
    imageAlt?: string;
    date?: string;
    title?: string;
    description?: string;
    metaItems?: string[];
    side?: "left" | "right";
    reveal?: boolean;
    className?: string;
    onClick?: () => void;
    milestone?: any;
    showDot?: boolean;
    expanded?: boolean;
    audioUrl?: string;
}

export function TimelineCard({
                                 imageUrl,
                                 imageAlt = "",
                                 title,
                                 side = "left",
                                 reveal = true,
                                 className,
                                 onClick,
                                 milestone,
                                 showDot = true,
                                 expanded = false,
                                 audioUrl
                             }: TimelineCardProps) {
    const articleRef = useRef<HTMLElement>(null);
    const [show, setShow] = useState(false);

    // Основные данные
    const finalImage = milestone?.imageUrl ?? imageUrl ?? "";
    const finalTitle = milestone?.title ?? title ?? "";
    const finalIcon = milestone?.icon ?? "";
    const accentColor = milestone?.color ?? "#ff4081";
    const finalAudio = audioUrl ?? milestone?.audioUrl;
    const finalGame = milestone?.gameUrl;

    // Стейты и рефы для ДВУХ аудио-плееров
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const gameAudioRef = useRef<HTMLAudioElement | null>(null);
    const [isGamePlaying, setIsGamePlaying] = useState(false);

    // Проверка: является ли "игра" на самом деле аудиофайлом (как для банка)
    const isGameAudio = typeof finalGame === 'string' &&
        (finalGame.includes(".mp3") || finalGame.includes(".wav"));

    // Логика переключения основного аудио
    const toggleAudio = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Останавливаем второе аудио, если оно играет
            if (isGamePlaying) {
                gameAudioRef.current?.pause();
                setIsGamePlaying(false);
            }
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Логика переключения аудио-игры (второй плеер)
    const toggleGameAudio = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!gameAudioRef.current) return;

        if (isGamePlaying) {
            gameAudioRef.current.pause();
        } else {
            // Останавливаем основное аудио, если оно играет
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            }
            gameAudioRef.current.play();
        }
        setIsGamePlaying(!isGamePlaying);
    };

    // Рендер иконки (обработка Emoji или URL/SVG)
    const renderIcon = () => {
        if (!finalIcon) return null;
        const isUrl = finalIcon.startsWith("http") || finalIcon.includes("/") || finalIcon.includes(".svg");

        return isUrl ? (
            <img src={finalIcon} alt="icon" className="w-24 h-24 object-contain drop-shadow-lg" />
        ) : (
            <span className="drop-shadow-xl">{finalIcon}</span>
        );
    };

    useEffect(() => {
        if (!reveal || !articleRef.current) return;
        const el = articleRef.current;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    setShow(e.isIntersecting);
                });
            },
            { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [reveal]);

    return (
        <article
            ref={articleRef}
            className={cn(
                "timelineItem",
                side === "left" ? "left" : "right",
                reveal && "reveal",
                show && "show",
                className
            )}
            aria-label={finalTitle}
        >
            {showDot && <div className="timelineDot" aria-hidden="true" />}

            <div
                className={cn(
                    "card",
                    expanded ? "isExpanded" : "isPreview",
                    onClick && "cursor-pointer"
                )}
                style={
                    accentColor
                        ? ({
                            ["--card-accent" as never]: accentColor,
                        } as CSSProperties)
                        : undefined
                }
                role={onClick ? "button" : undefined}
                onClick={onClick}
                onKeyDown={
                    onClick
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onClick();
                            }
                        }
                        : undefined
                }
                tabIndex={onClick ? 0 : undefined}
            >
                {expanded ? (
                    <div className="cardTop relative">
                        {/* Иконка (Emoji или SVG) */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-6xl opacity-90">
                            {renderIcon()}
                        </div>

                        <div className="imgWrap" style={{ height: "400px" }}>
                            <img
                                src={finalImage}
                                alt={imageAlt || finalTitle}
                                className="w-full h-full object-cover rounded-t-2xl"
                                loading="lazy"
                            />
                        </div>

                        {/* Блок кнопок */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4 w-full px-8 justify-center">

                            {/* Левая кнопка: Основное аудио */}
                            {finalAudio && (
                                <button
                                    onClick={toggleAudio}
                                    className="flex-1 max-w-[120px] p-4 rounded-full text-white shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    <span className="text-2xl">{isPlaying ? "⏸️" : "🔉"}</span>
                                    <audio
                                        ref={audioRef}
                                        src={finalAudio}
                                        onEnded={() => setIsPlaying(false)}
                                    />
                                </button>
                            )}

                            {/* Правая кнопка: Игра ИЛИ Второй плеер (для банка) */}
                            {finalGame && (
                                isGameAudio ? (
                                    <button
                                        onClick={toggleGameAudio}
                                        className="flex-1 max-w-[120px] p-4 rounded-full text-white shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center border-4 border-white/30"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        <span className="text-2xl">{isGamePlaying ? "⏸️" : "🎵"}</span>
                                        <audio
                                            ref={gameAudioRef}
                                            src={finalGame}
                                            onEnded={() => setIsGamePlaying(false)}
                                        />
                                    </button>
                                ) : (
                                    <a
                                        href={finalGame}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex-1 max-w-[120px] flex items-center justify-center px-6 py-4 rounded-full font-bold text-white shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-white/50 hover:border-white"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        <span className="text-2xl">🎮</span>
                                    </a>
                                )
                            )}
                        </div>
                    </div>
                ) : (
                    /* РЕЖИМ ПРЕВЬЮ */
                    <div className="cardBody cardBodyPreview relative h-64 overflow-hidden rounded-lg">
                        <img
                            src={milestone?.imageIcon || finalImage}
                            alt={finalTitle}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                )}
            </div>
        </article>
    );
}