import {CSSProperties, useEffect, useRef, useState} from "react";
import {cn} from "@/utils/cn.ts";

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
                               expanded = false, audioUrl
                             }: TimelineCardProps) {
  const articleRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  const finalImage = milestone?.imageUrl ?? imageUrl ?? "";
  const finalTitle = milestone?.title ?? title ?? "";
  const finalIcon = milestone?.icon ?? "";
  const accentColor = milestone?.color ?? "#ff4081";

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
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
                <>
                    <div className="cardTop relative">
                        {/* Emoji overlay on image */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-6xl opacity-90">
                            {finalIcon}
                        </div>

                        <div className="imgWrap" style={{ height: "400px" }}>
                            <img
                                src={finalImage}
                                alt={imageAlt || finalTitle}
                                className="w-full h-full object-cover rounded-t-2xl"
                                loading="lazy"
                            />
                        </div>
                        {/* Dual buttons - split bottom of image */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4">
                            {/* Audio button (left) */}
                            {milestone?.audioUrl && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleAudio();
                                    }}
                                    className="flex-1 p-4 rounded-full text-white shadow-2xl transition-all hover:scale-105"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    {isPlaying ? "⏸️" : "🔉"}
                                    <audio
                                        ref={audioRef}
                                        src={milestone.audioUrl}
                                        onEnded={() => setIsPlaying(false)}
                                    />
                                </button>
                            )}

                            {/* Game button (right) */}
                            {milestone?.gameUrl && (
                                <a
                                    href={milestone.gameUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center px-6 py-4 rounded-full font-bold text-white shadow-2xl transition-all hover:scale-105 border-2 border-white/50 hover:border-white"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    🎮
                                </a>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                // ← IMAGE PREVIEW MODE (shows by default, before clicking)
                <div className="cardBody cardBodyPreview relative h-64 overflow-hidden rounded-lg">
                    {/* Secondary teaser image */}
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