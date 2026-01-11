import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useDispatch } from "react-redux";
import { saveWallet } from "../../store/walletSlice";

export const TonWalletButton = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const dispatch = useDispatch();

  const connectWallet = async () => {
    await tonConnectUI.connectWallet();
  };

  // When wallet connects
  if (wallet) {
    dispatch(
      saveWallet({
        user_id: 1,
        wallet_address: wallet.account.address,
        wallet_type: wallet.device.appName,
        public_key: wallet.account.publicKey || null,
        is_verified: true,
        connected_at: new Date().toISOString(),
        last_active_at: new Date().toISOString(),
        balance: null,
      })
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="mt-6 px-6 py-3 bg-green-400 text-black rounded-xl font-bold hover:scale-105 transition"
    >
      Connect TON Wallet
    </button>
  );
};
