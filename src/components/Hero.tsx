import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hero section at the top of the page.
 * Animated heading that invites the user to scroll down.
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 }
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
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

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
    >
      {/* decorative background blobs */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -top-10 right-1/4 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />

      <h1
        ref={titleRef}
        className="mb-4 bg-gradient-to-r from-violet-600 via-blue-500 to-emerald-500 bg-clip-text text-5xl font-extrabold leading-tight text-transparent sm:text-6xl md:text-7xl"
        style={{ opacity: 0 }}
      >
        История денег
      </h1>

      <p
        ref={subtitleRef}
        className="max-w-xl text-lg text-slate-500 sm:text-xl"
        style={{ opacity: 0 }}
      >
        История того, как люди учились делать обмен проще и удобнее.
      </p>

      {/* scroll-down arrow */}
      <div ref={arrowRef} className="mt-12" style={{ opacity: 0 }}>
        <svg
          className="h-8 w-8 text-slate-400"
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
