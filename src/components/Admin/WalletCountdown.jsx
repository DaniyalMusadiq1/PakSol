import { useEffect, useState } from "react";

export const WalletCountdown = ({ endsAt }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!endsAt) return;

    const interval = setInterval(() => {
      const diff = new Date(endsAt) - new Date();

      if (diff <= 0) {
        setTimeLeft("Airdrop Ended");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [endsAt]);

  return (
    <p className="text-yellow-400 mt-3 font-semibold">
      ⏳ Remaining: {timeLeft}
    </p>
  );
};
