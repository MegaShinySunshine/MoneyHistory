import { useEffect, useRef, useState, useCallback } from "react";
import { milestones } from "@/data/timelineData";
import { TimelineCard } from "./TimelineCard";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

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
  const amplitude = width * 0.26;
  const points: { x: number; y: number }[] = [];
  let d = `M ${centerX} 40`;

  for (let i = 0; i < count; i++) {
    const goRight = i % 2 === 0;
    const sign = goRight ? 1 : -1;
    const outerX = centerX + sign * amplitude;
    const yStart = 40 + i * segmentHeight;
    const yEnd = 40 + (i + 1) * segmentHeight;
    const yMid = (yStart + yEnd) / 2;

    const cp1x1 = centerX;
    const cp1y1 = yStart + segmentHeight * 0.25;
    const cp2x1 = outerX;
    const cp2y1 = yMid - segmentHeight * 0.25;
    d += ` C ${cp1x1} ${cp1y1}, ${cp2x1} ${cp2y1}, ${outerX} ${yMid}`;

    const cp1x2 = outerX;
    const cp1y2 = yMid + segmentHeight * 0.25;
    const cp2x2 = centerX;
    const cp2y2 = yEnd - segmentHeight * 0.25;
    d += ` C ${cp1x2} ${cp1y2}, ${cp2x2} ${cp2y2}, ${centerX} ${yEnd}`;

    points.push({ x: outerX, y: yMid });
  }
  return { pathD: d, points };
}

export function CurvedTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tracePathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const tracerRef = useRef<SVGCircleElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

  const expandCard = useCallback((index: number) => {
    setExpandedCardIndex(index);
  }, []);

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node | null;
      if (!target) return;
      const clickedInsideAnyCard = cardRefs.current.some((el) => el && el.contains(target));
      if (!clickedInsideAnyCard) setExpandedCardIndex(null);
    }
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, []);

  const CONTAINER_WIDTH = 1000;
  const SEGMENT_HEIGHT = 720;
  const TOTAL_HEIGHT = milestones.length * SEGMENT_HEIGHT + 120;

  const { pathD, points } = buildCurvePath(milestones.length, CONTAINER_WIDTH, SEGMENT_HEIGHT);

  useEffect(() => {
    ScrollTrigger.refresh();
    const ctx = gsap.context(() => {
      const tracePath = tracePathRef.current;
      const tracer = tracerRef.current;
      if (!tracePath || !tracer) return;

      const totalLen = tracePath.getTotalLength();
      gsap.set(tracePath, { strokeDasharray: totalLen, strokeDashoffset: totalLen });
      gsap.set(tracer, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1.5,
          onEnter: () => gsap.to(tracer, { opacity: 1, duration: 0.3 }),
          onLeaveBack: () => gsap.to(tracer, { opacity: 0, duration: 0.3 }),
        },
      });

      tl.to(tracePath, { strokeDashoffset: 0, ease: "none" }, 0);
      tl.to(tracer, {
        motionPath: { path: tracePath, align: tracePath, alignOrigin: [0.5, 0.5] },
        ease: "none",
      }, 0);

      milestones.forEach((_, i) => {
        const dot = dotRefs.current[i];
        const card = cardRefs.current[i];
        // Target the floating image container
        const imageContainer = card?.parentElement?.querySelector('.floating-image');

        if (!dot || !card) return;

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

        if (imageContainer) {
          gsap.fromTo(imageContainer,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                }
              }
          );
        }
      });
    }, containerRef);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    }
  }, [milestones.length, TOTAL_HEIGHT]);

  return (
      <>
        <div
            ref={containerRef}
            className="relative mx-auto w-full px-4"
            style={{ maxWidth: CONTAINER_WIDTH, height: TOTAL_HEIGHT }}
        >
          <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${CONTAINER_WIDTH} ${TOTAL_HEIGHT}`}
              preserveAspectRatio="xMidYMin meet"
              fill="none"
              aria-hidden="true"
          >
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2={TOTAL_HEIGHT} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>

            <path d={pathD} stroke="#e2e8f0" strokeWidth={2} fill="none" strokeDasharray="8 6" />
            <path ref={tracePathRef} d={pathD} stroke="url(#curveGradient)" strokeWidth={5} fill="none" />

            {points.map((pt, i) => (
                <g key={`dot-${milestones[i].id}`} style={{ cursor: "pointer" }} onClick={() => expandCard(i)}>
                  <circle cx={pt.x} cy={pt.y} r={22} fill="transparent" />
                  <circle cx={pt.x} cy={pt.y} r={9} ref={(el) => { dotRefs.current[i] = el; }} fill={milestones[i].color} stroke="white" strokeWidth={3} />
                </g>
            ))}

            <circle ref={tracerRef} r={12} fill="#FFFFFF" stroke="#3B82F6" strokeWidth={4} style={{ visibility: "hidden" }} />
          </svg>

          {points.map((pt, i) => {
            const isLeft = i % 2 === 0;
            const milestone = milestones[i];
            const leftPercent = (pt.x / CONTAINER_WIDTH) * 100;
            const topPercent = (pt.y / TOTAL_HEIGHT) * 100;

            return (
                <div key={`milestone-group-${milestone.id}`}>
                  <div
                      ref={setCardRef(i)}
                      className="absolute"
                      style={{
                        left: `${leftPercent}%`,
                        top: `${topPercent}%`,
                        transform: `translate(${isLeft ? "-105%" : "5%"}, -50%)`,
                        zIndex: expandedCardIndex === i ? 50 : 1,
                        width: "480px",
                      }}
                  >
                    <TimelineCard
                        milestone={milestone}
                        side={isLeft ? "left" : "right"}
                        reveal={false}
                        showDot={false}
                        expanded={expandedCardIndex === i}
                        onClick={() => expandCard(i)}
                    />
                  </div>

                  {/* 2. THE FLOATING ILLUSTRATION (Opposite Side) */}
                  <div
                      className="floating-image absolute hidden lg:flex items-center justify-center pointer-events-none"
                      style={{
                        left: `${leftPercent}%`,
                        top: `${topPercent}%`,
                        // Increased size: 500px makes it significantly bigger than the previous 320px
                        width: "700px",
                        height: "700px",
                        // Adjusted translate to prevent it from overlapping the dot too much
                        transform: `translate(${isLeft ? "10%" : "-110%"}, -50%)`,
                        zIndex: 5,
                      }}
                  >
                    <img
                        src={milestone.imageBeside}
                        // object-contain is key for frameless illustrations
                        className="max-w-full max-h-full object-contain filter drop-shadow-2xl transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
            );
          })}
        </div>
      </>
  );
}