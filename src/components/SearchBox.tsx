import { Poi } from "../libs/api/schemas";
import { ModalType } from "./SearchModal";
import CloseSvg from "./assets/close.svg";
import SwapSvg from "./assets/swap.svg";

interface Props {
  start: Poi | null;
  end: Poi | null;
  setStart: React.Dispatch<React.SetStateAction<Poi | null>>;
  setEnd: React.Dispatch<React.SetStateAction<Poi | null>>;

  openModal: (type: ModalType) => () => void;
  handleSwap: () => void;
  handleClear: () => void;
}

export const SearchBox = (props: Props) => {
  return (
    <div className="w-[100vw] bg-white p-[16px] absolute z-10 rounded-b-md">
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex gap-2 flex-1 items-center">
          <div className="bg-gray-100 px-3 py-2 rounded-md flex-1">
            <input
              onClick={props.openModal("start")}
              readOnly
              className="w-full cursor-pointer"
              type="text"
              value={props?.start?.name ?? ""}
              placeholder="출발지"
            />
          </div>

          <button onClick={props.handleSwap}>
            <img src={SwapSvg} alt="swap" className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        <div className="flex gap-2 flex-1 items-center">
          <div className="bg-gray-100 px-3 py-2 rounded-md flex-1 ">
            <input
              onClick={props.openModal("end")}
              readOnly
              className="w-full cursor-pointer"
              type="text"
              value={props.end?.name ?? ""}
              placeholder="도착지"
            />
          </div>

          <button onClick={props.handleClear}>
            <img
              src={CloseSvg}
              alt="close"
              className="w-6 h-6 cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
