// 1. Импортируем все картинки и аудио (Vite сам подставит правильные пути для Vercel)
import barterImg from "../images/barter.png";
import barterIcon from "../images/barter_iconImage.png";
import man4 from "../images/man_4.png";
import barterAudio from "../audio/barter.mp3";

import money2 from "../images/money_2.png";
import moneyItems from "../images/money_items.png";
import man3 from "../images/man_3.png";
import thingsAudio from "../audio/things.mp3";

import money3 from "../images/money_3.png";
import metalPieces from "../images/metal_pieces.png";
import metallAudio from "../audio/metall.mp3";

import money4 from "../images/money_4.png";
import coinIcon from "../images/coin.png";
import man2 from "../images/man_2.png";
import coinsAudio from "../audio/coins.mp3";

import money5 from "../images/money_5.png";
import easyMoneyIcon from "../images/easy_money.png";
import cashAudio from "../audio/cash.mp3";

import money6 from "../images/money_6.png";
import bankIcon from "../images/bank.png";
import bankAudio from "../audio/bank_obr.mp3";
import gymAudio from "../audio/gym_time_complete.mp3";

import belMoneyImg from "../images/bel_money.jpg";
import belMoneyIcon from "../images/bel_money_icon.png";
import depIcon from "../images/dep.png";
import belMoneyAudio from "../audio/bel_money.mp3";

import money7 from "../images/money_7.png";
import creditCardIcon from "../images/credit_card.png";
import man1 from "../images/man_1.png";
import computerAudio from "../audio/in_computer.mp3";

import cryptoImg from "../images/crypto.jpg";
import bitcoinIcon from "../images/bitcoin.png";
import criptoAudio from "../audio/cripto.mp3";

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
    imageIcon: barterIcon,
    imageUrl: barterImg,
    icon: "🤝",
    color: "#F59E0B",
    audioUrl: barterAudio,
    imageBeside: man4,
  },
  {
    id: 2,
    gameUrl: "https://learningapps.org/display?v=p49mdzdit26",
    imageIcon: moneyItems,
    imageUrl: money2,
    icon: "🐚",
    color: "#3B82F6",
    audioUrl: thingsAudio,
    imageBeside: man3,
  },
  {
    id: 3,
    gameUrl: "",
    imageIcon: metalPieces,
    imageUrl: money3,
    icon: "⚒️",
    color: "#EF4444",
    audioUrl: metallAudio,
    imageBeside: man4,
  },
  {
    id: 4,
    gameUrl: "https://learningapps.org/view48216354",
    imageIcon: coinIcon,
    imageUrl: money4,
    icon: "⚒️",
    color: "#8B5CF6",
    audioUrl: coinsAudio,
    imageBeside: man2,
  },
  {
    id: 5,
    gameUrl: "",
    imageIcon: easyMoneyIcon,
    imageUrl: money5,
    icon: "📜",
    color: "#10B981",
    audioUrl: cashAudio,
    imageBeside: man3,
  },
  {
    id: 6,
    gameUrl: gymAudio, // Это тоже импортированный файл теперь
    imageIcon: bankIcon,
    imageUrl: money6,
    icon: "🏛️",
    color: "#F97316",
    audioUrl: bankAudio,
    imageBeside: man3,
  },
  {
    id: 7,
    gameUrl: "https://learningapps.org/watch?v=p5xmn78pc26",
    imageIcon: belMoneyIcon,
    imageUrl: belMoneyImg,
    icon: "🦬",
    color: "#54d806",
    audioUrl: belMoneyAudio,
    imageBeside: depIcon,
  },
  {
    id: 8,
    gameUrl: "https://learningapps.org/view48016199",
    imageIcon: creditCardIcon,
    imageUrl: money7,
    icon: "💳",
    color: "#06B6D4",
    audioUrl: computerAudio,
    imageBeside: man1,
  },
  {
    id: 9,
    gameUrl: "https://learningapps.org/display?v=pr3mkx0d326",
    imageIcon: bitcoinIcon,
    imageUrl: cryptoImg,
    icon: "🌐",
    color: "#EC4899",
    audioUrl: criptoAudio,
    imageBeside: man4,
  },
];