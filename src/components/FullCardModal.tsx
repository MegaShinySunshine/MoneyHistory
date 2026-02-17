import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { TimelineMilestone } from "@/data/timelineData";

interface FullCardModalProps {
  milestone: TimelineMilestone;
  onClose: () => void;
}

/**
 * Full-screen modal that shows detailed info about a timeline milestone.
 * Animates in with GSAP and closes on backdrop click or close button.
 */
export function FullCardModal({ milestone, onClose }: FullCardModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── Animate in on mount ── */
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );

    tl.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.4)" },
      "-=0.15"
    );

    return () => {
      tl.kill();
    };
  }, []);

  /* ── Animate out then call onClose ── */
  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(cardRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.25,
      ease: "power2.in",
    });

    tl.to(
      backdropRef.current,
      { opacity: 0, duration: 0.2, ease: "power2.in" },
      "-=0.1"
    );
  };

  /* ── Stop propagation so card clicks don't close ── */
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      style={{ opacity: 0 }}
    >
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
        style={{ opacity: 0 }}
      >
        {/* ── Close button ── */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40 cursor-pointer"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* ── Hero image ── */}
        <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
          <img
            src={milestone.imageUrl}
            alt={milestone.title}
            className="h-full w-full object-cover"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* year badge on image */}
          <div
            className="absolute bottom-4 left-6 rounded-full px-4 py-1.5 text-sm font-bold text-white"
            style={{ backgroundColor: milestone.color }}
          >
            {milestone.year}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-8">
          {/* icon + title */}
          <div className="mb-4 flex items-center gap-3">
            <span className="text-4xl">{milestone.icon}</span>
            <h2 className="text-2xl font-bold text-slate-900">
              {milestone.title}
            </h2>
          </div>

          {/* summary */}
          <p
            className="mb-4 text-lg font-medium"
            style={{ color: milestone.color }}
          >
            {milestone.summary}
          </p>

          {/* full description */}
          <p className="leading-relaxed text-slate-600">
            {milestone.description}
          </p>

          {/* decorative divider */}
          <div className="mt-6 flex items-center gap-2">
            <div
              className="h-1 w-12 rounded-full"
              style={{ backgroundColor: milestone.color }}
            />
            <div
              className="h-1 w-6 rounded-full opacity-50"
              style={{ backgroundColor: milestone.color }}
            />
            <div
              className="h-1 w-3 rounded-full opacity-25"
              style={{ backgroundColor: milestone.color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
