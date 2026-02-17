import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milestones } from "@/data/timelineData";
import { PreviewCard } from "./PreviewCard";
import { FullCardModal } from "./FullCardModal";
import type { TimelineMilestone } from "@/data/timelineData";

/* Register GSAP plugins */
gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Helper: generate a smooth S-curve SVG path
   that snakes down the page, along with the
   milestone point coordinates.
   ───────────────────────────────────────────── */
interface PathData {
  pathD: string;
  points: { x: number; y: number }[];
}

function buildCurvePath(
    count: number,
    width: number,
    segmentHeight: number
): PathData {
  const centerX = width / 2;
  // How far the curve swings left/right from center.
  // Slightly reduced so the curve feels softer and less zig‑zaggy.
  const amplitude = width * 0.26;

  const points: { x: number; y: number }[] = [];

  // Start from center-top
  let d = `M ${centerX} 40`;

  for (let i = 0; i < count; i++) {
    const goRight = i % 2 === 0;
    const sign = goRight ? 1 : -1;
    const outerX = centerX + sign * amplitude;

    const yStart = 40 + i * segmentHeight;
    const yEnd = 40 + (i + 1) * segmentHeight;
    const yMid = (yStart + yEnd) / 2;

    // We build each segment as TWO cubic curves:
    // 1) from center to the outer "peak"
    // 2) from the peak back to center
    // This gives a more sinus‑like, flowing shape.

    // First half: center -> outer peak
    const cp1x1 = centerX;
    const cp1y1 = yStart + segmentHeight * 0.25;
    const cp2x1 = outerX;
    const cp2y1 = yMid - segmentHeight * 0.25;

    d += ` C ${cp1x1} ${cp1y1}, ${cp2x1} ${cp2y1}, ${outerX} ${yMid}`;

    // Second half: outer peak -> center
    const cp1x2 = outerX;
    const cp1y2 = yMid + segmentHeight * 0.25;
    const cp2x2 = centerX;
    const cp2y2 = yEnd - segmentHeight * 0.25;

    d += ` C ${cp1x2} ${cp1y2}, ${cp2x2} ${cp2y2}, ${centerX} ${yEnd}`;

    // The milestone sits at the outermost point of the curve
    points.push({ x: outerX, y: yMid });
  }

  return { pathD: d, points };
}

/* ─────────────────────────────────────────────
   CurvedTimeline component
   ───────────────────────────────────────────── */
export function CurvedTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedMilestone, setSelectedMilestone] =
      useState<TimelineMilestone | null>(null);

  /* Ref setter factory for cards */
  const setCardRef = useCallback(
      (index: number) => (el: HTMLDivElement | null) => {
        cardRefs.current[index] = el;
      },
      []
  );

  /* ── Layout constants ── */
  const CONTAINER_WIDTH = 1000; // px (max-width)
  const SEGMENT_HEIGHT = 520;
  const TOTAL_HEIGHT = milestones.length * SEGMENT_HEIGHT + 120;

  /* ── Build the curved path ── */
  const { pathD, points } = buildCurvePath(
      milestones.length,
      CONTAINER_WIDTH,
      SEGMENT_HEIGHT
  );

  /* ── GSAP scroll-driven animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const glowPath = glowPathRef.current;
      if (!path || !glowPath) return;

      // ---------- 1. Draw the path on scroll ----------
      const len = path.getTotalLength();

      gsap.set([path, glowPath], {
        strokeDasharray: len,
        strokeDashoffset: len,
      });

      gsap.to([path, glowPath], {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1.5,
        },
      });

      // ---------- 2. Reveal dots & cards per milestone ----------
      milestones.forEach((_, i) => {
        const dot = dotRefs.current[i];
        const card = cardRefs.current[i];
        if (!dot || !card) return;

        const isLeft = i % 2 === 0;

        // Dot scales in
        gsap.set(dot, { scale: 0, transformOrigin: "center center" });
        gsap.to(dot, {
          scale: 1,
          duration: 0.5,
          ease: "back.out(3)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Card slides & fades in from the side
        gsap.set(card, { opacity: 0, x: isLeft ? -80 : 80, scale: 0.9 });
        gsap.to(card, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
      <>
        <div
            ref={containerRef}
            className="relative mx-auto w-full px-4"
            style={{ maxWidth: CONTAINER_WIDTH, height: TOTAL_HEIGHT }}
        >
          {/* ════════════════════════════════════
            SVG layer — curved path + dots
           ════════════════════════════════════ */}
          <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${CONTAINER_WIDTH} ${TOTAL_HEIGHT}`}
              preserveAspectRatio="xMidYMin meet"
              fill="none"
              aria-hidden="true"
          >
            {/* Gradient definition */}
            <defs>
              <linearGradient
                  id="curveGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={TOTAL_HEIGHT}
                  gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="14%" stopColor="#3B82F6" />
                <stop offset="28%" stopColor="#EF4444" />
                <stop offset="42%" stopColor="#8B5CF6" />
                <stop offset="57%" stopColor="#10B981" />
                <stop offset="71%" stopColor="#F97316" />
                <stop offset="85%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="pathGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Faint guide line (always visible) */}
            <path
                d={pathD}
                stroke="#e2e8f0"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                strokeDasharray="12 8"
            />

            {/* 2. Glow layer (animated) */}
            <path
                ref={glowPathRef}
                d={pathD}
                stroke="url(#curveGradient)"
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
                filter="url(#pathGlow)"
                opacity={0.35}
            />

            {/* 3. Main animated path */}
            <path
                ref={pathRef}
                d={pathD}
                stroke="url(#curveGradient)"
                strokeWidth={4}
                strokeLinecap="round"
                fill="none"
            />

            {/* 4. Milestone dots */}
            {points.map((pt, i) => (
                <g key={`dot-${milestones[i].id}`}>
                  {/* Soft outer ring */}
                  <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={22}
                      fill={milestones[i].color}
                      opacity={0.12}
                  />
                  <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={15}
                      fill={milestones[i].color}
                      opacity={0.2}
                  />
                  {/* Main dot (animated via ref) */}
                  <circle
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      cx={pt.x}
                      cy={pt.y}
                      r={9}
                      fill={milestones[i].color}
                      stroke="white"
                      strokeWidth={3}
                  />
                </g>
            ))}
          </svg>

          {/* ════════════════════════════════════
            HTML layer — preview cards
           ════════════════════════════════════ */}
          {points.map((pt, i) => {
            const isLeft = i % 2 === 0;

            /*
             * Position each card wrapper at the dot's coordinates.
             * Use percentages so it scales with the container.
             * The PreviewCard itself offsets left or right.
             */
            const leftPercent = (pt.x / CONTAINER_WIDTH) * 100;
            const topPercent = (pt.y / TOTAL_HEIGHT) * 100;

            return (
                <div
                    key={`card-${milestones[i].id}`}
                    ref={setCardRef(i)}
                    className="absolute"
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      transform: `translate(${isLeft ? "-105%" : "5%"}, -50%)`,
                    }}
                >
                  <PreviewCard
                      milestone={milestones[i]}
                      index={i}
                      onClick={() => setSelectedMilestone(milestones[i])}
                  />
                </div>
            );
          })}
        </div>

        {/* ════════════════════════════════════
          Full-card modal overlay
         ════════════════════════════════════ */}
        {selectedMilestone && (
            <FullCardModal
                milestone={selectedMilestone}
                onClose={() => setSelectedMilestone(null)}
            />
        )}
      </>
  );
}
