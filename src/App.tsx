import { useState } from "react";

import { Map } from "./components/Map";
import { ModalType, SearchModal } from "./components/SearchModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<ModalType | null>(null);

  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);

  const openModal = (type: ModalType) => () => setIsModalOpen(type);
  const closeModal = () => setIsModalOpen(null);
  const handleSearch = (value: string) => {
    if (isModalOpen === "start") setStart(value);
    else setEnd(value);

    closeModal();
  };

  return (
    <>
      <div className="relative w-[100vw] h-[100dvh]">
        <div className="w-[100vw] bg-white p-[16px] absolute z-10 rounded-b-md">
          <div className="flex flex-col gap-1">
            <div className="bg-gray-100 px-3 py-2 rounded-md">
              <input
                onClick={openModal("start")}
                readOnly
                className="w-full cursor-pointer"
                type="text"
                value={start ?? ""}
                placeholder="출발지"
              />
            </div>

            <div className="bg-gray-100 px-3 py-2 rounded-md">
              <input
                onClick={openModal("end")}
                readOnly
                className="w-full cursor-pointer"
                type="text"
                value={end ?? ""}
                placeholder="도착지"
              />
            </div>
          </div>
        </div>

        <Map />
      </div>

      <SearchModal
        modalType={isModalOpen}
        onClose={closeModal}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default App;
