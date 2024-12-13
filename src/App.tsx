import { useEffect, useState } from "react";

import CloseSvg from "./assets/close.svg";
import SwapSvg from "./assets/swap.svg";
import { Map } from "./components/Map";
import { ModalType, SearchModal } from "./components/SearchModal";
import { BodyType } from "./libs/api/custom-instance";
import {
  getMultiPedestrianRoutePedestrianMultiPost,
  getSinglePedestrianRoutePedestrianSinglePost,
} from "./libs/api/endpoints/pedestrian/pedestrian";
import {
  PedestrianRouteRequest,
  Poi,
  ProcessingMultiResult,
  ProcessingResult,
} from "./libs/api/schemas";

function App() {
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const [start, setStart] = useState<Poi | null>(null);
  const [end, setEnd] = useState<Poi | null>(null);

  const [_, setRoutes] = useState<ProcessingResult | ProcessingMultiResult>();
  const [selectedRoute, setSelectedRoute] = useState<ProcessingResult | null>(
    null
  );

  useEffect(() => {}, [selectedRoute]);

  const getDistance = (start: Poi, end: Poi) => {
    const lat1 = start.frontLon;
    const lon1 = start.frontLat;
    const lat2 = end.frontLon;
    const lon2 = end.frontLat;

    if (!(lat1 && lon1 && lat2 && lon2)) return 0;

    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radTheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist;
  };

  const openModal = (type: ModalType) => () => setModalType(type);
  const closeModal = () => setModalType(null);
  const handleSearch = (value: Poi) => {
    if (modalType === "start") setStart(value);
    else setEnd(value);

    const _start = modalType === "start" ? value : start!;
    const _end = modalType === "end" ? value : end!;

    if (_start && _end) {
      const isClose = getDistance(_start, _end) / 1000 <= 1;

      const options: BodyType<PedestrianRouteRequest> = {
        endName: encodeURIComponent(_end.name!),
        endX: _end.frontLon!,
        endY: _end.frontLat!,
        startName: encodeURIComponent(_start.name!),
        startX: _start.frontLon!,
        startY: _start.frontLat!,
      };

      if (isClose)
        getSinglePedestrianRoutePedestrianSinglePost(options).then((res) => {
          setRoutes(res);
          setSelectedRoute(res);
        });
      else
        getMultiPedestrianRoutePedestrianMultiPost(options).then((res) => {
          setRoutes(res);
          setSelectedRoute(res.suggestion);
        });
    }

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

        <Map route={selectedRoute} />
      </div>

      <SearchModal
        key={modalType}
        modalType={modalType}
        onClose={closeModal}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default App;
