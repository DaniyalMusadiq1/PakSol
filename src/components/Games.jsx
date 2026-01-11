import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  const games = [
    {
      id: 1,
      name: "Astro Runner",
      image: "game1.jpg",
      path: "",
    },
    {
      id: 2,
      name: "Cyber Clash",
      image: "game1.jpg",
      path: "",
    },
  ];
  return (
    <div className=" w-full max-w-md mx-auto">
      {/* <h3 className="text-white text-lg font-bold tracking-widest mb-4 text-center">
    🎮 GAMES
  </h3> */}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3 mb-10">
        {games.map((game) => (
          <Link
            key={game.id}
            to={game.path}
            className="group relative rounded-xl overflow-hidden 
        bg-gradient-to-br from-gray-900 to-black
        border border-gray-700/50
        shadow-[0_0_20px_#00ffcc22]
        hover:shadow-[0_0_30px_#00ffcc55]
        transition-transform duration-300 hover:scale-105"
          >
            {/* Game Image */}
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-28 object-cover opacity-90 group-hover:opacity-100 transition"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

            {/* Game Name */}
            <div className="absolute bottom-0 w-full p-2 backdrop-blur-md bg-black/40">
              <p className="text-center text-sm font-semibold text-white tracking-wide">
                {game.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Games;
