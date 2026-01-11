import { Gift } from "lucide-react";
import { useSelector } from "react-redux";
import { TonWalletButton } from "../components/Admin/TonWalletButton";
import { WalletCountdown } from "../components/Admin/WalletCountdown";

export const Wallet = () => {
  const wallet = useSelector((state) => state.wallet.data);
  const airdrop = useSelector((state) => state.airdrop.active);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="relative max-w-sm w-full bg-gray-900/80 rounded-2xl p-6 text-center">

        <div className="p-4 rounded-full bg-green-400/10 mx-auto w-fit">
          <Gift className="w-10 h-10 text-green-400" />
        </div>

        <h1 className="text-white text-2xl font-bold mt-4">
          AIRDROP
        </h1>

        {/* Countdown ALWAYS */}
        <WalletCountdown endsAt={airdrop?.ends_at} />

        {!wallet ? (
          <>
            <p className="text-gray-400 mt-2">
              Connect your TON wallet to join airdrop
            </p>
            <TonWalletButton />
          </>
        ) : (
          <>
            <p className="text-green-400 mt-3 text-sm break-all">
              {wallet.wallet_address}
            </p>

            <span className="inline-block mt-4 px-4 py-1 rounded-full bg-green-900 text-green-300 text-xs">
              CONNECTED
            </span>
          </>
        )}
      </div>
    </div>
  );
};
