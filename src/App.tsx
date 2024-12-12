import { useState } from "react";

import CloseSvg from "./assets/close.svg";
import SwapSvg from "./assets/swap.svg";
import { Map } from "./components/Map";
import { ModalType, SearchModal } from "./components/SearchModal";
import { Poi } from "./libs/api/schemas";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<ModalType | null>(null);

  const [start, setStart] = useState<Poi | null>(null);
  const [end, setEnd] = useState<Poi | null>(null);

  const openModal = (type: ModalType) => () => setIsModalOpen(type);
  const closeModal = () => setIsModalOpen(null);
  const handleSearch = (value: Poi) => {
    if (isModalOpen === "start") setStart(value);
    else setEnd(value);

    closeModal();
  };

  const handleSwap = () => {
    setStart(end);
    setEnd(start);
  };

  const handleClear = () => {
    setStart(null);
    setEnd(null);
  };

  return (
    <>
      <div className="relative w-[100vw] h-[100dvh]">
        <div className="w-[100vw] bg-white p-[16px] absolute z-10 rounded-b-md">
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex gap-2 flex-1 items-center">
              <div className="bg-gray-100 px-3 py-2 rounded-md flex-1">
                <input
                  onClick={openModal("start")}
                  readOnly
                  className="w-full cursor-pointer"
                  type="text"
                  value={start?.name ?? ""}
                  placeholder="출발지"
                />
              </div>

              <button onClick={handleSwap}>
                <img
                  src={SwapSvg}
                  alt="swap"
                  className="w-6 h-6 cursor-pointer"
                />
              </button>
            </div>

            <div className="flex gap-2 flex-1 items-center">
              <div className="bg-gray-100 px-3 py-2 rounded-md flex-1 ">
                <input
                  onClick={openModal("end")}
                  readOnly
                  className="w-full cursor-pointer"
                  type="text"
                  value={end?.name ?? ""}
                  placeholder="도착지"
                />
              </div>

              <button onClick={handleClear}>
                <img
                  src={CloseSvg}
                  alt="close"
                  className="w-6 h-6 cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>

        <Map />
      </div>

      <SearchModal
        key={isModalOpen}
        modalType={isModalOpen}
        onClose={closeModal}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default App;
