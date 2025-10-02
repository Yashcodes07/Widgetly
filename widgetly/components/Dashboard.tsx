"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import WidgetCard from "@/components/WidgetCard";
import DateTimeWidget from "@/components/Date&Time";
import GithubWidget from "@/components/GithubWidget";
import WeatherWidget from "@/components/WeatherWidget";
import {
  FaGithub, FaStackOverflow,
  FaInstagram, FaTwitter, FaDiscord,
  FaYoutube, FaWhatsapp
} from "react-icons/fa";
import { SiVercel, SiNetflix } from "react-icons/si";

// Dummy language data
const languageData = [
  { name: "JavaScript", value: 40 },
  { name: "Python", value: 30 },
  { name: "CSS", value: 20 },
  { name: "Other", value: 10 },
];
const COLORS = ["#FACC15", "#3B82F6", "#10B981", "#EF4444"];

const wallpapers = [
  "/vid-4.mp4",
  "/vid-2.mp4",
  "/vid-3.mp4",
  "/vid-1.mp4",
  "/vid-5.mp4",
];

// StatsCard component to fetch GitHub stats dynamically
const StatsCard = ({ username }: { username: string }) => {
  const [stats, setStats] = useState({ public_repos: 0, followers: 0, stars: 0 });

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

        setStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          stars: totalStars,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      }
    };

    fetchGithubStats();
  }, [username]);

  return (
    <WidgetCard title="Stats" subtitle="Overview" className="min-h-[150px]">
      <div className="flex justify-around text-center">
        <div>
          <p className="text-2xl font-bold">{stats.public_repos}</p>
          <p className="text-sm text-white/70">Repositories</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.followers}</p>
          <p className="text-sm text-white/70">Followers</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.stars}</p>
          <p className="text-sm text-white/70">Stars</p>
        </div>
      </div>
    </WidgetCard>
  );
};

// Main Dashboard component
export default function Dashboard() {
  const [currentBg, setCurrentBg] = useState(wallpapers[0]);
  const [showChooser, setShowChooser] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        key={currentBg}
        src={currentBg}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Content */}
      <div className="relative z-10 p-6 text-white">

        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg mb-10">
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-6">
              <p className="hidden lg:block text-sm text-white/80 ">
                🚀 <span className="font-semibold text-xl">Yash Kumar</span> – Web Developer & Code Explorer.
                I turn data and ideas into interactive visuals.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowChooser(!showChooser)}
                className="px-4 py-2 border border-white/40 rounded-lg shadow-md text-sm bg-white/20 hover:bg-white/10 hover:shadow-lg transition"
              >
                {showChooser ? "Close Wallpaper Options" : "Switch Wallpaper"}
              </button>

              <div className="flex items-center gap-2">
                <img
                  src="/sideview .jpg"
                  alt="User"
                  className="h-15 w-15 rounded-full border border-white/30 shadow-sm"
                />
                <span className="font-medium text-white text-sm whitespace-nowrap mr-10">
                  Yash Kumar
                </span>
              </div>
            </div>
          </header>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-6">
            <WidgetCard title="Local Time" subtitle="Date & Time" className="min-h-[180px]">
              <DateTimeWidget />
            </WidgetCard>
            <WidgetCard title="Weather" subtitle="Ghaziabad, IN" className="min-h-[180px]">
              <WeatherWidget city="Ghaziabad" apiKey="231d53ec192e4ae140d08e6fb80d3bac" />
            </WidgetCard>
          </div>

          {/* Middle Column: GitHub */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-6">
            <h2 className="text-xl font-semibold mb-2">GitHub Profile</h2>

            <WidgetCard title="GitHub Profile" subtitle="Yashcodes07" className="min-h-[180px]">
              <GithubWidget username="Yashcodes07" />
            </WidgetCard>

            {/* Stats Card */}
            <StatsCard username="Yashcodes07" />

            {/* Language Usage Pie Chart */}
            {/* <WidgetCard title="Languages" subtitle="Repo Usage" className="min-h-[200px]">
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={60}
                      fill="#8884d8"
                      label
                    >
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </WidgetCard> */}
          </div>

          {/* Right Column: Links & Social */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-6">
            <WidgetCard title="Profiles" subtitle="Developer Links" className="min-h-[120px]">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between items-center">
                  <a href="https://github.com/Yashcodes07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    <FaGithub className="text-white/80" /> Github
                  </a>
                  <a href="https://github.com/Yashcodes07" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:underline">
                    github.com/Yashcodes07
                  </a>
                </li>
                <li className="flex justify-between items-center">
                  <a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    <FaStackOverflow className="text-orange-400" /> StackOverflow
                  </a>
                  <a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:underline">
                    stackoverflow.com
                  </a>
                </li>
                <li className="flex justify-between items-center">
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    <SiVercel className="text-white" /> Vercel
                  </a>
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:underline">
                    vercel.com
                  </a>
                </li>
              </ul>
            </WidgetCard>

            <WidgetCard title="Social" subtitle="Profiles" className="min-h-[120px]">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between items-center">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    <FaInstagram className="text-pink-400" /> Instagram
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:underline">
                    instagram.com
                  </a>
                </li>
                <li className="flex justify-between items-center">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    <FaTwitter className="text-sky-400" /> Twitter
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:underline">
                    x.com
                  </a>
                </li>
                <li className="flex justify-between items-center">
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    <FaDiscord className="text-indigo-400" /> Discord
                  </a>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:underline">
                    discord.com
                  </a>
                </li>
              </ul>
            </WidgetCard>

            <WidgetCard title="Entertainment" subtitle="Quick access" className="min-h-[120px]">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between items-center">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    <FaYoutube className="text-red-500" /> YouTube
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:underline">
                    youtube.com
                  </a>
                </li>
                <li className="flex justify-between items-center">
                  <a href="https://netflix.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    <SiNetflix className="text-red-600" /> Netflix
                  </a>
                  <a href="https://netflix.com" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:underline">
                    netflix.com
                  </a>
                </li>
                <li className="flex justify-between items-center">
                  <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    <FaWhatsapp className="text-green-400" /> WhatsApp
                  </a>
                  <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:underline">
                    whatsapp.com
                  </a>
                </li>
              </ul>
            </WidgetCard>

          </div>
        </div>
      </div>

      {/* Wallpaper Chooser */}
      {showChooser && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-white/20 p-3 rounded-lg z-20">
          {wallpapers.map((wallpaper, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBg(wallpaper)}
              className="w-20 h-12 rounded-lg overflow-hidden border-2 border-white hover:scale-105 transition relative"
            >
              <video
                src={wallpaper}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
