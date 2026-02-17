import { useEffect, useRef, useState } from "react";
import type { TimelineMilestone } from "@/data/timelineData";
import { cn } from "@/utils/cn";

export interface TimelineCardAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export interface TimelineCardProps {
  /** Image URL for the card top */
  imageUrl: string;
  /** Image alt text */
  imageAlt?: string;
  /** Year or date badge (e.g. "2018") */
  date: string;
  /** Card title */
  title: string;
  /** Short description paragraph */
  description: string;
  /** Bullet list items (meta) */
  metaItems?: string[];
  /** Optional action buttons */
  actions?: TimelineCardAction[];
  /** Side for timeline arrow: "left" | "right" */
  side?: "left" | "right";
  /** Reveal animation (add .reveal and .show when in view) */
  reveal?: boolean;
  /** Additional class for the article wrapper */
  className?: string;
  /** Click handler for the whole card (e.g. open modal) */
  onClick?: () => void;
  /** Use milestone to fill all fields and optional accent color for date badge */
  milestone?: TimelineMilestone;
  /** Show the timeline dot (set false when card is used on a curved path with its own dots) */
  showDot?: boolean;
}

/**
 * Timeline card matching the reference design: structure, colors, spacing,
 * typography, shadows, image overlay, date badge, meta list, hover effects.
 * Responsive and customizable (image, title, description, meta, actions).
 */
export function TimelineCard({
  imageUrl,
  imageAlt = "",
  date,
  title,
  description,
  metaItems = [],
  actions,
  side = "left",
  reveal = true,
  className,
  onClick,
  milestone,
  showDot = true,
}: TimelineCardProps) {
  const articleRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  const finalImage = milestone?.imageUrl ?? imageUrl;
  const finalDate = milestone?.year ?? date;
  const finalTitle = milestone?.title ?? title;
  const finalDesc = milestone?.summary ?? description;
  const finalMeta = milestone?.metaItems ?? metaItems;
  const accentColor = milestone?.color ?? "#ff4081";

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
        className={cn("card", onClick && "cursor-pointer")}
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
        <div className="cardTop">
          <div className="imgWrap">
            <img
              src={finalImage}
              alt={imageAlt || finalTitle}
              loading="lazy"
            />
          </div>
          <div
            className="date"
            style={
              accentColor
                ? {
                    background: accentColor,
                    boxShadow: `0 14px 28px ${accentColor}40`,
                  }
                : undefined
            }
          >
            {finalDate}
          </div>
        </div>

        <div className="cardBody">
          <h2>{finalTitle}</h2>
          <p>{finalDesc}</p>
          {finalMeta.length > 0 && (
            <ul className="meta">
              {finalMeta.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {actions && actions.length > 0 && (
            <div className="cardActions">
              {actions.map((action, i) => (
                <button
                  key={i}
                  type="button"
                  className={cn(
                    "cardActionBtn",
                    action.variant === "primary" ? "primary" : "secondary"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
