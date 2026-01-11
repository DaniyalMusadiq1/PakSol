import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdsTask = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds ad
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanClose(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleClose = () => {
    // Reward logic can be added here
    navigate("/tasks");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 py-6 bg-slate-950">
      {/* Ad Container */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-[0_0_40px_#00ffcc44] flex flex-col items-center gap-4">
        {/* Close button */}
        {canClose && (
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-gray-800 hover:bg-red-500 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Ad Content */}
      
        <p className="text-gray-400 text-sm text-center">
          Earn rewards by watching the full ad
        </p>

        {/* Timer */}
        {!canClose ? (
          <div className="text-green-400 text-2xl font-mono mt-4">
            {timeLeft} sec
          </div>
        ) : (
          <div className="text-blue-400 font-semibold mt-4 text-center">
            You can now close the ad!
          </div>
        )}

        {/* Ad placeholder */}
        <div className="w-full h-40 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 font-bold">
          AD CONTENT
        </div>
      </div>
    </div>
  );
};

export default AdsTask;
