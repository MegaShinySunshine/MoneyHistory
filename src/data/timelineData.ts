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
}

export const milestones: TimelineMilestone[] = [
  {
    id: 1,
    year: "2018",
    title: "The Spark of an Idea",
    summary: "A vision born from curiosity and passion.",
    description:
      "It all began with a simple question: what if we could build something truly meaningful? Late nights of brainstorming and sketching on whiteboards led to the birth of a concept that would change everything. The founding team gathered in a small garage, fueled by coffee and ambition.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    icon: "💡",
    color: "#F59E0B",
  },
  {
    id: 2,
    year: "2019",
    title: "Building the Foundation",
    summary: "First prototype and early adopters.",
    description:
      "With the vision crystallized, the team dove into development. The first prototype was rough around the edges but showed incredible promise. Early adopters provided invaluable feedback that shaped the product's direction. Partnerships were forged and the foundation was laid for growth.",
    imageUrl: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=600&h=400&fit=crop",
    icon: "🏗️",
    color: "#3B82F6",
  },
  {
    id: 3,
    year: "2020",
    title: "Overcoming Challenges",
    summary: "Pivoting through uncertainty and adversity.",
    description:
      "The world changed overnight and so did we. Remote work became the norm, but the team's spirit never wavered. We pivoted our approach, embraced new technologies, and discovered innovative solutions to problems we never anticipated. This period forged resilience into our DNA.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    icon: "⚡",
    color: "#EF4444",
  },
  {
    id: 4,
    year: "2021",
    title: "First Major Launch",
    summary: "Going public with version 1.0 release.",
    description:
      "After years of iteration, the product was ready for the world. The launch exceeded all expectations — thousands signed up in the first week. Media coverage poured in, investors took notice, and the team celebrated a milestone that once seemed impossible. Version 1.0 was just the beginning.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    icon: "🚀",
    color: "#8B5CF6",
  },
  {
    id: 5,
    year: "2022",
    title: "Scaling New Heights",
    summary: "Global expansion and team growth.",
    description:
      "With product-market fit validated, it was time to scale. The team grew from 10 to 50 passionate individuals across three continents. New features were shipped weekly, and the user base expanded to over 100,000 active users. Strategic partnerships opened doors to new markets.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    icon: "📈",
    color: "#10B981",
  },
  {
    id: 6,
    year: "2023",
    title: "Industry Recognition",
    summary: "Awards, accolades, and community love.",
    description:
      "The hard work paid off. Industry awards lined the shelves, thought leaders praised the innovation, and a thriving community of advocates emerged. Speaking engagements at major conferences showcased the journey and inspired others to pursue their own visions.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    icon: "🏆",
    color: "#F97316",
  },
  {
    id: 7,
    year: "2024",
    title: "AI Revolution",
    summary: "Integrating cutting-edge AI capabilities.",
    description:
      "Embracing the AI revolution, the team integrated machine learning and intelligent automation throughout the platform. Smart recommendations, predictive analytics, and natural language processing transformed the user experience. The future arrived ahead of schedule.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    icon: "🤖",
    color: "#06B6D4",
  },
  {
    id: 8,
    year: "2025",
    title: "The Future Awaits",
    summary: "New horizons and unlimited possibilities.",
    description:
      "Standing at the frontier of innovation, the journey continues. With a world-class team, a passionate community, and technology that pushes boundaries, the next chapter promises to be the most exciting yet. The best is always yet to come.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    icon: "🌟",
    color: "#EC4899",
  },
];
