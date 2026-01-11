import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";

import {Mine} from "../pages/Mine";
import {Shop} from "../pages/Shop";
import {Friends} from "../pages/Friends";
import {Tasks} from "../pages/Tasks";
import {Wallet} from "../pages/Wallet";
import {Profile} from "../pages/Profile";
import Challenges from "../pages/Challenges";
import Achievements from "../pages/Achievements";
import Leaderboard from "../pages/Leaderboard";
import Upgrade from "../pages/Upgrade";
import SocialTask from "../pages/SocialTask";
import GameTask from "../pages/GameTask";
import DailyReward from "../pages/DailyReward";
import AdsTask from "../pages/AdsTask";

export const UserStack = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Mine />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/challenges" element={< Challenges/>} />
        <Route path="/achivements" element={<Achievements />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/upgrades" element={<Upgrade />} />
        <Route path="/social-task" element={<SocialTask />} />
        <Route path="/game-task" element={<GameTask/>} />
        <Route path="/Ads-task" element={<AdsTask/>} />
        <Route path="/DailyReward-task" element={<DailyReward/>} />
      </Route>
    </Routes>
  );
};
