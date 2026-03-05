/**
 * Timeline milestone data.
 * Each item represents a point on the curved timeline path.
 */
export interface TimelineMilestone {
  id: number;
  gameUrl: string;
  imageIcon: string;
  imageUrl: string;
  icon: string;
  color: string;
  audioUrl?: string;
  imageBeside?: string;
}

export const milestones: TimelineMilestone[] = [
  {
    id: 1,
    gameUrl: "",
    imageIcon: "src/images/barter_iconImage.png",
    imageUrl: "src/images/barter.png",
    icon: "🤝",
    color: "#F59E0B",
    audioUrl: "src/audio/barter.mp3",
    imageBeside: "src/images/man_4.png",
  },
  {
    id: 2,
    gameUrl: "https://learningapps.org/display?v=p49mdzdit26",
    imageIcon: "src/images/money_items.png",
    imageUrl: "src/images/money_2.png",
    icon: "🐚",
    color: "#3B82F6",
    audioUrl: "src/audio/things.mp3",
    imageBeside: "src/images/man_3.png",
  },
  {
    id: 3,
    gameUrl: "",
    imageIcon: "src/images/metal_pieces.png",
    imageUrl: "src/images/money_3.png",
    icon: "⚒️",
    color: "#EF4444",
    audioUrl: "src/audio/metall.mp3",
    imageBeside: "src/images/man_4.png",
  },
  {
    id: 4,
    gameUrl: "https://learningapps.org/view48216354",
    imageIcon: "src/images/coin.png",
    imageUrl: "src/images/money_4.png",
    icon: "⚒️",
    color: "#8B5CF6",
    audioUrl: "src/audio/coins.mp3",
    imageBeside: "src/images/man_2.png",
  },
  {
    id: 5,
    gameUrl: "",
    imageIcon: "src/images/easy_money.png",
    imageUrl: "src/images/money_5.png",
    icon: "📜",
    color: "#10B981",
    audioUrl: "src/audio/cash.mp3",
    imageBeside: "src/images/man_3.png",
  },
  {
    id: 6,
    gameUrl: "src/audio/gym_time_complete.mp3",
    imageIcon: "src/images/bank.png",
    imageUrl: "src/images/money_6.png",
    icon: "🏛️",
    color: "#F97316",
    audioUrl: "src/audio/банк обр.mp3",
    imageBeside: "src/images/man_3.png",
  },
  {
    id: 7,
    gameUrl: "https://learningapps.org/watch?v=p5xmn78pc26",
    imageIcon: "src/images/bel_money_icon.png",
    imageUrl: "src/images/bel_money.jpg",
    icon: "🦬",
    color: "#54d806",
    audioUrl: "src/audio/bel_money.mp3",
    imageBeside: "src/images/dep.png",
  },
  { //credit_card
    id: 8,
    gameUrl: "https://learningapps.org/view48016199",
    imageIcon: "src/images/credit_card.png",
    imageUrl: "src/images/money_7.png",
    icon: "💳",
    color: "#06B6D4",
    audioUrl: "src/audio/in_computer.mp3",
    imageBeside: "src/images/man_1.png",
  },
  { //crypto
    id: 9,
    gameUrl: "https://learningapps.org/display?v=pr3mkx0d326",
    imageIcon: "src/images/bitcoin.png",
    imageUrl: "src/images/crypto.jpg",
    icon: "🌐",
    color: "#EC4899",
    audioUrl: "src/audio/cripto.mp3",
    imageBeside: "src/images/man_4.png",
  },
];
