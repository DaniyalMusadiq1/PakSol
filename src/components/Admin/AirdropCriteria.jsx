import {
  Coins,
  Gem,
  Users,
  CheckCircle,
  Wallet
} from "lucide-react";

const ICONS = {
  coins: Coins,
  gems: Gem,
  friends: Users,
  tasks: CheckCircle,
  wallet: Wallet,
};

export const AirdropCriteria = ({ criteria }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {criteria.map((item) => {
        const Icon = ICONS[item.icon] || CheckCircle;

        return (
          <div
            key={item.id}
            className="bg-gray-900/80 rounded-xl p-4 flex flex-col items-center text-center"
          >
            <div className="p-3 bg-green-400/10 rounded-full">
              <Icon className="w-6 h-6 text-green-400" />
            </div>

            <h3 className="text-white text-sm font-semibold mt-2">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-gray-400 text-xs mt-1">
                {item.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
