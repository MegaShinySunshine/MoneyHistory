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
                               date,
                               title,
                               description,
                               metaItems = [],
                               side = "left",
                               reveal = true,
                               className,
                               onClick,
                               milestone,
                               showDot = true,
                               expanded = false, audioUrl=""
                             }: TimelineCardProps) {
  const articleRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  const finalImage = milestone?.imageUrl ?? imageUrl ?? "";
  const finalYear = milestone?.year ?? date ?? "";
  const finalTitle = milestone?.title ?? title ?? "";
  const finalSummary = milestone?.summary ?? "";
  const finalDescription = milestone?.description ?? description ?? "";
  const finalMeta = milestone?.metaItems ?? metaItems ?? [];
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
                <div className="cardTop">
                  {/* Increased height for the image area in expanded mode */}
                  <div className="imgWrap" style={{ height: "320px" }}>
                    <img
                        src={finalImage}
                        alt={imageAlt || finalTitle}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                  </div>
                  <div className="date">{finalYear}</div>
                </div>

                <div className="cardBody">
                  <h2 className="text-2xl font-bold mb-4">{finalTitle}</h2>
                    <p className="whitespace-pre-wrap mb-6">{finalDescription}</p>

                    {milestone?.audioUrl && (
                        <div className="mt-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleAudio();
                                }}
                                className="px-5 py-2 rounded-full font-medium text-white transition"
                                style={{
                                    backgroundColor: accentColor,
                                }}
                            >
                                {isPlaying ? "⏸️" : "🔉"}
                            </button>

                            <audio
                                ref={audioRef}
                                src={milestone.audioUrl}
                                onEnded={() => setIsPlaying(false)}
                            />
                        </div>
                    )}
                    {/* Meta list removed here for a cleaner "Full Story" look */}
                </div>
              </>
          ) : (
              <div className="cardBody cardBodyPreview">
                <div className="previewHeader">
                  <div className="previewIcon" aria-hidden="true">
                    {finalIcon}
                  </div>
                  <div className="previewYear">{finalYear}</div>
                </div>

                <p className="previewSummary">{finalSummary}</p>

                {finalMeta.length > 0 && (
                    <ul className="meta">
                      {finalMeta.map((item, i) => (
                          <li key={i}>{item}</li>
                      ))}
                    </ul>
                )}
              </div>
          )}
        </div>
      </article>
  );
}