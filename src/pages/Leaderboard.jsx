import React from 'react';
import { Trophy, Search, Menu, Crown, Star, Sparkles, Award } from 'lucide-react';

const Leaderboard = () => {
  // Generate 100 sample users
  const generateUsers = () => {
    const names = [
      'Courtney Henry', 'Eleanor Pena', 'Arlene McCoy', 'Albert Flores', 
      'Bessie Cooper', 'Wilson Best', 'Leslie Alexander', 'Brooklyn Simmons',
      'Savannah Nguyen', 'Jerome Bell', 'Kristin Watson', 'Guy Hawkins',
      'Cameron Williamson', 'Esther Howard', 'Jenny Wilson', 'Darrell Steward'
    ];
    
    const avatarColors = [
      'from-amber-400 via-yellow-500 to-orange-500',
      'from-pink-400 via-rose-500 to-purple-600',
      'from-emerald-400 via-green-500 to-teal-600',
      'from-violet-400 via-purple-500 to-indigo-600',
      'from-sky-400 via-blue-500 to-indigo-600',
      'from-rose-400 via-pink-500 to-fuchsia-600',
      'from-orange-400 via-amber-500 to-yellow-600',
      'from-cyan-400 via-teal-500 to-emerald-600'
    ];
    
    return Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length],
      score: 170000 - (i * 500) + Math.floor(Math.random() * 500),
      gradient: avatarColors[i % avatarColors.length],
      initial: names[i % names.length].charAt(0)
    }));
  };

  const users = generateUsers();
  const topThree = users.slice(0, 3);
  const restUsers = users.slice(3);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white w-full max-w-md mx-auto relative overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-15" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-screen filter blur-3xl opacity-20" style={{animation: 'pulse 6s ease-in-out infinite'}}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-amber-600 rounded-full mix-blend-screen filter blur-3xl opacity-10" style={{animation: 'pulse 5s ease-in-out infinite'}}></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }}></div>
      
      <div className="relative z-10 ">
       

        {/* Premium Top 3 Podium */}
        <div className="">
          {/* Spotlight effect */}
          <div className=" top-0 left-1/2 transform -translate-x-1/2 w-64 h-20 bg-amber-500 rounded-full filter blur-3xl opacity-10"></div>
          
          <div className="flex items-end justify-center gap-4 relative">
            {/* 2nd Place */}
            <div className="flex flex-col items-center transform hover:scale-110 transition-all duration-500 cursor-pointer group">
              <div className="relative mb-4">
                <Star className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 text-slate-400 animate-pulse" style={{animationDelay: '0.5s'}} />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${topThree[1].gradient} flex items-center justify-center text-white font-black text-2xl shadow-2xl border-[3px] border-slate-300 ring-4 ring-slate-700/50`}>
                  {topThree[1].initial}
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 rounded-xl flex items-center justify-center text-slate-900 font-black text-base shadow-xl rotate-3 border-2 border-slate-200">
                  2
                </div>
              </div>
              <p className="text-xs font-bold text-center text-slate-300">{topThree[1].name.split(' ')[0]}</p>
              <p className="text-xs font-bold text-center text-slate-400">{topThree[1].name.split(' ')[1]}</p>
              <div className="mt-2 px-3 py-1 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                <p className="text-xs font-bold text-amber-400">{topThree[1].score.toLocaleString()}</p>
              </div>
            </div>

            {/* 1st Place - King of the Hill */}
            <div className="flex flex-col items-center transform hover:scale-110 transition-all duration-500 cursor-pointer -mt-8 group">
              <div className="relative mb-2">
                <Crown className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 text-amber-400 drop-shadow-lg" style={{
                  animation: 'bounce 2s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))'
                }} />
                <Sparkles className="absolute -top-6 -left-6 w-5 h-5 text-yellow-300 animate-pulse" />
                <Sparkles className="absolute -top-6 -right-6 w-5 h-5 text-yellow-300 animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-full blur-2xl opacity-80 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                <div className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${topThree[0].gradient} flex items-center justify-center text-white font-black text-4xl shadow-2xl border-[4px] border-amber-400 ring-8 ring-amber-500/30`}>
                  {topThree[0].initial}
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-slate-900 font-black text-xl shadow-2xl -rotate-3 border-2 border-amber-300">
                  1
                </div>
                <Award className="absolute -right-3 top-0 w-8 h-8 text-amber-400 animate-spin" style={{animationDuration: '10s'}} />
              </div>
              <p className="text-sm font-black text-center bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">{topThree[0].name.split(' ')[0]}</p>
              <p className="text-sm font-black text-center bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">{topThree[0].name.split(' ')[1]}</p>
              <div className="mt-3 px-4 py-1.5 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-amber-500/50 shadow-lg">
                <p className="text-sm font-black bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">{topThree[0].score.toLocaleString()}</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center transform hover:scale-110 transition-all duration-500 cursor-pointer group">
              <div className="relative mb-4">
                <Star className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-5 h-5 text-orange-400 animate-pulse" style={{animationDelay: '1s'}} />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-600 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${topThree[2].gradient} flex items-center justify-center text-white font-black text-2xl shadow-2xl border-[3px] border-orange-400 ring-4 ring-orange-700/50`}>
                  {topThree[2].initial}
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-orange-400 via-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-slate-900 font-black text-base shadow-xl -rotate-3 border-2 border-orange-300">
                  3
                </div>
              </div>
              <p className="text-xs font-bold text-center text-slate-300">{topThree[2].name.split(' ')[0]}</p>
              <p className="text-xs font-bold text-center text-slate-400">{topThree[2].name.split(' ')[1]}</p>
              <div className="mt-2 px-3 py-1 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                <p className="text-xs font-bold text-amber-400">{topThree[2].score.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Scrollable List */}
        <div className="overflow-y-auto overflow-x-hidden h-96 px-4 pb-6 mt-4" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(148, 163, 184, 0.3) transparent'
        }}>
          {restUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-4 p-4 mb-2.5 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${
                user.id === 6 
                  ? 'bg-gradient-to-r from-emerald-500/90 via-green-500/90 to-teal-500/90 shadow-xl shadow-emerald-500/30 border border-emerald-400/50' 
                  : 'bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/30 hover:border-slate-600/50'
              }`}
            >
              <div className={`text-lg font-black w-8 text-center ${
                user.id === 6 ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
              }`}>
                {user.id}
              </div>
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${user.gradient} rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${user.gradient} flex items-center justify-center text-white font-black text-lg shadow-xl border-2 ${
                  user.id === 6 ? 'border-white/40' : 'border-white/20'
                }`}>
                  {user.initial}
                </div>
              </div>
              <span className={`flex-1 font-bold text-base ${user.id === 6 ? 'text-white' : 'text-slate-200'}`}>
                {user.name}
              </span>
              <span className={`font-black text-base tabular-nums ${
                user.id === 6 ? 'text-white' : 'text-slate-300'
              }`}>
                {user.score.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;