/**
 * Timeline milestone data.
 * Each item represents a point on the curved timeline path.
 */
export interface TimelineMilestone {
  id: number;
  year: string;
  title: string;
  summary: string;
  description: string;
  imageUrl: string;
  icon: string;
  color: string;
  /** Optional bullet points for card meta list (reference-style cards) */
  metaItems?: string[];
}

export const milestones: TimelineMilestone[] = [
  {
    id: 1,
    year: "2018",
    title: "The Spark of an Idea",
    summary: "A vision born from curiosity and passion.",
    description:
      "It all began with a simple question: what if we could build something truly meaningful? Late nights of brainstorming and sketching on whiteboards led to the birth of a concept that would change everything.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    icon: "💡",
    color: "#F59E0B",
    metaItems: ["Concept born from a single question", "Whiteboard sessions & late nights", "Founding team assembled"],
  },
  {
    id: 2,
    year: "2019",
    title: "Building the Foundation",
    summary: "First prototype and early adopters.",
    description:
      "With the vision crystallized, the team dove into development. The first prototype was rough around the edges but showed incredible promise. Early adopters provided invaluable feedback.",
    imageUrl: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=600&h=400&fit=crop",
    icon: "🏗️",
    color: "#3B82F6",
    metaItems: ["First prototype shipped", "Early adopters onboarded", "Partnerships forged"],
  },
  {
    id: 3,
    year: "2020",
    title: "Overcoming Challenges",
    summary: "Pivoting through uncertainty and adversity.",
    description:
      "The world changed overnight and so did we. Remote work became the norm, but the team's spirit never wavered. We pivoted our approach and discovered innovative solutions.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    icon: "⚡",
    color: "#EF4444",
    metaItems: ["Remote-first transition", "New tech stack adopted", "Resilience forged"],
  },
  {
    id: 4,
    year: "2021",
    title: "First Major Launch",
    summary: "Going public with version 1.0 release.",
    description:
      "After years of iteration, the product was ready for the world. The launch exceeded all expectations — thousands signed up in the first week. Version 1.0 was just the beginning.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    icon: "🚀",
    color: "#8B5CF6",
    metaItems: ["Version 1.0 released", "Thousands signed in week one", "Media & investor attention"],
  },
  {
    id: 5,
    year: "2022",
    title: "Scaling New Heights",
    summary: "Global expansion and team growth.",
    description:
      "With product-market fit validated, it was time to scale. The team grew from 10 to 50 across three continents. The user base expanded to over 100,000 active users.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    icon: "📈",
    color: "#10B981",
    metaItems: ["Team 10 → 50", "100k+ active users", "Strategic partnerships"],
  },
  {
    id: 6,
    year: "2023",
    title: "Industry Recognition",
    summary: "Awards, accolades, and community love.",
    description:
      "The hard work paid off. Industry awards lined the shelves, thought leaders praised the innovation, and a thriving community of advocates emerged.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    icon: "🏆",
    color: "#F97316",
    metaItems: ["Industry awards won", "Conference keynotes", "Community advocates grew"],
  },
  {
    id: 7,
    year: "2024",
    title: "AI Revolution",
    summary: "Integrating cutting-edge AI capabilities.",
    description:
      "Embracing the AI revolution, the team integrated machine learning and intelligent automation throughout the platform. The future arrived ahead of schedule.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    icon: "🤖",
    color: "#06B6D4",
    metaItems: ["ML pipeline live", "Smart recommendations", "NLP features shipped"],
  },
  {
    id: 8,
    year: "2025",
    title: "The Future Awaits",
    summary: "New horizons and unlimited possibilities.",
    description:
      "Standing at the frontier of innovation, the journey continues. With a world-class team and technology that pushes boundaries, the next chapter promises to be the most exciting yet.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    icon: "🌟",
    color: "#EC4899",
    metaItems: ["New horizons ahead", "Boundary-pushing tech", "Best yet to come"],
  },
];
