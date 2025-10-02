"use client";

import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
}

interface ContributionData {
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
}

export default function GithubWidget({ username, apiKey }: { username: string; apiKey: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState<ContributionData | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=4`
        );
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.error("Error fetching repos:", err);
      }
    }

    async function fetchContributions() {
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);

      const query = `
        query {
          user(login: "${username}") {
            contributionsCollection(from: "${lastMonth.toISOString()}", to: "${today.toISOString()}") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                  }
                }
              }
              contributionYears
              contributionCalendarStreak {
                longestStreak
                currentStreak
              }
            }
          }
        }
      `;

      try {
        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        const calendar = data.data.user.contributionsCollection.contributionCalendar;

        const weeks = calendar.weeks;
        let totalContributions = 0;
        weeks.forEach((week: any) => {
          week.contributionDays.forEach((day: any) => {
            totalContributions += day.contributionCount;
          });
        });

        const longestStreak = data.data.user.contributionsCollection.contributionCalendarStreak.longestStreak;
        const currentStreak = data.data.user.contributionsCollection.contributionCalendarStreak.currentStreak;

        setContributions({ totalContributions, longestStreak, currentStreak });
      } catch (err) {
        console.error("Error fetching contributions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
    fetchContributions();
  }, [username, apiKey]);

  return (
    <div className="w-full">
      {/* Username */}
      <h3 className="text-lg font-bold mb-2 text-center">{username}</h3>
      <p className="text-sm mb-2 text-center">Recent Repos</p>

      {/* Loading */}
      {loading && <p className="text-sm text-gray-300 text-center">Loading...</p>}

      {/* Repo List */}
      <ul className="space-y-2 mb-4">
        {repos.map((repo) => (
          <li key={repo.id}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md transition"
            >
              {repo.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Contribution Metrics */}
      {contributions && (
        <div className="text-center mt-2 text-sm">
          <p>Total contributions last month: <span className="font-semibold">{contributions.totalContributions}</span></p>
          <p>Longest streak: <span className="font-semibold">{contributions.longestStreak}</span> days</p>
          <p>Current streak: <span className="font-semibold">{contributions.currentStreak}</span> days</p>
        </div>
      )}
    </div>
  );
}
