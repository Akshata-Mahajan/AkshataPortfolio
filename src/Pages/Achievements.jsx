import React from "react";
import { Award, Trophy } from "lucide-react";

const achievements = [
  {
    title: "SheSolve Hackathon Winner 2024",
    description:
      "Secured 1st place at national-level all-women hackathon by JP Morgan & ACM-W India. Recognized for innovation and impactful tech-driven problem solving.",
    badge: "National",
    icon: <Trophy className="w-8 h-8 text-yellow-400" />,
    image: "She-Solve.jpg",
  },
  {
    title: "ACM India Best Student Chapter Award 2025",
    description:
      "Honored by ACM India for outstanding leadership, collaboration, and impactful initiatives as PR Head of PCCOE's ACM Student Chapter.",
    badge: "Leadership",
    icon: <Award className="w-8 h-8 text-purple-400" />,
    image: "acm-best-chapter.jpg",
  },
];

const AchievementCard = ({ achievement }) => (
  <div className="rounded-2xl min-h-[440px] bg-[#0f0f1c] border border-white/10 p-5 shadow-md transition-all hover:shadow-xl hover:scale-[1.02] hover:border-white/20 duration-300 flex flex-col">
    <div className="relative">
      <img
        src={achievement.image}
        alt={achievement.title}
        className="rounded-xl w-full h-[220px] object-cover object-top"
      />
      <span className="absolute top-2 left-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-xs font-semibold px-3 py-1 rounded-full text-white shadow">
        {achievement.badge}
      </span>
    </div>
    <div className="mt-4 flex-grow flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {achievement.icon}
          <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
        </div>
        <p className="text-sm text-slate-400">{achievement.description}</p>
      </div>
    </div>
  </div>
);

export default function Achievements() {
  return (
    <section
      id="Achievements"
      className="w-full bg-[#030014] py-[5%] px-[5%] sm:px-[5%] lg:px-[10%]"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Achievements & Recognition
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
          Celebrating the milestones that shaped my tech journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} />
        ))}
      </div>
    </section>
  );
}
