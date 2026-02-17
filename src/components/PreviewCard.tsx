import type { TimelineMilestone } from "@/data/timelineData";

interface PreviewCardProps {
  milestone: TimelineMilestone;
  index: number;
  onClick: () => void;
}

/**
 * Small preview card placed at each milestone on the curved timeline.
 * Displays icon, year, title, and a short summary.
 * Clicking it opens the full detail modal.
 */
export function PreviewCard({ milestone, onClick }: PreviewCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex w-60 cursor-pointer flex-col rounded-2xl border border-slate-100 bg-white/95 p-5 text-left shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderTopColor: milestone.color,
        borderTopWidth: "3px",
      }}
    >
      {/* ── Year badge ── */}
      <span
        className="mb-2 inline-block w-fit rounded-full px-3 py-0.5 text-xs font-bold text-white"
        style={{ backgroundColor: milestone.color }}
      >
        {milestone.year}
      </span>

      {/* ── Icon + title ── */}
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-2xl leading-none">{milestone.icon}</span>
        <h3 className="text-sm font-bold text-slate-800 leading-snug">
          {milestone.title}
        </h3>
      </div>

      {/* ── Summary ── */}
      <p className="text-xs leading-relaxed text-slate-500 line-clamp-2">
        {milestone.summary}
      </p>

      {/* ── "Read more" link ── */}
      <span
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold transition-colors"
        style={{ color: milestone.color }}
      >
        Read more
        <svg
          className="h-3 w-3 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>

      {/* ── Connecting line from card to dot ── */}
      {/* This subtle line visually ties the card to its dot */}
    </button>
  );
}
