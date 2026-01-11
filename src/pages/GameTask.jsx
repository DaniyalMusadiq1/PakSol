import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Games from '../components/Games';

const Game = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  items-center px-4 py-6 min-h-screen bg-slate-950">
      {/* Back Button */}
      <div className="self-start mb-4">
        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold shadow-[0_0_15px_#00ffcc33] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-widest mb-4 text-center">
        Play Games & Earn Rewards
      </h1>

      {/* Subheading */}
      <p className="text-gray-400 text-sm md:text-base mb-6 text-center max-w-md">
        Select any game below to start earning coins and gems while having fun!
      </p>

      {/* Games Section */}
      <div className="w-full max-w-3xl">
        <Games />
      </div>
    </div>
  );
};

export default Game;
