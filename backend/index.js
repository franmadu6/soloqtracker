import express from "express";
import cors from "cors";
import fs from "fs";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const RIOT_KEY = process.env.RIOT_API_KEY;
const DATA_FILE = "./players.json";

const tierOrder = {
  CHALLENGER: 9, GRANDMASTER: 8, MASTER: 7,
  DIAMOND: 6, PLATINUM: 5, GOLD: 4,
  SILVER: 3, BRONZE: 2, IRON: 1
};

async function fetchRanked(puuid, region) {
  const res = await axios.get(
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    { headers: { "X-Riot-Token": RIOT_KEY } }
  );
  return res.data.find(q => q.queueType === "RANKED_SOLO_5x5");
}

app.get("/leaderboard", async (req, res) => {
  const players = JSON.parse(fs.readFileSync(DATA_FILE));
  for (const p of players) {
    try {
      const ranked = await fetchRanked(p.puuid, p.region);
      if (!ranked) continue;
      Object.assign(p, {
        tier: ranked.tier,
        rank: ranked.rank,
        lp: ranked.leaguePoints,
        wins: ranked.wins,
        losses: ranked.losses,
        winrate: Math.round((ranked.wins / (ranked.wins + ranked.losses)) * 100)
      });
    } catch {}
  }
  players.sort((a, b) =>
    tierOrder[b.tier] - tierOrder[a.tier] ||
    b.lp - a.lp ||
    b.winrate - a.winrate
  );
  fs.writeFileSync(DATA_FILE, JSON.stringify(players, null, 2));
  res.json(players);
});

app.listen(3000);
