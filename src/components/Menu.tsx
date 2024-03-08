import { useGameState } from "../providers/GameStateProvider";
import {
  imgInventoryTab,
  imgInventory,
  imgPrayerIconDetail,
} from "../assets/images";

export const Menu = () => {
  const { menu, setMenu } = useGameState();

  return (
    <div
      style={{
        backgroundImage: `url(${imgInventoryTab})`,
        backgroundSize: "contain",
      }}
      className="z-[1000] fixed bottom-0 right-0 h-[404px] w-[300px]"
    >
      <div className="grid grid-cols-7 h-10 w-full -mt-11">
        <div className="border-2 border-[#492201] rounded-md p-1 bg-gray-500" />
        <div className="border-2 border-[#492201] rounded-md p-1 bg-gray-500" />
        <div className="border-2 border-[#492201] rounded-md p-1 bg-gray-500" />
        <button
          className={
            "border-2 border-[#492201] rounded-md p-1 " +
            (menu === "inventory" ? "bg-red-800" : "bg-gray-500")
          }
          onClick={() => setMenu("inventory")}
        >
          <img src={imgInventory} className="h-full w-full object-contain" />
        </button>
        <div className="border-2 border-[#492201] rounded-md p-1 bg-gray-500" />

        <button
          className={
            "border-2 border-[#492201] rounded-md p-1 " +
            (menu === "prayer" ? "bg-red-800" : "bg-gray-500")
          }
          style={{
            gridColumn: 6,
          }}
          onClick={() => setMenu("prayer")}
        >
          <img src={imgPrayerIconDetail} className="h-full w-full" />
        </button>
        <div className="border-2 border-[#492201] rounded-md p-1 bg-gray-500" />
      </div>
      {menu === "inventory" ? (
        <div className="w-full h-full grid-cols-7"></div>
      ) : null}
    </div>
  );
};
